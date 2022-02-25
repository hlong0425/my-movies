import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState } from 'react';
import { img_300 } from '../../config/config';
import { noPicture } from '../../config/config'
import './Carousel.css';
const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {

    const [credits, setCredits] = useState([]);
    const responsiveOption = {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
    }
    const fetchCredits = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
    }


    const items = credits.map(c => (
        <div className='carouselItem'>
            <img alt={credits.title} className='carouseItem__img' style={{ width: '100%' }} src={c.profile_path ? `${img_300}${c.profile_path}` : noPicture}
                onDragStart={handleDragStart}
            ></img>

            <b className='carouseItem__txt'>{c?.name}</b>
        </div>

    ))

    useEffect(() => {
        fetchCredits();
    }, [])

    return (
        <AliceCarousel
            responsive={responsiveOption}
            mouseTracking items={items}
            infinite
            disableButtonsControls
            disableSlideInfo
            autoPlay
        />
    );
}

export default Carousel;

