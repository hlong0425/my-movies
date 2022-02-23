import { NavLink } from 'react-router-dom';
import './Header.css';
const Header = function () {
    const scrollToHeadHandler = (e) => {
        window.scrollTo({
            top: 0, behavior: 'smooth',
        })
    }

    return (
        <div className="header">
            <div className="logo" onClick={scrollToHeadHandler}>MY-MOVIES 🎬</div>
            <div className='header__nav'>
                <ul>
                    <NavLink to='/trending' activeClassName="selected">Home</NavLink>
                    <NavLink activeClassName="selected" to='/movies'>Movies</NavLink>
                    <NavLink activeClassName="selected" to='/series'>TV Series</NavLink>
                    <NavLink activeClassName="selected" to='/search'>Search</NavLink>
                </ul>
            </div>
        </div>
    )

}

export default Header; 