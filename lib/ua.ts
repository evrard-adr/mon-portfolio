export function parseUA(ua: string) {
  const u = ua || "";
  const bot = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python-requests|httpclient|node-fetch/i.test(u);
  const device_type = /iPad|Tablet|Tab /i.test(u) || (/Android/i.test(u) && !/Mobile/i.test(u)) ? "tablet" : /Mobi|iPhone|Android/i.test(u) ? "mobile" : "desktop";
  const os = /iPhone|iPad|iPod/i.test(u) ? "iOS" : /Android/i.test(u) ? "Android" : /Windows/i.test(u) ? "Windows" : /Mac OS X|Macintosh/i.test(u) ? "macOS" : /CrOS/i.test(u) ? "ChromeOS" : /Linux/i.test(u) ? "Linux" : "Autre";
  const browser = /Instagram/i.test(u) ? "Instagram (appli)" : /LinkedInApp/i.test(u) ? "LinkedIn (appli)" : /FBAN|FBAV/i.test(u) ? "Facebook (appli)" : /Edg\//i.test(u) ? "Edge" : /OPR\/|Opera/i.test(u) ? "Opera" : /Firefox|FxiOS/i.test(u) ? "Firefox" : /Chrome|CriOS/i.test(u) ? "Chrome" : /Safari/i.test(u) ? "Safari" : "Autre";
  return { bot, device_type, os, browser };
}
