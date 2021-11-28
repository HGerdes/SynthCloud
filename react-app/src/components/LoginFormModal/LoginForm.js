import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./loginForm.css"

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/home' />;
    }

    return (
        <form onSubmit={onLogin}>
        <div>
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
            <div className="emPassContainer">
                <div className="emailForm">
                    <label htmlFor='email'>Email:</label>
                    <input
                        className="emailField"
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div className="passwordForm">
                    <label htmlFor='password'>Password: </label>
                    <input
                        className="passwordField"
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <button className="loginSubButt" type='submit'>Login</button>
            </div>
        </form>
  );
};

export default LoginForm;
