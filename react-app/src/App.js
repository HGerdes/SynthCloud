import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/LoginFormModal';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import "./app.css";


import HomePage from "./components/HomePage";
import UploadSongForm from './components/upload';
import Header from './components/navbar';
import SingleTrack from './components/SingleTrack';
import Splash from './components/Splash';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Header />
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <Header />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <Header />
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <Header />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <Header />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Header />
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/upload' exact={true} >
          <Header />
          <UploadSongForm />
        </ProtectedRoute>
        <ProtectedRoute path='/tracks/:id' exact={true} >
          <Header />
          <SingleTrack />
        </ProtectedRoute>
        <ProtectedRoute path='/stream' exact={true} >
          <Header />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
