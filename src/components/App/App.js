import './App.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import ProtectedRouteElement from '../ProtectedRoute';
import { AppContext } from '../AppContext';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate()
  const Api = new mainApi('http://localhost:3000');
  const [apiErrorIsActive,setApiErrorIsActive] = React.useState(false);
  const [apiErrorMessage, setApiErrorMessage] = React.useState('');
  const [lang, setLang] = React.useState('ru')
  const [visibleFilmsLength, setVisibleFilmsLength] = React.useState(JSON.parse(localStorage.getItem('visibleFilmsLength')));
  const [savedVisibleFilmLength, setSavedVisibleFilmLength] = React.useState(JSON.parse(localStorage.getItem('savedVisibleFilmLength')));
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
  const [isFilmsVisited, setIsFilmsVisited] = React.useState(false);
  const [isSavedMoviesVisited, setIsSavedMoviesVisited] = React.useState(false);
  const [isVisited, setIsVisited] = React.useState(JSON.parse(localStorage.getItem('isVisited')));
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [saveCheckboxValue, setSaveCheckboxValue] = React.useState(false);
  const [isCheckboxChanged, setIsCheckboxChanged] = React.useState(false);
  const [isSaveCheckboxChanged, setIsSaveCheckboxChanged] = React.useState(false);
  const [searchFormName, setSearchFormName] = React.useState('')
  const [saveSearchFormName, setSaveSearchFormName] = React.useState('');
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [films,setFilms] = React.useState([])
  const [preloaderDisplay, setPreloaderDisplay] = React.useState(false)
  const [currentUser , setCurrentUser] = React.useState({
    name: '',
    email: ''
  });
  const [savedMovies, setSavedMovies] = React.useState([])
  const location = useLocation();
  const isShowFooter = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/';
  const isShowHeader = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/profile' || location.pathname ==='/';

  //Общие правила для всех вкладок
  function visit(){
    setIsVisited(true);
    localStorage.setItem('isVisited', JSON.stringify(true))
  }
  function getUser(){
    Api.getUserInfo()
    .then((res) => {
      setCurrentUser({name:res.name, email:res.email})
      setLoggedIn(true)
    })
    .catch((err) => console.log(err))
  }
  function changePreloaderDisplay(){
    setPreloaderDisplay(true)
  }
  React.useEffect(() => {
    if(loggedIn){
      getUser()
      getSavedMovies()  
    } 
  },[loggedIn])

  //Для вкладки "Фильмы"
  function changeVisibleFilmsLength(value){
    setVisibleFilmsLength(value)
  }
  function filterFilms(){
    let unfilterdFilms = films;
      return function(){
        if (checkboxValue) {
          return films.filter((film) => {
            if (!film) {
              return false
            }
            return film.duration < 40;
          })    
          } else {
              return unfilterdFilms;
        }
      }
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
    setIsFilmsVisited(true);
  }
  React.useEffect(() => {
    if(films.length !== 0){
        localStorage.setItem('movies',JSON.stringify(films));
    }
    if(isFilmsVisited && films.length === 0){
      localStorage.setItem('movies',JSON.stringify(films));      
    }
  },[films])
  React.useEffect(() => {
  const movies = JSON.parse(localStorage.getItem('movies'));
  const checkbox = JSON.parse(localStorage.getItem('checkbox'));
  const search = JSON.parse(localStorage.getItem('search'));
  if(checkbox){
    setCheckboxValue(checkbox);
  }
  if(search){
    setSearchFormName(search);
  }
  if(movies){
      setFilms(movies);
  }
  },[])
  function deleteMovie(id){
    return Api.deleteMovie(id)
  }
  function addMovie(movie){
    return Api.addMovie(movie)
  }
  function arrayAddSavedMovies(movie){
    setSavedMovies([
      ...savedMovies,
      movie
    ])
  }
  function arrayDeleteMovie(movie){
    setSavedMovies((state)=> state.filter(i => i.movieId !== movie.id))
  }

  //Для поиска во вкладе фильмы
  function handleChange(e){
    setSearchFormName(e.target.value)
  }
  function changeCheckbox(){
    setCheckboxValue(!checkboxValue);
    setIsCheckboxChanged(true);
  }
  React.useEffect(() => {
    if(isCheckboxChanged){
      localStorage.setItem('checkbox', JSON.stringify(checkboxValue))
    }
  },[checkboxValue])
  React.useEffect(()=> {
    if(searchFormName !== ''){
      localStorage.setItem('search', JSON.stringify(searchFormName));
    }
  },[searchFormName])

  //Для вкладки "Сохранённые фильмы"
  function changeSavedVisibleFilmsLength(value){
    setSavedVisibleFilmLength(value)
  }
  function getSavedMovies(){
    Api.getSavedMovies()
    .then((res) => {
      setSavedMovies(res)
    })
    .catch((err) => console.log(err))
  }
  function filterSavedMovies(){
    let unfiltredFilms = searchedSavedMovies;
      return function(){
        if (saveCheckboxValue) {
          return searchedSavedMovies.filter((film) => {
            if (!film) {
              return false
            }
            return film.duration < 40;
          })    
          } else {
              return unfiltredFilms;
        }
      }
  }
  function searchSavedMovies(word){
    if(word === ''){
      setSearchedSavedMovies(savedMovies);
      setPreloaderDisplay(false);
    } else {
      setSearchedSavedMovies(savedMovies.filter((film) => {
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
    }
    setIsSavedMoviesVisited(true);
  }
  function saveArrayDeleteMovie(movie){
    setSavedMovies((state)=> state.filter(i => i.movieId !== movie.movieId))
  }
  React.useEffect(() => {
    const checkbox = JSON.parse(localStorage.getItem('saveCheckbox'));
    const search = JSON.parse(localStorage.getItem('saveSearch'));
    if(checkbox){
      setSaveCheckboxValue(checkbox);
    }
    if(search){
      setSaveSearchFormName(search);
    }
  },[])
  React.useEffect(()=> {
    searchSavedMovies(saveSearchFormName)
  },[savedMovies])
  //Для поиска во вкладке сохранённые фильмы
  function handleSaveChange(e){
    setSaveSearchFormName(e.target.value)
  }
  function changeSaveCheckbox(){
    setSaveCheckboxValue(!saveCheckboxValue);
    setIsSaveCheckboxChanged(true);
  }
  React.useEffect(() => {
    if(isSaveCheckboxChanged){
      localStorage.setItem('saveCheckbox', JSON.stringify(saveCheckboxValue))
    }
  },[saveCheckboxValue])
  React.useEffect(()=> {
      localStorage.setItem('saveSearch', JSON.stringify(saveSearchFormName));
  },[saveSearchFormName]) 
  //Действия с учетной записью
  function onRegistrate (name, email, password){
    Api.signup({name, email, password})
    .then((res) => {
      navigate('/signin',{replace: true})

    })
    .catch((err) => {
      err
      .then((err)=>{
        console.log(err)
        setApiErrorIsActive(true);
        setApiErrorMessage(err.message);
      })
    })
  }
  function onLogin( email, password ){
    Api.singnin({email, password})
    .then((res) => {
      navigate('/',{replace: true})
      localStorage.setItem('loggedIn', JSON.stringify(true))
      setLoggedIn(true)
    })
    .catch((err) => {
        err
        .then((er) => {
          console.log(er)
          setApiErrorIsActive(true);
          setApiErrorMessage(er.message);
        })
    })   
  }
  function updateUser(userInfo){
    Api.updateUserInfo(userInfo)
    .then((res) => {
      setCurrentUser({name:res.name, email:res.email})
    })
  }

  function logout(){
    Api.logout()
    .then((res) => {
      localStorage.clear();
      navigate('/signin',{replace: true})
      setLoggedIn(false)
      setCheckboxValue(false);
      setSaveCheckboxValue(false);
      setIsFilmsVisited(false);
      setIsSavedMoviesVisited(false);
      setFilms([]);
      setSearchedSavedMovies([])
      setSearchFormName('');
      setSaveSearchFormName('');
      setIsVisited(false);
    })
    .catch((err) => console.log(err))
  }

  //Действия с валидацией
  function hideErrorDisplay(){
    setApiErrorIsActive(false)
  }


  return (
   <AppContext.Provider value={currentUser}>
      <div className='page'>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang }}/>     
      </HelmetProvider>
      { isShowHeader?
      <Header loggedIn={loggedIn} location={location} />:
      ""
      }
      
      <Routes>
        <Route path='/' element={
          <Main loggedIn={loggedIn}/>}/>
        <Route path='/movies' element={ 
          <ProtectedRouteElement
            element={Movies}
            loggedIn={loggedIn}
            films={films}
            getFilms={getFilms}
            handleChange={handleChange}
            searchFormName={searchFormName}
            changePreloaderDisplay={changePreloaderDisplay}
            preloaderDisplay={preloaderDisplay}
            checkboxValue={checkboxValue}
            changeCheckbox={changeCheckbox}
            filterFilms={filterFilms}
            setFilms={setFilms}
            visibleFilmsLength={visibleFilmsLength}
            changeVisibleFilmsLength={changeVisibleFilmsLength}
            isFilmsVisited={isFilmsVisited}
            isVisited={isVisited}
            visit={visit}
            savedMovies={savedMovies}
            deleteMovie={deleteMovie}
            addMovie={addMovie}
            arrayAddSavedMovies={arrayAddSavedMovies}
            arrayDeleteMovie={arrayDeleteMovie}
          />}
        />
        <Route path='/saved-movies' element={ 
          <ProtectedRouteElement 
          element={SavedMovies}
          loggedIn={loggedIn}
          films={searchedSavedMovies}
          getFilms={searchSavedMovies}
          handleChange={handleSaveChange}
          searchFormName={saveSearchFormName}
          changePreloaderDisplay={changePreloaderDisplay}
          preloaderDisplay={preloaderDisplay}
          checkboxValue={saveCheckboxValue}
          changeCheckbox={changeSaveCheckbox}
          filterFilms={filterSavedMovies}
          setFilms={setSearchedSavedMovies}
          visibleFilmsLength={savedVisibleFilmLength}
          changeVisibleFilmsLength={changeSavedVisibleFilmsLength}
          isFilmsVisited={isSavedMoviesVisited}
          isVisited={isVisited}
          visit={visit}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
          addMovie={addMovie}
          arrayAddSavedMovies={arrayAddSavedMovies}
          arrayDeleteMovie={saveArrayDeleteMovie}
          />
        }/>
        <Route path='/profile' element={
          <ProtectedRouteElement
            element={Profile}
            loggedIn={loggedIn}
            updateUser={updateUser}
            logout={logout}
          />}/>
        <Route
          path='/signup'
          element={
              <Register 
                hideErrorDisplay={hideErrorDisplay}
                onRegistrate={onRegistrate}
                apiErrorIsActive={apiErrorIsActive}
                apiErrorMessage={apiErrorMessage}
              />
            }
        />
        <Route
          path='/signin'
          element={
            <Login 
              hideErrorDisplay={hideErrorDisplay}
              onLogin={onLogin}
              apiErrorIsActive={apiErrorIsActive}
              apiErrorMessage={apiErrorMessage}
            />
          }
        />
        <Route path="*"element={ <NotFound/> }/>
      </Routes>
      {isShowFooter ? <Footer/> : '' }
      </div>
    </AppContext.Provider> 
  );
}
export default App;