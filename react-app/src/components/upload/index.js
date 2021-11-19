import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { allAlbums } from "../../store/albums";
import { allGenres } from "../../store/genres";

const UploadSongForm = () => {
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [genre, setGenre] = useState(1)
    const [album, setAlbum] = useState(1)

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

    console.log("genres", genres)

    return (
        <>
            <div className="pageContainer">
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
                    <div className="albumName"> Select the album this track belongs to:</div>
                        <select className="albumSelect" onChange={(e) => setAlbum(e.target.value)}>
                            {albums?.map(album =>
                                <option key={album.id} value={album.id}>{album.album_name}</option>
                            )}
                        </select>
                </div>
            </div>
        </>
    )

}

export default UploadSongForm;
