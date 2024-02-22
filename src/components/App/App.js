import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import React from 'react';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import apiTool from '../../utils/MoviesApi';
import { Helmet, HelmetProvider  } from "react-helmet-async";

function App() {
  const [searchFormName, setSearchFormName] = React.useState('')
  const [films,setFilms] = React.useState([])
  const [preloaderDisplay, setPreloaderDisplay] = React.useState(false)
  function changePreloaderDisplay(){
    setPreloaderDisplay(true)
  }
  function handleChange(e){
    setSearchFormName(e.target.value)
  }
  function getFilms(word){
    apiTool.getFilms()
    .then(res => {
      setFilms([])
      setFilms(res.filter((film) => {
        if(!film){
          return false
        }
        setPreloaderDisplay(false)
        return (Object.entries(film).some((val)=>{
          const key = val[0]
          const value = val[1]
          if((key !== 'director' && key !== 'country' && key !== 'nameEN' && key !== 'nameRU') || typeof value !== 'string'){
            return false;
          }
          return value.toLowerCase().includes(word.toLowerCase())
        }))
      }))
    })
    .catch((err) => console.log(err))
  }
  const location = useLocation();
  const [lang, setLang] = React.useState('ru')
  const [isOverFilled, setIsOverFilled] = React.useState(false);
  const isShowFooter = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/';
  const isShowHeader = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/profile' || location.pathname ==='/';
  return (
    
    <div className='page'>
    <HelmetProvider>
      <Helmet htmlAttributes={{ lang }}/>     
    </HelmetProvider>
    { isShowHeader?
    <Header authorized={true} location={location} />:
    ""
    }
    
    <Routes>
      <Route path='/' element={ <Main/> }/>
      <Route path='/movies' element={ 
        <Movies
        isOverFilled={isOverFilled}
        films={films} getFilms={getFilms}
        handleChange={handleChange}
        searchFormName={searchFormName}
        changePreloaderDisplay={changePreloaderDisplay}
        preloaderDisplay={preloaderDisplay}
        />
      }/>
      <Route path='/saved-movies' element={ 
        <SavedMovies
        isOverFilled={isOverFilled}
        films={films} getFilms={getFilms}
        changePreloaderDisplay={changePreloaderDisplay}
        preloaderDisplay={preloaderDisplay}
        />
      }/>
      <Route path='/profile' element={ <Profile/> }/>
      <Route path='signup' element={ <Register/>}/>
      <Route path='signin' element={ <Login/> }/>
      <Route path="*"element={ <NotFound/> }/>
    </Routes>
    {isShowFooter ? <Footer/> : '' }
    </div>
  );
}
export default App;
