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
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [isCheckboxChanged, setIsCheckboxChanged] = React.useState(false);
  const [searchFormName, setSearchFormName] = React.useState('')
  const [films,setFilms] = React.useState([])
  const [preloaderDisplay, setPreloaderDisplay] = React.useState(false)
  const [currentUser , setCurrentUser] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  function updateUser({name,email,password}){
    if(!password){
      setCurrentUser({
        ...currentUser,
        name: name,
        email: email
      })     
    }else if(!name){
      setCurrentUser({
        ...currentUser,
        email: email,
        password: password
      })      
    } else{
      setCurrentUser({
        name: name,
        email: email,
        password: password
      })
    }
  }
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
  function onLogin( email, password){
    Api.singnin({email, password})
    .then((res) => {
      navigate('/',{replace: true})

    })
    .catch((err) => {
        err
        .then((er)=>{
          console.log(er)
          setApiErrorIsActive(true);
          setApiErrorMessage(er.message);
        })
    })   
  }
  function hideErrorDisplay(){
    setApiErrorIsActive(false)
  }
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
  const location = useLocation();
  const [lang, setLang] = React.useState('ru')
  const isShowFooter = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/';
  const isShowHeader = location.pathname ==='/movies' || location.pathname ==='/saved-movies' || location.pathname ==='/profile' || location.pathname ==='/';

  React.useEffect(() => {
    if(films.length !== 0){
        localStorage.setItem('movies',JSON.stringify(films));
    }
},[films])
  React.useEffect(() => {
    if(isCheckboxChanged){
      localStorage.setItem('checkbox', JSON.stringify(checkboxValue))
      console.log(localStorage)
    }
  },[checkboxValue])
React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    const checkbox = JSON.parse(localStorage.getItem('checkbox'));
    const search = JSON.parse(localStorage.getItem('search'));   
    setCheckboxValue(checkbox);
    setSearchFormName(search);
    if(movies){
        setFilms(movies);
    }
},[])
React.useEffect(()=> {
  if(searchFormName !== ''){
    localStorage.setItem('search', JSON.stringify(searchFormName));
  }
},[searchFormName])
  function changeCheckbox(){
    setCheckboxValue(!checkboxValue);
    setIsCheckboxChanged(true);
  }
  return (
   <AppContext.Provider value={currentUser}>
      <div className='page'>
      <HelmetProvider>
        <Helmet htmlAttributes={{ lang }}/>     
      </HelmetProvider>
      { isShowHeader?
      <Header authorized={true} location={location} />:
      ""
      }
      
      <Routes>
        <Route path='/' element={
          <ProtectedRouteElement element={Main} loggedIn={loggedIn}/>}/>
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
          />}
        />
        <Route path='/saved-movies' element={ 
          <ProtectedRouteElement 
          element={SavedMovies}
          films={films} getFilms={getFilms}
          changePreloaderDisplay={changePreloaderDisplay}
          preloaderDisplay={preloaderDisplay}
          />
        }/>
        <Route path='/profile' element={
          <ProtectedRouteElement element={Profile} loggedIn={loggedIn} updateUser={updateUser}/>}/>
        <Route
          path='/signup'
          element={
            <Register
              hideErrorDisplay={hideErrorDisplay}
              onRegistrate={onRegistrate}
              updateUser={updateUser}
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
              updateUser={updateUser}
              onLogin={onLogin}
              apiErrorIsActive={apiErrorIsActive}
              apiErrorMessage={apiErrorMessage}
            />
          }/>
        <Route path="*"element={ <NotFound/> }/>
      </Routes>
      {isShowFooter ? <Footer/> : '' }
      </div>
    </AppContext.Provider> 
  );
}
export default App;