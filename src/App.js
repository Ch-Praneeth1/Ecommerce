import React from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <div className="App">
      {/* <HomePage></HomePage> */}
      {/* <LoginPage></LoginPage> */}
      <SignUpPage></SignUpPage>
    </div>
  );
}

export default App;
