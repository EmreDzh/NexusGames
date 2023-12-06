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
import CreateGame from './components/CreateGame/CreateGame';
import EditGame from './components/EditGame/EditGame';
import GameTimeStatistics from './components/GameTimeStatistics/GameTimeStatistics';
import GameMod from './components/GameInfo/GameMod/GameMod';
import ModCollection from './components/ModCollection/ModCollection';


function App() {

  return (
    <ErrorHandler>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path={Path.Home} element={<MiddleSection />} />
          <Route path={Path.GameLib} element={<GameCollection />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.GameInfo} element={<GameInfo />} />
          <Route path={Path.GameTimeStats} element={<GameTimeStatistics />} />
          <Route path={Path.gameMods} element={<GameMod />} />
          <Route path={Path.gameModCollection} element={<ModCollection />} />


          <Route element={<AuthGuard />}>
            <Route path={Path.CreateGame} element={<CreateGame />} />
            <Route path={Path.EditGame} element={<EditGame />} />
            <Route path={Path.Logout} element={<Logout />} />
          </Route>

        </Routes>

      </AuthProvider>
    </ErrorHandler>


  )
}

export default App
