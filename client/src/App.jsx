import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/authContext"
import ErrorHandler from './components/ErrorHandler';
import AuthGuard from './guards/AuthGuard';
import Path from "./paths/paths"

import Header from './components/Header/Header';
import MiddleSection from './components/MiddleSection/MiddleSection';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';

function App() {
  
  return (
    <ErrorHandler>
      <AuthProvider>
        <Header/>
        <Routes>
            <Route path={Path.Home} element={<MiddleSection/>}/>
            <Route path={Path.Login} element={<Login/>}/>
            <Route path={Path.Register} element={<Register/>}/>
            <Route element={<AuthGuard/>}>
              <Route path={Path.Logout} element={<Logout/>}/>
            </Route>
        </Routes>
        
      </AuthProvider>
    </ErrorHandler>

        
  )
}

export default App
