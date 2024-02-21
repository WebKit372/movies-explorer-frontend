import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
export default function MoviesCardList(props){
    function timeConverter(time){
        return `${Math.floor(time/60) !== 0 ? Math.floor(time/60):''}ч ${time-60 * Math.floor(time/60)}м`
    }
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
            <h2>Ничего не найдено</h2> : ''
            }
        </section>
    )
}