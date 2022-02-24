import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css';
import CustomPagination from "../../components/Pagination/CustomPagination";
const Trending = function () {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [page, setPage] = useState({ current: 1, total: 0 })
    const fetchTrending = async function () {
        setIsLoading(true);
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page.current}`);
        setContent(data.results);
        setPage((preState) => ({ ...preState, total: data.total_pages }));
    }


    useEffect(() => {
        fetchTrending();
    }, [page.current]);


    let displayContent = 'Could not find any movie';

    if (isLoading) {
        displayContent = '...Loading';
    }

    if (content.length > 0) {
        displayContent = content.map(c => (
            <SingleContent
                key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
            />
        ))
    }



    return <div>
        <div className="trending">
            {displayContent}
        </div>
        <CustomPagination onSetPage={setPage} totalPages={page.total} />
    </div>
}

export default Trending; 