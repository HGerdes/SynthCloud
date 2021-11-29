import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { allAlbums } from "../../store/albums";
import { allGenres } from "../../store/genres";
import { createTrack } from "../../store/tracks";
import "./upload.css";

const UploadSongForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [genre, setGenre] = useState(1);
    const [songUrl, setSongUrl] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(allGenres())
    },[dispatch])

    const genres = useSelector(state => {
        return state.genres.getAllGenres?.list;
    })

    useEffect(() => {
        dispatch(allAlbums())
    },[dispatch])

    const albums = useSelector(state => {
        return state.albums.getAllAlbums?.list;
    })

    useEffect(() => {
        const errors = [];

    },[]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: userId,
            genre_id: genre,
            album_id: 1,
            name,
            file: songUrl,
            image_url: imageUrl,
        }
        console.log(payload)

        await dispatch(createTrack(payload));
    }

    return (
        <>
            <div className="uploadPageContainer">
                <div className="uploadPageInnerStuff">
                    <div className="uploadPageDesc">Upload a Track:</div>
                    <div className="commenthr" id="uploadhr"></div>
                    <form className="newTrackForm" onSubmit={onSubmit}>
                        <div className="uploadFormContainer">
                            <div className="uploadTrackName"> Name of track:
                                <div className="inputUploadName">
                                    <input
                                        className="uploadName"
                                        type="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="genreSelContainer">
                                <div className="genreSelTitle">Select the genre:</div>
                                <select className="genreSelect" onChange={(e) => setGenre(e.target.value)}>
                                    {genres?.map(genre =>
                                        <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="trackURL"> Track File:
                                <input
                                    className="uploadFile"
                                    type="file"
                                    name="songUrl"
                                    accept="audio/*"
                                    onChange={(e) => {
                                        setSongUrl(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <div className="imageURL"> Image URL:
                                <div className="imageUrlContainer">
                                    <input
                                        className="imageUrlField"
                                        type="imageUrl"
                                        name="imageUrl"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="subBut">
                                <button disabled={ errors.length > 0 } type="submit" className="uploadSubButt">Submit Track</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default UploadSongForm;
