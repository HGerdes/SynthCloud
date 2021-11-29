import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditButtonForm from './EditButtonForm';

function EditButtonFormModal(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="delComBtn" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditButtonForm setShowModal={setShowModal} theComment={props.theComment}/>
                </Modal>
            )}
        </>
    );
}

export default EditButtonFormModal;
