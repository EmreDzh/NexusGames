import './RegisterStyle.css';
import AuthContext from '../../contexts/authContext';
import useForm from '../../hooks/useForm';
import { useContext, useState } from 'react';
import Path from '../../paths/paths';
import { useNavigate, Link } from 'react-router-dom';


const RegisterFormKeys = {
  Username: 'username',
  Email: 'email',
  Password: 'password',
  ConfirmPassword: 'confirmPassword',
};

export default function Register() {
  const navigate = useNavigate();
  const { registerSubmitHandler } = useContext(AuthContext);
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    registration: '',

  });

  const validatePasswordLength = (password) => {
    return password.length >= 8;
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validatePassword = (password, confirmPassword) => {
    const newErrors = {
      password: '',
      confirmPassword: '',
    };

    if (!validatePasswordLength(password)) {
      newErrors.password = 'Password should be at least 8 characters';
    }

    if (!passwordsMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors })); 

    return Object.values(newErrors).every((error) => error === '');
  };

  const { values, onChange } = useForm(() => { }, {
    [RegisterFormKeys.Username]: '',
    [RegisterFormKeys.Email]: '',
    [RegisterFormKeys.Password]: '',
    [RegisterFormKeys.ConfirmPassword]: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email } = values;
    const isValid = validatePassword(password, confirmPassword);

    if (isValid) {
      try {
        await registerSubmitHandler(values);
      } catch (error) {
        console.error('Registration error:', error);

        setErrors((prevErrors) => ({
          ...prevErrors,
          registration: 'Email already exists. Please use a different email.',
        }));
      }
    }
  };

  return (
    <body>
      <div className="register-container">
        <div className="registration form">
          <header>Signup</header>
          <form id="register" onSubmit={onSubmit}>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={onChange}
              value={values[RegisterFormKeys.Username]}
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
              value={values[RegisterFormKeys.Email]}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              onChange={onChange}
              value={values[RegisterFormKeys.Password]}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={onChange}
              value={values[RegisterFormKeys.ConfirmPassword]}
              required
            />
            {errors.registration && <div className="error-message">{errors.registration}</div>}
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            {errors.password && <div className="error-message">{errors.password}</div>}
            <input className="button" type="submit" value="Register" />
          </form>
          <div className="signup">
            <span className="signup">
              Already have an account?
              <Link to={Path.Login}>
                <label htmlFor="check"> Login</label>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </body>
  );
}
