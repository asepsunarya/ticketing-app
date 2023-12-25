class AuthService {
  setAuth(user: any, accessToken: any) {
    const auth = JSON.stringify({ user, accessToken });
    localStorage.setItem("auth", auth);
  }

  getAuth() {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    return auth;
  }
}

export default new AuthService();
