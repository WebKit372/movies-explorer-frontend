import './MoviesCard.css'
import card from '../../../images/pic__COLOR_pic.png';
export default function MoviesCard(){
    return(
        <div className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>В погоне за Бенкси</h2>
                <p className='movies-card__duration'>0ч 42м</p>
            </div>
            <img src={card} className='movies-card__image' alt='Фотография из фильма'/>
            <button className='movies-card__button'>Сохранить</button>
        </div>
    )
}