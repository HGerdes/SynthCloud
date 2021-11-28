import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditButtonForm from './EditButtonForm';

function EditButtonFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="loginbtn" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditButtonForm />
                </Modal>
            )}
        </>
    );
}

export default EditButtonFormModal;
