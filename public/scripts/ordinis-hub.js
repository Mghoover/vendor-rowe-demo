(function () {
  var config = window.ORDINIS_HUB_CONFIG || null;
  if (!config || !config.siteId || !config.endpointUrl) {
    return;
  }

  var CONSENT_KEY = "ordinis_cookie_consent";
  var VISITOR_KEY = "ordinis_anonymous_id";
  var CONSENT_COOKIE = "ordinis_cookie_consent";
  var HEARTBEAT_DELAY_MS = Number(config.heartbeatDelayMs || 15000);
  var CONSENT_ACCEPTED = "accepted";
  var CONSENT_DECLINED = "declined";
  var startedMode = null;
  var heartbeatId = null;
  var pageViewId = createId();

  function storageAvailable() {
    try {
      var key = "__ordinis_test__";
      window.localStorage.setItem(key, "1");
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  var hasLocalStorage = storageAvailable();

  function readCookie(name) {
    var encodedName = name + "=";
    var segments = document.cookie ? document.cookie.split(";") : [];
    for (var index = 0; index < segments.length; index += 1) {
      var item = segments[index].trim();
      if (item.indexOf(encodedName) === 0) {
        return decodeURIComponent(item.slice(encodedName.length));
      }
    }
    return null;
  }

  function writeCookie(name, value, days) {
    var maxAge = days * 24 * 60 * 60;
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; max-age=" + maxAge + "; SameSite=Lax";
  }

  function readStoredValue(key, cookieName) {
    if (hasLocalStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return readCookie(cookieName);
      }
    }
    return readCookie(cookieName);
  }

  function writeStoredValue(key, cookieName, value, days) {
    if (hasLocalStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        writeCookie(cookieName, value, days);
        return;
      }
    }
    writeCookie(cookieName, value, days);
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "ordinis-" + Math.random().toString(16).slice(2) + "-" + Date.now().toString(16);
  }

  function getConsent() {
    var value = readStoredValue(CONSENT_KEY, CONSENT_COOKIE);
    if (value === CONSENT_ACCEPTED || value === CONSENT_DECLINED) {
      return value;
    }
    return null;
  }

  function setConsent(value) {
    writeStoredValue(CONSENT_KEY, CONSENT_COOKIE, value, 180);
  }

  function getAnonymousId(mode) {
    if (mode !== CONSENT_ACCEPTED) {
      return null;
    }

    var existing = readStoredValue(VISITOR_KEY, VISITOR_KEY);
    if (existing) {
      return existing;
    }

    var nextValue = createId();
    writeStoredValue(VISITOR_KEY, VISITOR_KEY, nextValue, 365);
    return nextValue;
  }

  function buildPayload(eventType, mode, extraMetadata) {
    var metadata = {
      consent: mode,
      tracking_mode: mode === CONSENT_ACCEPTED ? "full" : "minimal",
      path: window.location.pathname + window.location.search,
      referer: document.referrer || null,
      host: window.location.host,
      title: document.title || null,
      page_view_id: pageViewId,
      viewport_width: window.innerWidth || null,
      viewport_height: window.innerHeight || null,
      screen_width: window.screen && window.screen.width ? window.screen.width : null,
      screen_height: window.screen && window.screen.height ? window.screen.height : null,
    };

    var anonymousId = getAnonymousId(mode);
    if (anonymousId) {
      metadata.anonymous_id = anonymousId;
    }

    if (extraMetadata && typeof extraMetadata === "object") {
      var keys = Object.keys(extraMetadata);
      for (var index = 0; index < keys.length; index += 1) {
        metadata[keys[index]] = extraMetadata[keys[index]];
      }
    }

    return {
      site_id: config.siteId,
      event_type: eventType,
      metadata: metadata,
    };
  }

  function sendEvent(eventType, mode, extraMetadata) {
    var payload = buildPayload(eventType, mode, extraMetadata);
    var body = JSON.stringify(payload);

    try {
      if (navigator.sendBeacon && eventType !== "page_load") {
        var beacon = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon(config.endpointUrl, beacon)) {
          return;
        }
      }
    } catch (error) {
      return;
    }

    try {
      window.fetch(config.endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
        keepalive: true,
        credentials: "omit",
      }).catch(function () {});
    } catch (error) {
      return;
    }
  }

  function removeBanner() {
    var banner = document.getElementById("ordinis-cookie-banner");
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
  }

  function startTracking(mode) {
    if (startedMode === mode) {
      return;
    }

    startedMode = mode;
    sendEvent("page_load", mode, { visibility_state: document.visibilityState || "unknown" });

    if (document.visibilityState === "visible") {
      sendEvent("page_visible", mode, { visibility_state: "visible" });
    }

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        sendEvent("page_visible", mode, { visibility_state: "visible" });
      }
    });

    if (heartbeatId) {
      window.clearTimeout(heartbeatId);
    }

    heartbeatId = window.setTimeout(function () {
      sendEvent("heartbeat", mode, { heartbeat_delay_ms: HEARTBEAT_DELAY_MS });
    }, HEARTBEAT_DELAY_MS);
  }

  function applyChoice(mode) {
    setConsent(mode);
    removeBanner();
    startTracking(mode);
  }

  function createButton(label, mode, primary) {
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = primary ? "ordinis-cookie-banner__button ordinis-cookie-banner__button--primary" : "ordinis-cookie-banner__button";
    button.addEventListener("click", function () {
      applyChoice(mode);
    });
    return button;
  }

  function renderBanner() {
    if (document.getElementById("ordinis-cookie-banner")) {
      return;
    }

    var banner = document.createElement("aside");
    banner.id = "ordinis-cookie-banner";
    banner.className = "ordinis-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie consent");

    var message = document.createElement("p");
    message.className = "ordinis-cookie-banner__message";
    message.textContent = "This site uses cookies and basic analytics to improve your experience.";

    var actions = document.createElement("div");
    actions.className = "ordinis-cookie-banner__actions";
    actions.appendChild(createButton("Accept", CONSENT_ACCEPTED, true));
    actions.appendChild(createButton("Decline", CONSENT_DECLINED, false));

    banner.appendChild(message);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function renderStyles() {
    if (document.getElementById("ordinis-cookie-banner-styles")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "ordinis-cookie-banner-styles";
    style.textContent =
      ".ordinis-cookie-banner{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;display:flex;gap:1rem;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-radius:1rem;border:1px solid rgba(15,23,42,.14);background:rgba(255,255,255,.96);box-shadow:0 20px 45px rgba(15,23,42,.16);backdrop-filter:blur(10px);color:#0f172a;font:500 0.95rem/1.5 system-ui,sans-serif}.ordinis-cookie-banner__message{margin:0;max-width:48rem}.ordinis-cookie-banner__actions{display:flex;gap:.75rem;flex-wrap:wrap}.ordinis-cookie-banner__button{appearance:none;border:1px solid rgba(15,23,42,.18);background:transparent;color:#0f172a;padding:.7rem 1rem;border-radius:999px;font:600 .9rem/1 system-ui,sans-serif;cursor:pointer}.ordinis-cookie-banner__button--primary{background:#0f172a;color:#fff;border-color:#0f172a}@media (max-width: 720px){.ordinis-cookie-banner{left:.75rem;right:.75rem;bottom:.75rem;flex-direction:column;align-items:flex-start}.ordinis-cookie-banner__actions{width:100%}.ordinis-cookie-banner__button{flex:1 1 auto;justify-content:center}}";
    document.head.appendChild(style);
  }

  function init() {
    var consent = getConsent();
    renderStyles();

    if (!consent) {
      renderBanner();
      return;
    }

    startTracking(consent);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
