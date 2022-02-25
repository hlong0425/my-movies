import { useEffect, useState } from "react";
import {
    Button,
    createTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import './Search.css'
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
const Search = function (props) {
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState(0);
    const [page, setPage] = useState({ current: 1, totalPages: 0 });
    const [content, setContent] = useState([]);
    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff",
            },
        },
    });
    useEffect(() => {
        if (page.current === 1) {
            return;
        }

        fetchSearch();
    }, [page.current]);
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page.current}&include_adult=false`
            )
            console.log(data);
            setPage(prePageState => {
                return { ...prePageState, total: data.total_pages }
            })
            setContent(data.results);
        }

        catch (error) {
            console.log(error);
        }
    }

    const changeValueHandler = function (e) {
        if (e.target.value === '') {
            return;
        }
        setSearchText(e.target.value);
    }

    const onKeyDownHandler = function (e) {
        if (e.code === 'Enter') {
            fetchSearch();
        }
    }

    let displayContent = <p style={{ fontSize: '2.1rem', color: 'red' }}>
        No results found</p>;

    if (content.length > 0) {
        displayContent = content.map(c => <SingleContent
            key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date}
            media_type={type ? 'tv' : 'movie'}
            vote_average={c.vote_average}
        />)
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className="search">
                    <TextField
                        onChange={changeValueHandler}
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        inputProps={{ style: { fontSize: '2.1rem' } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: '2.1rem' } }} // font size of input label
                        onKeyDown={onKeyDownHandler}
                    />
                    <Button
                        onClick={fetchSearch}
                        variant="contained"
                        style={{ marginLeft: 10 }}
                    >
                        <SearchIcon fontSize="large" />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    style={{ paddingBottom: 5 }}
                    aria-label="disabled tabs example"
                >
                    <Tab onClick={setType.bind(null, 0)} style={{ width: "50%" }} label={<span style={{ fontSize: '1.8rem' }}>Search Movie</span>} />
                    <Tab onClick={setType.bind(null, 1)} style={{ width: "50%" }} label={<span style={{ fontSize: '1.8rem' }}>Search TV Series</span>} />
                </Tabs>
            </ThemeProvider>

            <div className='search__results'>
                {displayContent}
            </div>

            <CustomPagination onSetPage={setPage} totalPages={page.total} />
        </>
    )
}

export default Search; 