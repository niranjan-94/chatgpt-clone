"use client"
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

type ChatProps = {
  chatId: string;
}

const Chat = ({ chatId }: ChatProps) => {
  const { data: session } = useSession();

  const [ ] = useCollection(
    session &&
    query(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );


  return (
  <div className="flex-1">
    {messages?.docs.map((message) => {
      // <Message key={message.id} message={message.data()} />
      <div>sd</div>
    })}
  </div>
  )
}

export default Chat