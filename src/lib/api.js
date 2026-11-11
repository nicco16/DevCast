import * as mock from "../data/mockData.js";

const USE_REMOTE = import.meta.env.VITE_USE_REMOTE === "true";

// Realiza una petición JSON y lanza un error si falla la respuesta.
async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

// Obtiene la lista de episodios desde datos remotos o locales.
export async function getEpisodes() {
  if (USE_REMOTE) {
    return fetchJson("/api/episodes");
  }
  return Promise.resolve(mock.episodes);
}

// Obtiene las categorías disponibles desde datos remotos o locales.
export async function getCategories() {
  if (USE_REMOTE) {
    return fetchJson("/api/categories");
  }
  return Promise.resolve(mock.categories);
}

// Obtiene las rutas de aprendizaje desde datos remotos o locales.
export async function getLearningPaths() {
  if (USE_REMOTE) {
    return fetchJson("/api/learning-paths");
  }
  return Promise.resolve(mock.learningPaths);
}

// Obtiene las noticias de desarrollo desde datos remotos o locales.
export async function getDeveloperNews() {
  if (USE_REMOTE) {
    return fetchJson("/api/news");
  }
  return Promise.resolve(mock.developerNews);
}

// Devuelve la imagen de avatar del usuario desde los datos mockeados.
export function getUserAvatar() {
  return mock.USER_AVATAR;
}

// Helpers de persistencia usando localStorage para favoritos y progreso.
const KEY_BOOKMARKS = "devcast:bookmarks";
const KEY_PROGRESS = "devcast:progress";
const KEY_USER_NAME = "devcast:user-name";

// Recupera el nombre elegido durante la bienvenida.
export function getUserName() {
  return localStorage.getItem(KEY_USER_NAME) || "";
}

// Guarda el nombre del usuario en el dispositivo actual.
export function setUserName(name) {
  localStorage.setItem(KEY_USER_NAME, name.trim());
}

// Recupera los episodios guardados del almacenamiento local.
export function getBookmarks() {
  try {
    const raw = localStorage.getItem(KEY_BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('getBookmarks error', e);
    return [];
  }
}

// Guarda la lista de episodios marcados como favoritos.
export function setBookmarks(list) {
  try {
    localStorage.setItem(KEY_BOOKMARKS, JSON.stringify(list));
  } catch (e) {
    console.warn('setBookmarks error', e);
  }
}

// Recupera el progreso de reproducción guardado por episodio.
export function getProgress() {
  try {
    const raw = localStorage.getItem(KEY_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('getProgress error', e);
    return {};
  }
}

// Guarda el progreso de reproducción en formato de objeto.
export function setProgress(obj) {
  try {
    localStorage.setItem(KEY_PROGRESS, JSON.stringify(obj));
  } catch (e) {
    console.warn('setProgress error', e);
  }
}

export default {
  getEpisodes,
  getCategories,
  getLearningPaths,
  getUserAvatar,
  getBookmarks,
  setBookmarks,
  getProgress,
  setProgress,
};
