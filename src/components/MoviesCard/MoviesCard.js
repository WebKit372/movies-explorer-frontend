import './MoviesCard.css'
import card from '../../images/pic__COLOR_pic.png';
import React from 'react';
export default function MoviesCard(props){
    const [Active, setActive] = React.useState(true);
    const buttonClass = `movies-card__button ${Active && props.type === 'find' ? 'movies-card__button_active' : ''}`
    function changeButton(){
        if(Active){
            setActive(false);
        } else{
            setActive(true);
        }

    }
    return(
        <div className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>{props.name}</h2>
                <p className='movies-card__duration'>{props.duration}</p>
            </div>
            <img src={card} className='movies-card__image' alt='Фотография из фильма'/>
            <button className={buttonClass} onClick={changeButton}>
                {!Active && props.type === 'find' ? 'Сохранить' : 
                <img src={props.image} alt='Галочка'/>}
                </button>
        </div>
    )
}