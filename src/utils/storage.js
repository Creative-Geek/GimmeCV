const STORAGE_KEY = "cv_data";

export function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return true;
}

export function loadFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  return JSON.parse(saved);
}

export function hasStoredData() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
