/**
 * Logsuzlar Service - Vercel Serverless API Proxy
 * Tek dosya, tüm API'ler arka planda, reklam temizler.
 */

// ============================================
// API HARİTASI (Her API kendi kaynağına bağlı)
// ============================================
const API_MAP = {
  // --- AJAXSYSTEMS.FUN ---
  tc: {
    name: "TC Sorgu",
    icon: "fa-id-card",
    badge: "free",
    url: "https://apiv2.ajaxsystems.fun/tc.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  tcgsm: {
    name: "TC → GSM",
    icon: "fa-phone",
    badge: "free",
    url: "https://apiv2.ajaxsystems.fun/tcgsm.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },
  gsmtc: {
    name: "GSM → TC",
    icon: "fa-phone-alt",
    badge: "free",
    url: "https://apiv2.ajaxsystems.fun/gsmtc.php",
    params: ["gsm"],
    demo: { gsm: "5550000000" },
    fixed: { auth: "fire" },
  },
  adres: {
    name: "Adres",
    icon: "fa-map-marker-alt",
    badge: "free",
    url: "https://apiv2.ajaxsystems.fun/adres.php",
    params: ["tc"],
    demo: { tc: "11111111110" },
    fixed: {},
  },

  // --- SOLIDARKSYSTEMS ---
  adsoyad: {
    name: "Ad Soyad + Adres",
    icon: "fa-user",
    badge: "pro",
    url: "https://solidarksystems.alwaysdata.net/adsoyad.php",
    params: ["ad", "soyad", "il", "ilce"],
    demo: { ad: "roket", soyad: "atar", il: "bursa", ilce: "osmangazi" },
    fixed: {},
  },
  ailepro: {
    name: "Aile Pro",
    icon: "fa-users",
    badge: "pro",
    url: "https://solidarksystems.alwaysdata.net/ailepro.php",
    params: ["tc"],
    demo: { tc: "12481393922" },
    fixed: {},
  },
  sgk: {
    name: "SGK",
    icon: "fa-briefcase",
    badge: "pro",
    url: "https://solidarksystems.alwaysdata.net/sgk.php",
    params: ["tc"],
    demo: { tc: "10001336992" },
    fixed: {},
  },
  sulale: {
    name: "Sülale",
    icon: "fa-tree",
    badge: "pro",
    url: "https://solidarksystems.alwaysdata.net/sulale.php",
    params: ["tc"],
    demo: { tc: "12481393922" },
    fixed: {},
  },

  // --- SORGUTRGBL (Özel format) ---
  adsoyad_glb: {
    name: "Ad Soyad (GLB)",
    icon: "fa-user-tag",
    badge: "free",
    url: "https://sorgutrglb.alwaysdata.net/adsoyad",
    params: ["ad", "soyad"],
    demo: { ad: "roket", soyad: "atar" },
    fixed: {},
    special: true,
  },
  adsoyadpro_glb: {
    name: "Ad Soyad Pro (GLB)",
    icon: "fa-user-shield",
    badge: "pro",
    url: "https://sorgutrglb.alwaysdata.net/adsoyadpro",
    params: ["ad", "soyad"],
    demo: { ad: "roket", soyad: "atar" },
    fixed: {},
    special: true,
  },
};

// ============================================
// REKLAM TEMİZLEME
// ============================================
function reklamTemizle(veri) {
  if (typeof veri !== "string") veri = JSON.stringify(veri);

  const patterns = [
    /@jessy_php/giu,
    /jessy_php/giu,
    /jessy/giu,
    /auth\s*[=:]\s*developer/giu,
    /auth\s*[=:]\s*fire/giu,
    /developer/giu,
    /t\.me\/[a-zA-Z0-9_]+/giu,
    /https?:\/\/t\.me\/\S+/giu,
    /https?:\/\/telegram\.me\/\S+/giu,
    /kanal[ıi]m[ıi]z[:\s]*\S+/giu,
    /kanal[:\s]*@?\S+/giu,
    /reklam[:\s]*\S+/giu,
    /sponsor[:\s]*\S+/giu,
    /\bby\s*@\S+/giu,
    /\bapi\s*by\s*\S+/giu,
  ];

  let temiz = veri;
  for (const p of patterns) temiz = temiz.replace(p, "");

  temiz = temiz.replace(/[ \t]+/g, " ");
  temiz = temiz.replace(/\n{2,}/g, "\n");
  return temiz.trim();
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

  if (config.special) {
    const first = config.params[0];
    let url = config.url + "=" + first + "=" + encodeURIComponent(queryParts[first] || "");
    for (let i = 1; i < config.params.length; i++) {
      const p = config.params[i];
      if (queryParts[p]) url += "&" + p + "=" + encodeURIComponent(queryParts[p]);
    }
    return url;
  }

  const qs = new URLSearchParams(queryParts).toString();
  return config.url + "?" + qs;
}

// ============================================
// API LİSTESİNİ DÖN (Arayüz için)
// ============================================
function getApiList(origin) {
  const list = [];

  for (const [key, cfg] of Object.entries(API_MAP)) {
    // Demo URL üret
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

  // Sitenin kendi origin'ini al (Vercel otomatik verir)
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const origin = proto + "://" + host;

  const apiKey = req.query.api;

  // ==== LİSTE KOMUTU ====
  if (apiKey === "list") {
    return res.status(200).json({
      success: true,
      origin: origin,
      apis: getApiList(origin),
    });
  }

  // ==== GEÇERSİZ API ====
  if (!apiKey || !API_MAP[apiKey]) {
    return res.status(400).json({
      success: false,
      error: "Geçersiz API. Kullanılabilir: " + Object.keys(API_MAP).join(", "),
    });
  }

  const config = API_MAP[apiKey];

  // Zorunlu parametre kontrolü
  const required = config.params[0];
  if (required && !req.query[required]) {
    return res.status(400).json({
      success: false,
      error: "Eksik parametre: " + required,
    });
  }

  // URL oluştur
  const targetUrl = buildUrl(config, req.query);

  // İstek at
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
