const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export const apiFetch = async (
  endpoint: string,
  options: ApiFetchOptions = {},
) => {
  const accessToken = localStorage.getItem("access_token");

  const refreshToken = localStorage.getItem("refresh_token");

  const headers = new Headers(options.headers || {});

  headers.set("Content-Type", "application/json");

  // Attach access token automatically
  if (options.auth !== false && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // FIRST REQUEST
  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // ACCESS TOKEN EXPIRED
  if (response.status === 401 && refreshToken) {
    try {
      // REQUEST NEW ACCESS TOKEN
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      const refreshData = await refreshResponse.json();

      // REFRESH FAILED
      if (!refreshResponse.ok) {
        localStorage.removeItem("access_token");

        localStorage.removeItem("refresh_token");

        localStorage.removeItem("status");

        window.location.href = "/login";

        throw new Error("Session expired");
      }

      // SAVE NEW ACCESS TOKEN
      const newAccessToken = refreshData.access_token;

      localStorage.setItem("access_token", newAccessToken);

      // UPDATE AUTH HEADER
      headers.set("Authorization", `Bearer ${newAccessToken}`);

      // RETRY ORIGINAL REQUEST
      response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (error) {
      console.error("Token refresh failed:", error);

      throw error;
    }
  }

  return response;
};
