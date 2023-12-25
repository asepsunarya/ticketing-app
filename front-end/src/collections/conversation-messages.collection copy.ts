import { db } from "@/firebase";
import { collection, doc } from "firebase/firestore";

export const conversationMessagesCollection = collection(
  db,
  "conversation-messages"
);

export const conversationMessagesDoc = () => doc(db, "conversation-messages");
