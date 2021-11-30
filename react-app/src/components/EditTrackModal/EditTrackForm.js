import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { allAlbums } from "../../store/albums";
import { allGenres } from "../../store/genres";
import { editTrack } from "../../store/tracks";

const EditSongForm = ({setShowModal, ...props}) => {
    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id;
    const dispatch = useDispatch();
    const history = useHistory();
    let genreName;
    let id = props.track?.id;

    useEffect(() => {
        dispatch(allGenres())
    },[dispatch])

    const genres = useSelector(state => {
        return state.genres.getAllGenres?.list;
    })

    if (genres) {
        console.log(genres)
    }

    const [name, setName] = useState(props.track.name);
    const [imageUrl, setImageUrl] = useState(props.track.image_url);
    const [errors, setErrors] = useState([]);


    const [genre, setGenre] = useState(genreName);

    useEffect(() => {
        setGenre(genreName)
    },[genreName])

    useEffect(() => {
        let trackGenre = genres?.filter((genre) => {
            return genre.id === props.track.genre_id;
        })

        if (trackGenre) {
            setGenre(trackGenre[0].id)
        }
    },[genres])

    if (genreName) {
        console.log(genreName)
    }

    useEffect(() => {
        dispatch(allAlbums())
    },[dispatch])

    const albums = useSelector(state => {
        return state.albums.getAllAlbums?.list;
    })

    useEffect(() => {
        const errors = [];
        const imageTypes = ["png", "jpg", "jpeg", "gif"];
        const imageType = imageUrl.split(".");
        const imageExt = imageType[imageType.length-1];

        if (name.length < 1) {
            errors.push("Track name can't be empty")
        }

        if (name.length > 250) {
            errors.push("Shorten the name of your track (250 character limit)")
        }

        if (!imageTypes.includes(imageExt)) {
            errors.push("Must be valid image (png, jpg, jpeg, gif")
        }

        if (imageUrl.length < 1) {
            errors.push("Image URL can't be empty")
        }

        if (imageUrl.length > 250) {
            errors.push("Shorten the length of your image URL (250 character limit)")
        }

        setErrors(errors)
    },[name, imageUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: id,
            user_id: userId,
            genre_id: genre,
            album_id: 1,
            name,
            image_url: imageUrl,
        }

        console.log("PAYLOAD", payload)
        await dispatch(editTrack(payload));
        let navString = "/profile/" + userId
        history.push(navString)
    }

    return (
        <>
            <div className="uploadPageContainer">
                <div className="uploadPageInnerStuff">
                    <div className="uploadPageDesc">Edit Your Track:</div>
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
                                <select className="genreSelect" value={genre} onChange={(e) => setGenre(e.target.value)}>
                                    {genres?.map(genre =>
                                        <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="imageURL"> Image URL:
                                <div className="imageUrlContainer">
                                    <input
                                        className="imageUrlField"
                                        type="imageUrl"
                                        name="imageUrl"
                                        value={imageUrl}
                                        placeholder="i.e. https://i.imgur.com/OvTKGze.jpg"
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="subBut">
                                <button disabled={ errors.length > 0 } type="submit" className="uploadSubButt">Submit Track</button>
                            </div>
                            <ul className="errors">
                                {errors.map(error => (
                                    <li className="formError" key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default EditSongForm;
