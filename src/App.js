import React from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HomePage></HomePage>
    ),
  },
  {
    path: "login",
    element:(
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/signup",
    element:(
      <SignUpPage></SignUpPage>
    ),
  },
]);



function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
