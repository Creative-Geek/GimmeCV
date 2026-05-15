const SHORTENER_BASE = "https://url-short.wasmer.app";

/**
 * Shortens a URL using the CG.Short trusted-origin endpoint.
 * Only works when called from a creativegeek.net domain (browser
 * auto-sends the Origin header). Fails silently on localhost / non-trusted origins.
 *
 * @param {string} url - The full URL to shorten (up to 65536 chars).
 * @returns {Promise<string|null>} - The short URL, or null on any failure.
 */
export async function shortenUrl(url) {
  try {
    const res = await fetch(`${SHORTENER_BASE}/api/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.short_url || null;
  } catch {
    return null;
  }
}
