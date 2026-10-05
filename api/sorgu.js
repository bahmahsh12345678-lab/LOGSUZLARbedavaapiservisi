/**
 * Logsuzlar Service - Vercel Serverless API Proxy
 * Kaynak: punisherservis.alwaysdata.net
 * Reklam temizler: developer, version, @SiberciAlemde
 */

const API_MAP = {
  // ==== KİMLİK ====
  tc: {
    name: "TC Sorgu",
    icon: "fa-id-card",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/tc.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  tcpro: {
    name: "TC Pro",
    icon: "fa-id-card",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/tcpro.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  adsoyad: {
    name: "Ad Soyad",
    icon: "fa-user",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/adsoyad.php",
    params: ["ad", "soyad"],
    demo: { ad: "roket", soyad: "atar" },
    fixed: {},
  },
  adsoyadpro: {
    name: "Ad Soyad Pro",
    icon: "fa-user-shield",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/adsoyadpro.php",
    params: ["ad", "soyad"],
    demo: { ad: "roket", soyad: "atar" },
    fixed: {},
  },

  // ==== AİLE ====
  aile: {
    name: "Aile",
    icon: "fa-users",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/aile.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  ailepro: {
    name: "Aile Pro",
    icon: "fa-users",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/ailepro.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  cocuk: {
    name: "Çocuk",
    icon: "fa-child",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/cocuk.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  es: {
    name: "Eş",
    icon: "fa-heart",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/es.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  kardes: {
    name: "Kardeş",
    icon: "fa-user-friends",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/kardes.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },

  // ==== DOĞUM ====
  dogumtililce: {
    name: "Doğum Tarih İl İlçe",
    icon: "fa-calendar-alt",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/dogumtililce.php",
    params: ["dogumt", "il", "ilce"],
    demo: { dogumt: "17.03.1998", il: "istanbul", ilce: "buyukcekmece" },
    fixed: {},
  },
  soyaddogumt: {
    name: "Soyad Doğum",
    icon: "fa-calendar",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/soyaddogumt.php",
    params: ["soyad", "dogumt"],
    demo: { soyad: "deniz", dogumt: "17.03.1998" },
    fixed: {},
  },

  // ==== ADRES & SÜLALE ====
  adres: {
    name: "Adres",
    icon: "fa-map-marker-alt",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/adres.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  sulale: {
    name: "Sülale",
    icon: "fa-tree",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/sulale.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  sulalepro: {
    name: "Sülale Pro",
    icon: "fa-sitemap",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/sulalepro.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },

  // ==== RESMİ ====
  isyeri: {
    name: "İş Yeri",
    icon: "fa-building",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/isyeri.php",
    params: ["tc"],
    demo: { tc: "11144576054" },
    fixed: {},
  },
  tapu: {
    name: "Tapu",
    icon: "fa-handshake",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/tapu.php",
    params: ["tc"],
    demo: { tc: "27727166918" },
    fixed: {},
  },
  iban: {
    name: "IBAN",
    icon: "fa-credit-card",
    badge: "pro",
    url: "https://punisherservis.alwaysdata.net/apiservices/iban.php",
    params: ["iban"],
    demo: { iban: "TR280006256953335759003718" },
    fixed: {},
  },
  gncloperator: {
    name: "Operatör Sorgu",
    icon: "fa-signal",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/gncloperator.php",
    params: ["numara"],
    demo: { numara: "5315312472" },
    fixed: {},
  },

  // ==== GSM ====
  tcgsm: {
    name: "TC → GSM",
    icon: "fa-phone",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/tcgsm.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  gsmtc: {
    name: "GSM → TC",
    icon: "fa-phone-alt",
    badge: "free",
    url: "https://punisherservis.alwaysdata.net/apiservices/gsmtc.php",
    params: ["gsm"],
    demo: { gsm: "5415722525" },
    fixed: {},
  },
};

// ============================================
// REKLAM TEMİZLEME
// ============================================
function reklamTemizle(text) {
  if (typeof text !== "string") {
    text = JSON.stringify(text);
  }

  // Silinecek reklam satırları (developer, version vs.)
  const satir_patternleri = [
    /^\s*"developer"\s*:\s*"[^"]*"\s*,?\s*$/gim,
    /^\s*"version"\s*:\s*"[^"]*"\s*,?\s*$/gim,
    /^\s*"sürüm"\s*:\s*"[^"]*"\s*,?\s*$/gim,
    /^\s*"surum"\s*:\s*"[^"]*"\s*,?\s*$/gim,
    /^\s*"author"\s*:\s*"[^"]*"\s*,?\s*$/gim,
    /^\s*"yapimci"\s*:\s*"[^"]*"\s*,?\s*$/gim,
  ];

  for (const p of satir_patternleri) {
    text = text.replace(p, "");
  }

  // Direkt metin silme
  const metin_patternleri = [
    /@SiberciAlemde/gi,
    /@sibercialemde/gi,
    /SiberciAlemde/gi,
    /sibercialemde/gi,
    /@jessy_php/gi,
    /jessy_php/gi,
    /jessy/gi,
    /auth=developer/gi,
    /auth=fire/gi,
    /developer/gi,
  ];

  for (const p of metin_patternleri) {
    text = text.replace(p, "");
  }

  // Ard arda gelen virgülleri ve boş alanları temizle
  text = text.replace(/,\s*,/g, ",");
  text = text.replace(/,\s*([}\]])/g, "$1");
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n{2,}/g, "\n");

  return text.trim();
}

