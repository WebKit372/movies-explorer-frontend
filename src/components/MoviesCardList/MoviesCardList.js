import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import React from 'react'
export default function MoviesCardList(props){
    const [columnNumber, setColumnNumber] = React.useState(window.innerWidth > 768? 3 : window.innerWidth >320? 2 : 1);
    const [rowsNumber, setRowsNumber] = React.useState(window.innerWidth > 768? 4: window.innerWidth> 320? 4: 5);
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
        if(films.length > columnNumber*rowsNumber){
                const reducedArray = films.slice(0,columnNumber*rowsNumber);
                setIsOverFilled(true)
                setVisibleFilms(reducedArray)
        } else if((films.length <= columnNumber*rowsNumber)){
                setVisibleFilms(films)
                setIsOverFilled(false) 
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
        setRowsNumber(columnNumber===1? 5 : 4)
        filterFilms()
    },[columnNumber])
    React.useEffect(() => {
        filterFilms()
    },[rowsNumber])
    React.useEffect(() => {
        const filter = props.filterFilms()
            setFilms(filter())
    },[props.checkboxValue,props.films])

    function handleMoreButtonEffect(){
        if(columnNumber===1){
            setRowsNumber(rowsNumber+2)
        }
        else{
            setRowsNumber(rowsNumber+1)
        }
        }
    React.useEffect(() => {
        try{
            setColumnNumber(getComputedStyle(document.querySelector(".moviescardlist__cards")).gridTemplateColumns.split(" ").length);
        }
        catch{
            return
        }
    },[width,visibleFilms])
    React.useEffect(() => {
        filterFilms()
    },[columnNumber])
    return (
        <section className='moviescardlist'>
            {props.preloaderDisplay?
                <Preloader/>:
                ''
            }
            {!props.preloaderDisplay?
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
            </> : ""}
            {!props.preloaderDisplay && props.isVisited && films.length === 0 ?
            <h2 className='moviescardlist__not-found'>Ничего не найдено</h2> : ''
            }
        </section>
    )
}