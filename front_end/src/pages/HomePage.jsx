import React from 'react'
import  useChatStore  from '../store/useChatStore.js'
import Sidebar from '../components/Sidebar.jsx'
import ChatBox from '../components/ChatBox.jsx'
import NoChat from '../components/NoChat.jsx'
const HomePage = () => {
  const { selectedUser } = useChatStore();
  console.log("Selected User: ", selectedUser);
  return (
    <div className='h-screen  bg-base-200'>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg ">
            <Sidebar />
            {selectedUser? <ChatBox /> : <NoChat />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage