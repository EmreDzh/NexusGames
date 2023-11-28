import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/authContext"
import ErrorHandler from './components/ErrorHandler';
import AuthGuard from './guards/AuthGuard';
import Path from "./paths/paths"

function App() {
  
  return (
    <ErrorHandler>
      <AuthProvider>
            
        <h1>hello</h1>

      </AuthProvider>
    </ErrorHandler>

        
  )
}

export default App
