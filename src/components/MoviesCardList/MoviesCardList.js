import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import React from 'react'
export default function MoviesCardList(props){
    const [isOverFilled, setIsOverFilled] = React.useState(false);
    const [films, setFilms] = React.useState(props.films);
    const [visibleFilms, setVisibleFilms] = React.useState([]);
    const [width, setWidth] = React.useState(window.innerWidth);
    function timeConverter(time){
        return `${Math.floor(time/60) !== 0 ? Math.floor(time/60)+'ч':''} ${time-60 * Math.floor(time/60)}м`
    }
    function debounce(call, timeoutMs){
        let timeout;
        return function(){
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout= setTimeout(() => call.apply(context, args), timeoutMs)
        }
    }
    function filterFilms(){
        if(width>768 && films.length > 12){
            if(props.visibleFilmsLength<=12){
                const reducedArray = films.slice(0,12);
                setVisibleFilms(reducedArray)
            }
            else{
                const reducedArray = films.slice(0,props.visibleFilmsLength);
                setVisibleFilms(reducedArray)              
            }
        } else if((width>768 && films.length <= 12)){
            setVisibleFilms(films)
        }    
        if(width <= 768 && films.length > 8){
            const reducedArray = films.slice(0,8);
            setVisibleFilms(reducedArray)
        } else if((width<=768 && films.length <= 8)){
            setVisibleFilms(films)
        } 
        if(width <= 320 && films.length > 5){
            const reducedArray = films.slice(0,5);
            setVisibleFilms(reducedArray)
        } else if((width<=320 &&films.length <= 5)){
            setVisibleFilms(films)
        }
    }
    React.useEffect(() => {
        if(films.length !== 0){
            filterFilms()
        }
    },[width]);
    function updateWidth(){
        setWidth(window.innerWidth)
    }
    React.useEffect(() => {
        filterFilms()
    },[films])
    React.useEffect(() => {
        const handleWindowEventDebounce = debounce(updateWidth, 500);
        window.addEventListener('resize',handleWindowEventDebounce);
        if(props.type === 'save'){
          filterFilms()
        }
        return () => {
            window.removeEventListener('resize', handleWindowEventDebounce)
        }
    },[])

    React.useEffect(() => {
        const filter = props.filterFilms()
            setFilms(filter())
    },[props.checkboxValue,props.films])
    React.useEffect(() => {
        if(films.length !== 0){
            if(films.length > visibleFilms.length){
                setIsOverFilled(true)
            }
            else{
                setIsOverFilled(false)               
            }
        }
    },[visibleFilms])
    function handleMoreButtonEffect(){
        const length = visibleFilms.length
        if(window.innerWidth>768){
            props.changeVisibleFilmsLength(length+3);
            if(props.type === 'find'){
                localStorage.setItem('visibleFilmsLength', JSON.stringify(length+3));
            }
            else if(props.type === 'save'){
                localStorage.setItem('savedVisibleFilmLength', JSON.stringify(length+3));                
            }
        }
        if(window.innerWidth<=768){
            props.changeVisibleFilmsLength(length+2);
            if(props.type === 'find'){
                localStorage.setItem('visibleFilmsLength', JSON.stringify(length+2));
            }
            else if(props.type === 'save'){
                localStorage.setItem('savedVisibleFilmLength', JSON.stringify(length+2));                
            }
        }
        if(window.innerWidth<=768){
            props.changeVisibleFilmsLength(length+2);
            if(props.type === 'find'){
                localStorage.setItem('visibleFilmsLength', JSON.stringify(length+2));
            }
            else if(props.type === 'save'){
                localStorage.setItem('savedVisibleFilmLength', JSON.stringify(length+2));                
            }
        }
        }
    React.useEffect(() => {
        filterFilms()
    },[props.visibleFilmsLength])

    return (
        <section className='moviescardlist'>
            {props.preloaderDisplay?
                <Preloader/>:
                ''
            }
            {visibleFilms.length !== 0 && !props.preloaderDisplay ?
            <>
                <ul className='moviescardlist__cards'>
                    {visibleFilms.map((film, i) => (
                    <MoviesCard 
                      key={props.type === 'find'? film.id : film._id}
                      card={props.type === 'find'? `https://api.nomoreparties.co/.${film.image.url}` : film.image}
                      film={film}
                      type={props.type}
                      image={props.image}
                      savedMovies={props.savedMovies}
                      duration={timeConverter(film.duration)}
                      deleteMovie={props.deleteMovie}
                      addMovie={props.addMovie}
                      arrayAddSavedMovies={props.arrayAddSavedMovies}
                      arrayDeleteMovie={props.arrayDeleteMovie}
                    />   
                    )                
                    )}
                </ul>
                {
                    isOverFilled ? <button type='button' onClick={handleMoreButtonEffect} className='moviescardlist__button'>Ещё</button> : <></>
                }
            </> : 
            !props.preloaderDisplay && props.isVisited ?
            <h2 className='moviescardlist__not-found'>Ничего не найдено</h2> : ''
            }
        </section>
    )
}