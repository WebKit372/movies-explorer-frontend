import './MoviesCard.css'
import card from '../../images/pic__COLOR_pic.png';
import React from 'react';
export default function MoviesCard(props){
    const [Active, setActive] = React.useState(true);
    const buttonClass = `movies-card__button ${Active && props.type === 'find' ? 'movies-card__button_active' : ''}`
    function changeButton(){
    if(props.type === 'find'){
        if(Active){
            setActive(false);
        } else{
            setActive(true);
        }
    }
    }
    return(
        <li className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>{props.name}</h2>
                <p className='movies-card__duration'>{props.duration}</p>
            </div>
            <div className='movies-card__image-block'>
                <a className='movies-card__link' href={props.trailer} target='_blank' rel="noreferrer">
                <img src={props.card} className='movies-card__image' alt='Фотография из фильма'/>
                </a>
            </div>
            <button type='button' className={buttonClass} onClick={changeButton}>
                {!Active && props.type === 'find' ? 'Сохранить' : 
                <img src={props.image} alt='Галочка'/>}
                </button>
        </li>
    )
}