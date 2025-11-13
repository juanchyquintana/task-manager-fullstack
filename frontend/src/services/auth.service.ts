export const TOKEN_KEY = "access_token";

export const authToken = {
  save(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};
