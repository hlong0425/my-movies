import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import { Container } from '@material-ui/core';
import { Redirect, Route } from 'react-router-dom';
import Movies from './pages/movies/Movies';
import Trending from './pages/trending/Trending';
import Search from './pages/search/Search';
import Series from './pages/series/Series';
import { Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route exact path={'/'}>
              <Redirect to='/trending'></Redirect>
            </Route>
            <Route path={'/movies'} component={Movies} />
            <Route path={'/series'} component={Series} />
            <Route path={'/search'} component={Search} />
            <Route path={'/trending'} component={Trending} />
          </Switch>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </>
  );
}

export default App;
