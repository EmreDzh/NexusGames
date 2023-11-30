import './RegisterStyle.css'

import AuthContext from '../../contexts/authContext'
import useForm from '../../hooks/useForm'
import { useContext } from 'react';
import Path from '../../paths/paths';
import { useNavigate, Link } from 'react-router-dom';


const RegisterFormKeys = {
    Username: 'username',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password',
};


export default function Register() {
    const navigate = useNavigate();

    const {registerSubmitHandler} = useContext(AuthContext);
    const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: ''
    })

    return (
        <body>
            <div className="register-container">
                <div className="registration form">
                    <header>Signup</header>
                    <form id='register' onSubmit={onSubmit}>
                        <input type="username" id="username" name="username"  placeholder="Enter your username" onChange={onChange}  values={values[RegisterFormKeys.Username]}/>
                        <input type="email" id="email" name="email"  placeholder="Enter your email" onChange={onChange}  values={values[RegisterFormKeys.Email]}/>
                        <input type="password" id='password' name='password' placeholder="Create a password" onChange={onChange } values={values[RegisterFormKeys.Password]} />
                        <input type="password" id='confirm-password' name="confirm-password" placeholder="Confirm your password" onChange={onChange} values={values[RegisterFormKeys.ConfirmPassword]} />
                        <input className="button" type="submit" value="Register" />
                    </form>
                    <div className="signup">
                        <span className="signup">
                            Already have an account?
                            <Link to={Path.Login}><label htmlFor="check"> Login</label></Link>
                        </span>
                    </div>
                </div>
            </div>
        </body>

    )
}