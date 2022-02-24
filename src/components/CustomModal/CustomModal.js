import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Button, Fade, Hidden } from '@material-ui/core';
import { useContext } from 'react';
import { modalContext } from '../../context/modal-context';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from '../Carousel/Carousel';
import './CustomModal.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));

export default function CustomModal() {
    const classes = useStyles();

    const modalCtx = useContext(modalContext);

    const { open, content, video, closeModalHandler, carouselAtt } = modalCtx;
    console.log(content)

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={closeModalHandler}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className='ContentModal'>
                            <img
                                src={
                                    content.poster_path
                                        ? `${img_500}/${content.poster_path}`
                                        : unavailable
                                }
                                alt={content.name || content.title}
                                className="ContentModal__portrait"
                            />

                            <img
                                className='ContentModal__landscape'
                                alt={content.name || content.title}

                                src={content.poster_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape}>
                            </img>

                            <div className='ContentModal__about'>
                                <span className='ContentModal__title'>
                                    {content.name || content.title} (
                                    {(content.first_air_date || content.release_date || '-----').substring(0, 4)}
                                    )
                                </span>
                                {content.tagline && (<i className='tagline'>{content.tagline}</i>)}
                                <span className='ContentModal__description'>
                                    {content.overview}
                                </span>
                                <Carousel id={carouselAtt.id} media_type={carouselAtt.media_type} />
                                <Button style={{ fontSize: '2.4rem' }} variant='contained'
                                    variant="contained"
                                    startIcon={<YouTubeIcon style={{ fontSize: '4.8rem' }} />}
                                    color='secondary'
                                    target='__blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the trailer
                                </Button>
                            </div>

                            {/* <div className='movie__detail__content'>
                                <span className='detail__content__title'>
                                    {content.name || content.title} (
                                    {(content.first_air_date || content.release_date)?.substring(0, 4)})

                                    {content.tagline && <i className='detail__content__tagline'>{content.tagline}</i>}
                                </span>

                                <div className='detail__content__description'>
                                    {content.overview}
                                </div>

                                <Carousel id={carouselAtt.id} media_type={carouselAtt.media_type} />
                                <Button variant='contained'
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color='secondary'
                                    target='__blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch the trailer
                                </Button>

                            </div> */}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}