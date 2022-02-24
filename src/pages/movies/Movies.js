import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenre";


import './Movies.css';
const Movie = function () {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [page, setPage] = useState({ current: 1, total: 0 });
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    // Click genre => updatedSelectedGenre => realoadMovie => 
    const fetchMovies = async () => {
        setIsLoading(true);
        setErr(null);
        try {
            const { data, status } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page.current}&with_genres=${genreforURL}`);

            setContent(data.results);
            setPage(prePageState => {
                return { ...prePageState, total: data.total_pages }
            })


        }
        catch (error) {
            setContent([]);
            setErr('Something went wrong');
        }

        setIsLoading(false);
    }

    let displayContent = <p>Could not find any movies</p>;


    if (isLoading) {
        displayContent = <p>...Loading</p>
    }

    if (err) {
        displayContent = <p>{err}</p>
    }

    if (content.length > 0) {
        displayContent = (
            <div className="movies">
                {content.map(c => (
                    <SingleContent
                        key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                    />
                ))}
            </div>
        )
    }



    useEffect(() => {
        fetchMovies();
    }, [page.current, genreforURL]);



    return <div>
        <div className="pageTitle">Movies</div>

        <Genres
            type='movie'
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
        />

        {displayContent}

        <CustomPagination onSetPage={setPage} totalPages={page.total} />
    </div>
}

export default Movie; 