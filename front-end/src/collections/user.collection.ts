import { db } from "@/firebase";
import { collection, doc } from "firebase/firestore";

export const userCollection = collection(db, "user");
export const userDoc = (id: string) => doc(db, "user", id);
