"use client"
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";

type ChatProps = {
  chatId: string;
}

const Chat = ({ chatId }: ChatProps) => {
  const {data:session} = useSession();
  
  const [message] = useCollection(
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
  )
  
  
  return (
    <div className="flex-1">

    </div>
  )
}

export default Chat