import React from 'react';
import PropType from 'prop-types';

const Login = ({ authtenticate }) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => authtenticate('Github')}>Log in with GitHub</button>
  </nav>
);

Login.propTypes = {
  authtenticate: PropType.func.isRequired,
};

export default Login;
