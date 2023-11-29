import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/authContext"
import ErrorHandler from './components/ErrorHandler';
import AuthGuard from './guards/AuthGuard';
import Path from "./paths/paths"

import Header from './components/Header/Header';
import MiddleSection from './components/MiddleSection/MiddleSection';

function App() {
  
  return (
    <ErrorHandler>
      <AuthProvider>
        <Header/>
        <MiddleSection/>
      </AuthProvider>
    </ErrorHandler>

        
  )
}

export default App
