import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import './MainNav.css';
import MovieIcon from '@material-ui/icons/Movie';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '500',
        postion: 'fixed',
        bottom: 0,
        backgroundColor: '#2d313a',
        zIndex: 100,
        fontSize: '5rem',

    },

    icon: {
        color: 'white',
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    React.useEffect(() => {
        if (value === 0) history.push('/')
        if (value === 1) history.push('/movies')
        if (value === 2) history.push('/series')
        if (value === 3) history.push('/search')
    }, [value]);
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction className={classes.icon} label="Trending" icon={<WhatshotIcon style={{ fontSize: '3rem' }} />} />
            <BottomNavigationAction className={classes.icon} label="Movies" icon={<MovieIcon style={{ fontSize: '3rem' }} />} />
            <BottomNavigationAction className={classes.icon} label="TV Series" icon={<TvIcon style={{ fontSize: '3rem' }} />} />
            <BottomNavigationAction className={classes.icon} label="Search" icon={<SearchIcon style={{ fontSize: '3rem' }} />} />
        </BottomNavigation>
    );
}