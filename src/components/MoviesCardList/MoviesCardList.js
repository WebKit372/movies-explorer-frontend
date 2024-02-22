import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import React from 'react'
export default function MoviesCardList(props){
    function timeConverter(time){
        return `${Math.floor(time/60) !== 0 ? Math.floor(time/60):''}ч ${time-60 * Math.floor(time/60)}м`
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
    React.useEffect(() => {
        function handleWindowEvent(e){
            console.log(e.target.innerWidth)
        }
        const handleWindowEventDebounce = debounce(handleWindowEvent, 500);
        window.addEventListener('resize',handleWindowEventDebounce);
        return () => {
            window.removeEventListener('resize', handleWindowEventDebounce)
        }
    })
    return (
        <section className='moviescardlist'>
            {props.preloaderDisplay?
                <Preloader/>:
                ''
            }
            {props.films.length !== 0 && !props.preloaderDisplay ?
            <>
                <ul className='moviescardlist__cards'>
                    {props.films.map((film, i) => (
                    <MoviesCard key={film.id} card={`https://api.nomoreparties.co/.${film.image.url}`} type={props.type} image={props.image} name={film.nameRU} duration={timeConverter(film.duration)}/>   
                    )                
                    )}
                </ul>
                {
                    props.isOverFilled ? <button type='button' className='moviescardlist__button'>Ещё</button> : <></>
                }
            </> :
            !props.preloaderDisplay ?
            <h2 className='moviescardlist__not-found'>Ничего не найдено</h2> : ''
            }
        </section>
    )
}