import { setDoc } from "firebase/firestore";
import { userDoc } from "@/collections/user.collection";

export async function addUser({ user, role }: any) {
  const data = {
    email: user.email,
    name: user.displayName,
    role,
    photo: user.photoURL,
  };
  await setDoc(userDoc(user.uid), data);
  const users = { ...user, role };
  localStorage.user = JSON.stringify(users);
}
