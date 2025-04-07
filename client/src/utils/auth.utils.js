let TOKEN = "";

/**
 * Функция установки токена в локал сторадж
 * @param {string} token
 */
export const setToken = (token) => {
  if (!token) {
    throw new Error("Token is required");
  }
  TOKEN = token;
  localStorage.setItem("token", TOKEN);
};

/**
 * Сохраняет информацию о пользователе в localStorage
 * @param {Object} user - Объект с информацией о пользователе
 */
export const setLocalUser = (user) => {
  if (!user) {
    throw new Error("User data is required");
  }
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Получить токен
 * @returns {string}
 */
export const getToken = () => {
  TOKEN = localStorage.getItem("token");
  return TOKEN;
};

/**
 * Получить информацию о пользователе из localStorage
 * @returns {Object|null}
 */
export const getLocalUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Get the user ID from local storage
 * @returns {Number|null} The user ID or null if not found
 */
export const getUserId = () => {
  const user = getLocalUser();
  return user && user.id ? user.id : null;
};

/**
 * Очистить токен
 */
export const clearToken = () => {
  TOKEN = "";
  localStorage.removeItem("token");
};

/**
 * Очистить информацию о пользователе
 */
export const clearLocalUser = () => {
  localStorage.removeItem("user");
};

/**
 * Обертка над fetch с автоматическим добавлением токена и обработкой ошибок
 * @param {string} url - URL для запроса
 * @param {Object} options - Опции для fetch
 * @returns {Promise<Response>}
 */
export const fetchWithHeaders = async (url, options = {}) => {
  const token = getToken();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    ...options.headers,
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      // Token expired or invalid
      clearToken();
      clearLocalUser();
      window.location.href = "/auth";
      throw new Error("Authentication failed");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "Error response status:",
        response.status,
        response.statusText
      );
      console.error("Error response data:", errorData);
      throw new Error(
        errorData.message ||
          errorData.detail ||
          JSON.stringify(errorData) ||
          "Request failed"
      );
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Обертка над fetch для публичных запросов без аутентификации
 * @param {string} url - URL для запроса
 * @param {Object} options - Опции для fetch
 * @returns {Promise<Response>}
 */
export const fetchPublic = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Request failed");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
