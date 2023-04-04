import Chat from "./Chat"
import ChatInput from "./ChatInput"

type ChatPageProps = {
    params: {
        id: string
    }
}

const ChatPage = ({ params: { id } }: ChatPageProps) => {
    return (
        <div>
            <Chat />
            <ChatInput />
        </div>
    )
}

export default ChatPage