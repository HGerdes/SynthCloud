import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditTrackForm';

function EditSongFormModal(props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="editTrackFormBtn" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSongForm setShowModal={setShowModal} track={props.track}/>
                </Modal>
            )}
        </>
    );
}

export default EditSongFormModal;
