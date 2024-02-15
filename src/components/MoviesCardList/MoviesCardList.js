import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
export default function MoviesCardList(props){
    return (
        <main className='moviescardlist'>
            {props.loaded?
                <Preloader/>:
                ''
            }
            <div className='moviescardlist__cards'>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='0ч 42м'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
                <MoviesCard type={props.type} image={props.image} name='В погоне за Бенкси' duration='12'/>
            </div>
            {props.isOverFilled?
                <button className='moviescardlist__button'>Ещё</button> :
                <></>
            }
        </main>
    )
}