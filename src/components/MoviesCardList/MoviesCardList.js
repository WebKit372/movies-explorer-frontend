import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
export default function MoviesCardList(props){
    return (
        <section className='moviescardlist'>
            {props.loaded?
                <Preloader/>:
                ''
            }
            <ul className='moviescardlist__cards'>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
            </ul>
            {props.isOverFilled?
                <button type='button' className='moviescardlist__button'>Ещё</button> :
                <></>
            }
        </section>
    )
}