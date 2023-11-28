import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../contexts/authContext";

import Path from "../paths/paths";

export default function AuthGuard(props){
    const { isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated){
        return <Navigate to={Path.Login}/>;
    }

    return <Outlet/>;
        
    
}