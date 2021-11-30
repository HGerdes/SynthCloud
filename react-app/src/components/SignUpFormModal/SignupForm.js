import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useEffect } from 'react';
import "./signupform.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords don't match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
        <div className="signupFormContainer">
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>User Name</label>
                <input
                    className="emailField"
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    className="emailField"
                    type='email'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                ></input>
            </div>
            <div>
                <label>Password</label>
                <input
                    className="passwordField"
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div>
                <label>Repeat Password</label>
                <input
                    className="emailField"
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
        <button disabled={ errors.length > 0 } className="signupSubButt" type='submit'>Sign Up</button>
        </div>
    </form>
  );
};

export default SignUpForm;
