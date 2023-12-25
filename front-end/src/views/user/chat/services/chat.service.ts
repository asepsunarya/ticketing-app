import {
  conversationListCollection,
  conversationListDoc,
} from "@/collections/conversation-list.collection";
import { conversationMessagesCollection } from "@/collections/conversation-messages.collection copy";
import { useAuthStore } from "@/stores/auth";
import { useChatStore } from "@/stores/chat";
import {
  addDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

const chatStore = useChatStore();
const authStore = useAuthStore();

const ADMIN_ID = "qkC0nMQNrq4Uv1kpvNTw";

export function watchConversationList({ userId }: { userId: string }) {
  const querySnapshot = query(
    conversationListCollection,
    where("sender.userId", "==", userId)
  );

  return onSnapshot(querySnapshot, (snapshot) => {
    if (!snapshot.docs.length) {
      createConversation();
      return;
    }

    const chatList = mapConversationList(snapshot.docs);
    chatStore.chatList = chatList;
  });
}

export function watchConversationMessages({
  senderId,
  recipientId,
}: {
  senderId: string;
  recipientId: string;
}) {
  const querySnapshot = query(
    conversationMessagesCollection,
    where("sender.userId", "==", senderId),
    where("recipient.userId", "==", recipientId)
  );

  return onSnapshot(querySnapshot, (snapshot) => {
    const messageList = mapMessageList(snapshot.docs);
    chatStore.messages = messageList;
  });
}

export async function sendMessage({ message }: { message: string }) {
  if (!authStore.isLogin) return;
  const { id: conversationListId, sender, recipient } = chatStore.activeChat;
  const messageDoc = {
    conversationListId,
    sender,
    recipient,
    message,
    createdAt: moment().toISOString(),
  };

  await updateDoc(conversationListDoc(conversationListId), {
    lastMessage: message,
    lastMessageTime: moment().toISOString(),
  });

  await addDoc(conversationMessagesCollection, messageDoc);
}

function mapConversationList(docs: any[]) {
  return docs.map((doc) => {
    const conversation = {
      ...doc.data(),
      id: doc.id,
    };

    if (doc.data().lastMessageTime) {
      const lastMessageTime = moment(doc.data().lastMessageTime).format(
        "HH:mm"
      );
      conversation.lastMessageTime = lastMessageTime;
    }

    return conversation;
  });
}

function mapMessageList(docs: any[]) {
  const sortedDocs = sortMessageByCreatedAt(docs);
  return sortedDocs
    .map((doc) => {
      const { message, sender, createdAt } = doc.data();
      const isSender = authStore.user?.uid === sender.userId;
      const time = moment(createdAt);
      return { message, isSender, time, id: doc.id };
    })
    .reverse();
}

function sortMessageByCreatedAt(docs: any[]) {
  return docs.sort((a, b) => {
    const createdAtA = moment(a.data().createdAt).unix();
    const createdAtB = moment(b.data().createdAt).unix();
    return createdAtB - createdAtA;
  });
}

function createConversation() {
  const { uid: userId, displayName: name } = authStore.user;
  const conversation = {
    sender: { userId, name },
    recipient: { userId: "qkC0nMQNrq4Uv1kpvNTw", name: "Admin Ticketing" },
    lastMessage: "",
    lastMessageTime: { seconds: "" },
  };

  chatStore.activeChat = conversation;
  addDoc(conversationListCollection, conversation);
}
