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
import GameInfo from './components/GameInfo/GameInfo';
import GameCollection from './components/GameCollection/GameCollection';

function App() {
  
  return (
    <ErrorHandler>
      <AuthProvider>
        <Header/>
        <Routes>
            <Route path={Path.Home} element={<MiddleSection/>}/>
            <Route path={Path.GameLib} element={<GameCollection/>}/>
            <Route path={Path.Login} element={<Login/>}/>
            <Route path={Path.Register} element={<Register/>}/>
            <Route path={Path.GameInfo} element={<GameInfo/>}/>

            <Route element={<AuthGuard/>}>
              <Route path={Path.Logout} element={<Logout/>}/>
            </Route>
        </Routes>
        
      </AuthProvider>
    </ErrorHandler>

        
  )
}

export default App
