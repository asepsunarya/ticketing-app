import { db } from "@/firebase";
import { collection, doc } from "firebase/firestore";

export const conversationListCollection = collection(db, "conversation-list");
export const conversationListDoc = (conversationListId: string) =>
  doc(db, "conversation-list", conversationListId);
