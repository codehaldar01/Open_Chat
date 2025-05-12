import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore'
import ChatHeader from './ChatHeader.jsx'
import MsgInput from './MsgInput.jsx'
import MessageSkeleton from './skeletons/MessageSkeleton.jsx'
import useAuthUser from '../store/useAuthUser.js'
const ChatBox = () => {
    const { messages, getMessages, isMessagesLodding, selectedUser } = useChatStore();
    const { authUser } = useAuthUser();
    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])
    if (isMessagesLodding) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MsgInput />
        </div>
    )
    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((msg) => (
                    <div key={msg._id} className={`chat ${msg.senderId === selectedUser._id ? "chat-start" : "chat-end"}`}>
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full">
                                <img src={msg.senderId === selectedUser._id ? selectedUser.profilepic : authUser.profilepic || "/avatar.png"} alt={msg.senderId === selectedUser._id ? selectedUser.name : authUser.name} />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <span>{msg.senderId === selectedUser._id ? selectedUser.name : authUser.name}</span>
                            <time className="text-xs opacity-50">{new Date(msg.createdAt).toLocaleTimeString()}</time>
                        </div>
                        <div className='chat-bubble flex flex-col'>
                            <div>{msg.text}</div>
                            {msg.image &&
                                <div className="chat-bubble-image chat-footer">
                                    <img src={msg.image} alt="message" className="max-w-[200px] rounded-lg" />
                                </div>
                            }
                        </div> 
                    </div>
                ))}
            </div>
            <MsgInput />
        </div>
    )
}

export default ChatBox