import { createTheme, ThemeProvider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import './CustomPagination.css'

const darkTheme = createTheme({
    palette: {
        type: 'dark',
    }
})

const CustomPagination = (props) => {
    const handlerChange = (event, value) => {
        props.onSetPage(prePageState => {
            return { ...prePageState, current: value }
        });
        window.scrollTo({
            top: 0, behavior: 'smooth',
        })
    }

    const style = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        width: '100%',
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <Pagination onChange={handlerChange} style={style} count={props.totalPages} color="primary" />
        </ThemeProvider>
    )

}

export default CustomPagination; 