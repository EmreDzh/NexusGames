import './LoginStyle.css'

import { useContext } from 'react';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import Path from '../../paths/paths';
import { useNavigate, Link } from 'react-router-dom';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password',
};


export default function Login() {
    const navigate = useNavigate();

    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    });

    return (
    <body className='login-body'>
        <div className="login-container">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form id='login' onSubmit={onSubmit}>
                        <input type="email" id="email" name="email"  placeholder="Enter your email" onChange={onChange}  values={values[LoginFormKeys.Email]}/>
                        <input type="password" id='password' name='password' placeholder="Enter your password" onChange={onChange } values={values[LoginFormKeys.Password]} />

                        <input className="button" type="submit" value="Login" />
                    </form>
                <div className="signup">
                    <span className="signup">
                        Don't have an account?
                        <Link to={Path.Register}><label htmlFor="check"> Singup</label></Link>
                    </span>
                </div>
            </div>
        </div>
    </body>
 
    );
}