// ============================================
// URL OLUŞTUR
// ============================================
function buildUrl(config, query) {
  const queryParts = {};

  for (const p of config.params) {
    if (query[p] !== undefined && query[p] !== "") {
      queryParts[p] = query[p];
    }
  }
  for (const [k, v] of Object.entries(config.fixed || {})) {
    queryParts[k] = v;
  }

  const qs = new URLSearchParams(queryParts).toString();
  return config.url + "?" + qs;
}

// ============================================
// API LİSTESİ
// ============================================
function getApiList(origin) {
  const list = [];

  for (const [key, cfg] of Object.entries(API_MAP)) {
    let demoUrl = origin + "/api/sorgu?api=" + key;
    for (const [k, v] of Object.entries(cfg.demo || {})) {
      demoUrl += "&" + k + "=" + encodeURIComponent(v);
    }

    list.push({
      key: key,
      name: cfg.name,
      icon: cfg.icon,
      badge: cfg.badge,
      params: cfg.params,
      demo: cfg.demo,
      demoUrl: demoUrl,
      baseUrl: origin + "/api/sorgu?api=" + key,
    });
  }

  return list;
}

// ============================================
// ANA HANDLER
// ============================================
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const origin = proto + "://" + host;

  const apiKey = req.query.api;

  // ==== LİSTE ====
  if (apiKey === "list") {
    return res.status(200).json({
      success: true,
      origin: origin,
      apis: getApiList(origin),
    });
  }

  // ==== GEÇERSİZ ====
  if (!apiKey || !API_MAP[apiKey]) {
    return res.status(400).json({
      success: false,
      error: "Geçersiz API. Kullanılabilir: " + Object.keys(API_MAP).join(", "),
    });
  }

  const config = API_MAP[apiKey];

  // Zorunlu parametre
  const required = config.params[0];
  if (required && !req.query[required]) {
    return res.status(400).json({
      success: false,
      error: "Eksik parametre: " + required,
    });
  }

  const targetUrl = buildUrl(config, req.query);

  // ==== İSTEK ====
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const apiHost = new URL(config.url).origin;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
        Referer: apiHost + "/",
        "X-Requested-With": "XMLHttpRequest",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Kaynak API hatası",
        code: response.status,
        api: apiKey,
      });
    }

    // Reklam temizle
    const temiz = reklamTemizle(text);

    let parsed = null;
    try {
      parsed = JSON.parse(temiz);
    } catch {
      parsed = null;
    }

    if (parsed !== null) {
      return res.status(200).json({ success: true, api: apiKey, data: parsed });
    }

    return res.status(200).json({ success: true, api: apiKey, raw: temiz });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Bağlantı hatası: " + err.message,
      api: apiKey,
    });
  }
}
