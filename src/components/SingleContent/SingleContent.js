import { img_300, unavailable } from "../../config/config";
import './SingleContent.css';
import { Badge } from "@material-ui/core";
import { modalContext } from "../../context/modal-context";
import { useContext } from "react";

const SingleContent = (props) => {
    const ModalCtx = useContext(modalContext);

    const movieDetailHandler = () => {
        console.log(props.id, props.media_type);
        ModalCtx.openModalHandler(props.id, props.media_type);
    }
    return (
        <Badge badgeContent={props.vote_average} color={props.vote_average > 6 ? 'primary' : 'secondary'}>
            <div onClick={movieDetailHandler} className="media">
                <img
                    className="poster"
                    src={props.poster ? `${img_300}/${props.poster}` : unavailable}
                    alt={props.title} />

                <div className="movie__info">
                    <h3 className="movie__info__title">{props.title}</h3>
                    <div className="movie__info__subtitle">
                        <span>{props.media_type === 'tv' ? 'TV Series' : 'Movie'}</span>
                        <span >{props.date}</span>
                    </div>
                </div>

            </div>
        </Badge>
    )
}

export default SingleContent; 