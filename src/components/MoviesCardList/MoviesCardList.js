import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import React, { useEffect } from 'react'
export default function MoviesCardList(props){
    const [isOverFilled, setIsOverFilled] = React.useState(false);
    const [films, setFilms] = React.useState(props.films);
    const [visibleFilms, setVisibleFilms] = React.useState([])
    const [width, setWidth] = React.useState(window.innerWidth)
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
        if(width>768 && films.length > 12 && visibleFilms.length <= 12){
            const reducedArray = films.slice(0,12);
            setVisibleFilms(reducedArray)
            setIsOverFilled(true)
        } else if((width>768 && films.length <= 12 && visibleFilms.length <= 12)){
            setIsOverFilled(false)
            setVisibleFilms(films)
        }    
        if(width <= 768 && films.length > 8 && visibleFilms.length <= 8){
            const reducedArray = films.slice(0,8);
            setVisibleFilms(reducedArray)
            setIsOverFilled(true)
        } else if((width<=768 && films.length <= 8 && visibleFilms.length <= 8)){
            setIsOverFilled(false)
            setVisibleFilms(films)
        } 
        if(width <= 320 && films.length > 5 && visibleFilms.length <= 5){
            const reducedArray = films.slice(0,5);
            setVisibleFilms(reducedArray)
            setIsOverFilled(true)
        } else if((width<=320 &&films.length <= 5 && visibleFilms.length <= 5)){
            setIsOverFilled(false)
            setVisibleFilms(films)
        } 
    }
    React.useEffect(() => {
        if(films.length !== 0){
            filterFilms()
        }
    },[width])
    function updateWidth(){
        setWidth(window.innerWidth)
    }
    React.useEffect(() => {
        filterFilms()
        const handleWindowEventDebounce = debounce(updateWidth, 500);
        window.addEventListener('resize',handleWindowEventDebounce);
        return () => {
            window.removeEventListener('resize', handleWindowEventDebounce)
        }
    },[films])
    React.useEffect(() => {
        const filter = props.filterFilms()
            console.log('Я сработал')
            setVisibleFilms([])
            setFilms(filter())
        return () => {
            setFilms(filter())
        }
    },[props.checkboxValue,props.films])

    function handleMoreButtonEffect(){
        const length = visibleFilms.length
        if(window.innerWidth>768){
            const reducedArray = films.slice(0,length+3);
            if(reducedArray.length === films.length){
                setIsOverFilled(false)
            }
            setVisibleFilms(reducedArray);
        }
        if(window.innerWidth<=768){
            const reducedArray = films.slice(0,length+2);
            if(reducedArray.length === films.length){
                setIsOverFilled(false)
            }
            setVisibleFilms(reducedArray) 
        }
        if(window.innerWidth<=768){
            const reducedArray = films.slice(0,length+2);
            if(reducedArray.length === films.length){
                setIsOverFilled(false)
            }
            setVisibleFilms(reducedArray) 
        }
        }


    return (
        <section className='moviescardlist'>
            {props.preloaderDisplay?
                <Preloader/>:
                ''
            }
            {films.length !== 0 && !props.preloaderDisplay ?
            <>
                <ul className='moviescardlist__cards'>
                    {visibleFilms.map((film, i) => (
                    <MoviesCard key={film.id} card={`https://api.nomoreparties.co/.${film.image.url}`} type={props.type} image={props.image} name={film.nameRU} duration={timeConverter(film.duration)} trailer={film.trailerLink}/>   
                    )                
                    )}
                </ul>
                {
                    isOverFilled ? <button type='button' onClick={handleMoreButtonEffect} className='moviescardlist__button'>Ещё</button> : <></>
                }
            </> :
            !props.preloaderDisplay ?
            <h2 className='moviescardlist__not-found'>Ничего не найдено</h2> : ''
            }
        </section>
    )
}