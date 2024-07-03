import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const callApi = async (endpoint) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:8080/api/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        ) : (
          <>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
            <button onClick={() => callApi('public')}>Call Public API</button>
            <button onClick={() => callApi('private')}>Call Private API</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
