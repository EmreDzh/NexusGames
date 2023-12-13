import './LoginStyle.css';

import { useContext, useState } from 'react';
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

  const [errors, setErrors] = useState({
    loginError: '',
  });

  const { values, onChange, onSubmit } = useForm(
    
    async (formValues) => {
      try {
        await loginSubmitHandler(formValues);
      } catch (error) {
        console.error('Login error:', error);

        setErrors({
          loginError: 'Invalid email or password. Please try again.',
        });
      }
    },
    
    {
      [LoginFormKeys.Email]: '',
      [LoginFormKeys.Password]: '',
    }
  );

  return (
    <body className="login-body">
      <div className="login-container">
        <input type="checkbox" id="check" />
        <div className="login form">
          <header>Login</header>
          <form id="login" onSubmit={onSubmit}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
              value={values[LoginFormKeys.Email]}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
              value={values[LoginFormKeys.Password]}
            />

            {errors.loginError && (
              <div className="error-message">{errors.loginError}</div>
            )}

            <input className="button" type="submit" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Don't have an account?
              <Link to={Path.Register}>
                <label htmlFor="check"> Signup</label>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </body>
  );
}
