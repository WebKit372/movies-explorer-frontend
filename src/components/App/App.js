import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import React from 'react';
function App() {
  const [isOverFilled, setIsOverFilled] = React.useState(false)
  React.useEffect(()=>{
    if(window.innerHeight){
      const emptySpace = document.querySelector('.moviescardlist').scrollHeight - (document.querySelector('.saved-movies')?document.querySelector('.saved-movies').scrollHeight : 0) - (document.querySelector('.movies')?document.querySelector('.movies').scrollHeight : 0);
      console.log(emptySpace)
      if(document.querySelector('.page').scrollHeight + emptySpace > window.innerHeight){
        setIsOverFilled(true)
      }
    }
  },[])
  return (
    <div className='page'>
    <Header authorized={true} />
    <Routes>
      <Route path='/' element={ <Main/> }/>
      <Route path='/movies' element={ <Movies isOverFilled={isOverFilled}/> }/>
      <Route path='/saved-movies' element={ <SavedMovies isOverFilled={isOverFilled}/> }/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
