const SLOTS_KEY = "cv_slots";
const OLD_KEY = "cv_data";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function readStore() {
  try {
    const raw = localStorage.getItem(SLOTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read slot store:", e);
  }
  return null;
}

function writeStore(store) {
  try {
    localStorage.setItem(SLOTS_KEY, JSON.stringify(store));
    return true;
  } catch (e) {
    console.error("Failed to write slot store:", e);
    return false;
  }
}

function ensureStore() {
  let store = readStore();
  if (store && store.slots && Object.keys(store.slots).length > 0) return store;

  // Migrate from old single-key format
  store = { active: null, slots: {} };
  try {
    const old = localStorage.getItem(OLD_KEY);
    if (old) {
      const data = JSON.parse(old);
      const id = generateId();
      store.slots[id] = {
        name: "My CV",
        content: data.content || "",
        options: {
          fontSize: data.fontSize,
          lineHeight: data.lineHeight,
          marginTop: data.marginTop,
          marginBottom: data.marginBottom,
          marginLeft: data.marginLeft,
          marginRight: data.marginRight,
        },
        updatedAt: Date.now(),
      };
      store.active = id;
      localStorage.removeItem(OLD_KEY);
    }
  } catch (e) {
    console.error("Migration from old format failed:", e);
  }

  writeStore(store);
  return store;
}

/** @returns {{id: string, name: string, updatedAt: number}[]} */
export function getSlotList() {
  const store = ensureStore();
  return Object.entries(store.slots)
    .map(([id, slot]) => ({ id, name: slot.name, updatedAt: slot.updatedAt }))
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

/** @returns {string|null} */
export function getActiveSlotId() {
  const store = ensureStore();
  return store.active;
}

/** @returns {{name:string, content:string, options:object, updatedAt:number}|null} */
export function loadSlot(id) {
  const store = ensureStore();
  return store.slots[id] || null;
}

/** Save data into an existing slot. */
export function saveSlot(id, data) {
  const store = ensureStore();
  if (!store.slots[id]) return false;
  store.slots[id] = {
    ...store.slots[id],
    content: data.content,
    options: data.options,
    updatedAt: Date.now(),
  };
  return writeStore(store);
}

/** Create a new slot. Returns the new slot ID. */
export function createSlot(name, data) {
  const store = ensureStore();
  const id = generateId();
  store.slots[id] = {
    name,
    content: data.content,
    options: data.options,
    updatedAt: Date.now(),
  };
  store.active = id;
  writeStore(store);
  return id;
}

/** Delete a slot. Returns true on success. */
export function deleteSlot(id) {
  const store = ensureStore();
  if (!store.slots[id]) return false;
  delete store.slots[id];
  if (store.active === id) {
    const remaining = Object.keys(store.slots);
    store.active = remaining.length > 0 ? remaining[0] : null;
  }
  return writeStore(store);
}

/** Rename a slot. */
export function renameSlot(id, name) {
  const store = ensureStore();
  if (!store.slots[id]) return false;
  store.slots[id].name = name;
  return writeStore(store);
}

/** Set the active slot (does not load it). */
export function setActiveSlot(id) {
  const store = ensureStore();
  store.active = id;
  writeStore(store);
}
