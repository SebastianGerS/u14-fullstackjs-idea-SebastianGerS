import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { scrollToTop } from '../../Helpers/UserAgent';
import { invalidEmail, invalidPassword } from '../../Helpers/Validation';

function LoginForm({ atemptLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    scrollToTop();
    atemptLogin({ email, password });
  };

  return (
    <form className="login-form" onSubmit={login}>
      <label htmlFor="email">
      Email:
        <input type="text" name="email" id="email" className={invalidEmail(email) ? 'invalid' : 'valid'} value={email} onChange={e => setEmail(e.target.value)} />
      </label>

      <label htmlFor="password">
      Password:
        <input type="password" name="password" id="password" className={invalidPassword(password) ? 'invalid' : 'valid'} value={password} onChange={e => setPassword(e.target.value)} />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  atemptLogin: PropTypes.func.isRequired,
};

export default LoginForm;
