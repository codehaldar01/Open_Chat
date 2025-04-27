import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Navbar from './components/Navbar.jsx'
import useAuthUser from './store/useAuthUser.js'
import { useEffect } from 'react'
import { Loader, Cog } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthUser();

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
    }
    checkUserAuth();
  }
    , [checkAuth])

  if (isCheckingAuth && !authUser) {
    // If the user is not authenticated and we are checking authentication, show a loading screen
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <h1 className="text-2xl font-bold">Loading...</h1> */}
        <Loader className="size-15 animate-spin text-blue-600 " />
        {/* <Cog className="size-15 animate-spin  text-pink-600" /> */}
      </div>
    )
  }
  console.log("Auth User:", authUser);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
        {/* Redirect to login if not authenticated */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"login"} />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default App
