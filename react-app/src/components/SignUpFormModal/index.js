import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="signUpbtn" onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
