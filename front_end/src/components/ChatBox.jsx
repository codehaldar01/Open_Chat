import React, { useEffect } from 'react'
import useChatStore from '../store/useChatStore'
import ChatHeader from './ChatHeader.jsx'
import MsgInput from './MsgInput.jsx'
const ChatBox = () => {
    const { messages, getMessages, isMessagesLodding, selectedUser } = useChatStore();
    useEffect(()=>{
        getMessages(selectedUser._id)
    },[selectedUser._id,getMessages])
    if(isMessagesLodding) return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        Messages are getting listed down Header
        <MsgInput />
    </div>
  )
}

export default ChatBox