import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";


const Genres = (props) => {
    const fetchGenres = async function () {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        props.setGenres(data.genres);
    }

    const handleClick = function (genre) {
        props.setSelectedGenres(pre => [...pre, genre]);
        props.setGenres(props.genres.filter(gen => gen.id !== genre.id));
        props.setPage(1);
    }

    useEffect(() => {
        fetchGenres();
        return () => {
            props.setGenres({});
        }
    }, [])

    const ChipStyle = { fontSize: '1.3rem', margin: '0.4rem 0.4rem 0.8rem 0' };


    return (
        <div style={{ padding: '6px' }}>
            {props.selectedGenres.map(genre => (<Chip key={genre.id} label={genre.name} color='primary' style={ChipStyle} />))}
            {props.genres.map(genre => <Chip key={genre.id} onClick={handleClick.bind(null, genre)} clickable style={ChipStyle} label={genre.name}></Chip>)}
        </div>
    )
}

export default Genres; 