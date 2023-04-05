"use client"
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

type ChatInputProps = {
    chatId: string;
}

//TODO: useSWR
const model = "sdsfd"

const ChatInput = ({ chatId }: ChatInputProps) => {
    const [prompt, setPromt] = useState("");
    const { data: session } = useSession();

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return;

        const input = prompt.trim();
        setPromt("");
        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }   
        }

        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        const notificaion = toast.loading('ChatGPT is thinking...');

        await fetch("api/askQuestion",{
            method: 'POST',
            headers: {
                'Conten-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(()=>{
            toast.success('ChatGPT has responded',{
                id: notificaion
            })
        })
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input
                    className="bg-transparent focus:outline-none flex-1
                              disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPromt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />

                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white
                     font-bold px-4 py-2 rounded"
                >
                    <PaperAirplaneIcon className="h- w-4 -rotate-45" />
                </button>
            </form>
        </div>
    )
}

export default ChatInput