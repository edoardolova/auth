import './App.css'
import { AuthProvider } from './context/AuthContext'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
        <AuthProvider>
          <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1e1e1e",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)"
              }
            }}
          />
          <Routes>
            <Route element={<DefaultLayout/>}>

              <Route path='/' element={<LoginPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>

            </Route>

          </Routes>
          </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App
