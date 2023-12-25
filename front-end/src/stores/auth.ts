import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { defineStore } from "pinia";
import { computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const auth = localStorage?.auth ? JSON.parse(localStorage?.auth) : null;
  const isLogin = computed(() => !!auth);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(getAuth(), googleProvider);
    return user;
  };

  const signOut = () => getAuth().signOut();

  return { user: auth?.user, isLogin, signIn, signOut };
});
