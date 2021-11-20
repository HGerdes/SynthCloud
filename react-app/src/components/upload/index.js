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

    const [name, setName] = useState("")
    const [genre, setGenre] = useState(1)
    const [songUrl, setSongUrl] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [errors, setErrors] = useState([])

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
            song_url: songUrl,
            image_url: imageUrl,
        }
        console.log(payload)

        await dispatch(createTrack(payload));
    }

    return (
        <>
            <div className="pageContainer">
                <form className="newTrackForm" onSubmit={onSubmit}>
                    <div className="formContainer">
                        <div className="trackName"> Name of track:
                            <input
                                type="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="genreSelTitle">Select the genre:</div>
                        <select className="genreSelect" onChange={(e) => setGenre(e.target.value)}>
                            {genres?.map(genre =>
                                <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
                            )}
                        </select>
                        {/* <div className="albumName"> Select the album this track belongs to:</div>
                        <select className="albumSelect" onChange={(e) => setAlbum(e.target.value)}>
                            {albums?.map(album =>
                                <option key={album.id} value={album.id}>{album.album_name}</option>
                            )}
                        </select> */}
                        <div className="trackURL"> Track URL:
                            <input
                                type="songUrl"
                                name="songUrl"
                                value={songUrl}
                                onChange={(e) => setSongUrl(e.target.value)}
                            />
                        </div>
                        <div className="imageURL"> Image URL:
                            <input
                                type="imageUrl"
                                name="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="subBut">
                            <button disabled={ errors.length > 0 } type="submit">Submit Track</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default UploadSongForm;
