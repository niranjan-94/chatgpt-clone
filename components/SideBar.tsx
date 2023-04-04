"use client"
import { signOut, useSession } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore"
import Image from "next/image"
import { db } from '@/firebase';
import { collection, orderBy, query } from "firebase/firestore"
import ChatRow from './ChatRow';

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
    query(
      collection(db, "users", session?.user?.email!, "chats"),
      orderBy("createdAt", "asc")
    )
  )

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>
            {/* Chat Selction */}
          </div>
          {/* Map through the Chat Rows */}
          {chats?.docs.map(chat => (
            <ChatRow key={chat?.id} id={chat?.id} />
          ))}
        </div>

      </div>
      {session &&
        <>
          <Image
            src={"https://lh3.googleusercontent.com/a/AGNmyxZlP6feHsUZtXGIBB9nh623NeblTO9H4R5yXFhR=s96-c"}
            alt="Profile Picture"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto
           mb-2 hover:opacity-50"
            width="48"
            height="48"
          />
          <button onClick={() => signOut()} className="text-white">Sign Out</button>
        </>
      }
    </div>
  )
}

export default SideBar