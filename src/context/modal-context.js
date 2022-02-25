import { createContext, useState } from "react";
import axios from "axios";



export const modalContext = createContext({
    open: false,
    openModalHandler: (id) => { },
    closeModalHandler: () => { },
    carouselAtt: {
        id: '',
        media_type: '',
    },
    content: {},
    video: '',
})


const ModalProvider = (props) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({});
    const [video, setVideo] = useState('');
    const [carouselAtt, setCarouselAtt] = useState({});

    const fetchData = async (id, media_type) => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(pre => ({ ...data }));
    };


    const fetchVideo = async (id, media_type) => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setVideo('video', data.results[0]?.key);
    };

    const openModalHandler = function (id, media_type) {
        setCarouselAtt(pre => ({ ...pre, id, media_type }));
        fetchData(id, media_type);
        fetchVideo(id, media_type);
        setOpen(true);
    }


    const closeModalHandler = function (id) {
        setOpen(false);
    }

    return (
        <modalContext.Provider value={{ openModalHandler, closeModalHandler, open, content, video, carouselAtt }}>
            {props.children}
        </modalContext.Provider>
    )

}

export default ModalProvider;

