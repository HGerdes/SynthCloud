import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { allAlbums } from "../../store/albums";
import { allGenres } from "../../store/genres";

const uploadSongForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;

    const genres = useSelector(state => {
        return state.genres.allGenres
    })

    const albums = useSelector(state => {
        return state.albums.allAlbums
    })

    return (
        <>
        
        </>
    )

}

export default uploadSongForm;
