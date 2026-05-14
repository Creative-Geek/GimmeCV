const STORAGE_KEY = "cv_data";

export function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save CV data:", e);
    return false;
  }
}

export function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to parse saved CV data:", e);
    return null;
  }
}

export function hasStoredData() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
