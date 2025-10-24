import pako from "pako";

/**
 * Converts a standard Base64 string to Base64URL format
 * (replaces +/= with URL-safe characters)
 */
function base64ToBase64Url(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Converts a Base64URL string back to standard Base64 format
 */
function base64UrlToBase64(base64Url) {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if needed
  while (base64.length % 4) {
    base64 += "=";
  }

  return base64;
}

/**
 * Encodes text data for URL fragment
 * Steps: compress with zlib → convert to Base64 → make URL-safe
 *
 * @param {string} text - The text to encode (e.g., Markdown CV content)
 * @returns {string} - Base64URL encoded compressed string
 */
export function encodeForUrl(text) {
  try {
    // Step 1: Convert string to Uint8Array
    const textEncoder = new TextEncoder();
    const textBytes = textEncoder.encode(text);

    // Step 2: Compress using zlib (deflate)
    const compressed = pako.deflate(textBytes, { level: 9 }); // Maximum compression

    // Step 3: Convert compressed bytes to Base64
    let binary = "";
    const len = compressed.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(compressed[i]);
    }
    const base64 = btoa(binary);

    // Step 4: Convert to Base64URL (URL-safe)
    const base64Url = base64ToBase64Url(base64);

    return base64Url;
  } catch (error) {
    console.error("Encoding error:", error);
    throw new Error("Failed to encode data for URL");
  }
}

/**
 * Decodes text data from URL fragment
 * Steps: convert from Base64URL → decode Base64 → decompress with zlib
 *
 * @param {string} encodedData - Base64URL encoded compressed string
 * @returns {string} - Original text
 */
export function decodeFromUrl(encodedData) {
  try {
    // Step 1: Convert Base64URL back to standard Base64
    const base64 = base64UrlToBase64(encodedData);

    // Step 2: Decode Base64 to binary string
    const binary = atob(base64);

    // Step 3: Convert binary string to Uint8Array
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    // Step 4: Decompress using zlib (inflate)
    const decompressed = pako.inflate(bytes);

    // Step 5: Convert Uint8Array back to string
    const textDecoder = new TextDecoder();
    const text = textDecoder.decode(decompressed);

    return text;
  } catch (error) {
    console.error("Decoding error:", error);
    throw new Error(
      "Failed to decode data from URL. The data may be corrupted or invalid."
    );
  }
}

/**
 * Generates a complete URL with encoded data in the fragment
 *
 * @param {string} text - The text to encode
 * @param {string} baseUrl - Base URL of your app (e.g., 'https://yourapp.com')
 * @returns {object} - { url: string, encodedLength: number, originalLength: number, compressionRatio: number }
 */
export function generateShareableUrl(text, baseUrl = window.location.origin) {
  const encoded = encodeForUrl(text);
  const url = `${baseUrl}/#${encoded}`;

  return {
    url,
    encodedLength: encoded.length,
    originalLength: text.length,
    compressionRatio:
      ((1 - encoded.length / text.length) * 100).toFixed(1) + "%",
    totalUrlLength: url.length,
  };
}

/**
 * Extracts and decodes data from the current URL fragment
 *
 * @returns {string|null} - Decoded text or null if no data in URL
 */
export function loadFromUrlFragment() {
  const hash = window.location.hash;

  if (!hash || hash.length <= 1) {
    return null; // No data in URL
  }

  // Remove the '#' character
  const encodedData = hash.substring(1);

  // Check if it looks like encoded data (Base64URL characters only)
  if (!/^[A-Za-z0-9_-]+$/.test(encodedData)) {
    console.warn("URL fragment does not appear to contain valid encoded data");
    return null;
  }

  try {
    return decodeFromUrl(encodedData);
  } catch (error) {
    console.error("Failed to load data from URL:", error);
    return null;
  }
}

/**
 * Validates if a URL would be too long for most browsers
 *
 * @param {string} url - The full URL to validate
 * @returns {object} - { valid: boolean, length: number, warning: string|null }
 */
export function validateUrlLength(url) {
  const length = url.length;

  if (length > 100000) {
    return {
      valid: false,
      length,
      warning:
        "URL exceeds 100KB. This will likely fail in most browsers. Please reduce content size.",
    };
  }

  if (length > 50000) {
    return {
      valid: true,
      length,
      warning:
        "URL exceeds 50KB. May not work in some older browsers or mobile devices.",
    };
  }

  if (length > 32000) {
    return {
      valid: true,
      length,
      warning: "URL exceeds 32KB. Should work in most modern browsers.",
    };
  }

  return {
    valid: true,
    length,
    warning: null,
  };
}
