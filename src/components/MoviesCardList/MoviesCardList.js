import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
export default function MoviesCardList(props){
    function timeConverter(time){
        return `${Math.floor(time/60) !== 0 ? Math.floor(time/60):''}ч ${time-60 * Math.floor(time/60)}м`
    }
    return (
        <section className='moviescardlist'>
            {props.loaded?
                <Preloader/>:
                ''
            }
            {props.films.lenght !== 0?
            <>
                <ul className='moviescardlist__cards'>
                {props.films.map((film, i) => (
                <MoviesCard key={film.id} card={`https://api.nomoreparties.co/.${film.image.url}`} type={props.type} image={props.image} name={film.nameRU} duration={timeConverter(film.duration)}/>   
                )                
                )}
            </ul>
                {props.isOverFilled?
                    <button type='button' className='moviescardlist__button'>Ещё</button> :
                    <></>
                }
            </> :<></>
            }
        </section>
    )
}