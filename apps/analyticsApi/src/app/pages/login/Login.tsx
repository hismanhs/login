import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../helpers/passwordValidation';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/action/authAction';
import { STATIC_TEXT, MESSAGES } from '../../utils/constants/constants';
import { InputLogin, ButtonLogin } from '@react-monorepo/shared';

import './Login.css';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const validationError = validatePassword(value);
    setError(validationError);
  };

  const handleLogin = useCallback(async () => {
    if (!username || !password) {
      setError(MESSAGES.errors.missingCredentials);
      return;
    }

    if (error) {
      alert(MESSAGES.errors.passwordValidation);
      return;
    }

    await loginUser(
      username,
      password,
      dispatch,
      setError,
      setIsAuthenticated,
      navigate
    );
  }, [username, password, error, dispatch, navigate, setIsAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{STATIC_TEXT.pageTitle}</h1>
        <h6 className="login-subtitle">{STATIC_TEXT.pageSubtitle}</h6>

        <div className="login-input-group">
          {/* <label htmlFor="username" className="login-label">{STATIC_TEXT.usernameLabel}</label> */}
          <InputLogin
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            placeholder="Enter your username"
            className="full-width"
          />
        </div>

        <div className="login-input-group">
          {/* <label htmlFor="password" className="login-label">{STATIC_TEXT.passwordLabel}</label> */}
          <InputLogin
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="full-width"
          />
        </div>

        {error && <div className="login-error">{error}</div>}
        <ButtonLogin
          text={STATIC_TEXT.loginButton}
          onClick={handleLogin}
          appearance="solid"
          sentiment="positive"
          className="full-width"
        />
      </div>
    </div>
  );
};

export default Login;
