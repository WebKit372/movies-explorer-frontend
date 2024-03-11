import './MoviesCard.css'
import React from 'react';
import { AppContext } from '../AppContext';
export default function MoviesCard(props){
    const currentUser = React.useContext(AppContext);
    const [Active, setActive] = React.useState(false);
    const [saveId, setSaveId] = React.useState("")
    const [filmInfo,setFilmInfo] = React.useState(props.film);
    const buttonClass = `movies-card__button ${Active && props.type === 'find' ? 'movies-card__button_active' : ''}`
    function changeButton(){
        if(props.type === 'save'){
            props.deleteMovie(filmInfo._id)
            .then((res) => {
                setActive(false);
                props.arrayDeleteMovie(filmInfo)
            })
            .catch((err) => console.log(err))            
        } else{
            if(Active){
                props.deleteMovie(saveId)
                .then((res) => {
                    setActive(false);
                    props.arrayDeleteMovie(filmInfo)
                })
                .catch((err) => console.log(err))
            } else{
                props.addMovie({
                    "country": filmInfo.country,
                    "director": filmInfo.director,
                    "year": filmInfo.year,
                    "duration": filmInfo.duration,
                    "movieId": filmInfo.id,
                    "owner": currentUser.id,
                    "description": filmInfo.description,
                    "trailerLink": filmInfo.trailerLink,
                    "image": `https://api.nomoreparties.co/.${filmInfo.image.url}`,
                    "thumbnail": `https://api.nomoreparties.co/.${filmInfo.image.formats.thumbnail.url}`,
                    "nameRU": filmInfo.nameRU,
                    "nameEN": filmInfo.nameEN
                })
                .then((res)=> {
                    props.arrayAddSavedMovies(res);
                    setActive(true);
                })
                .catch((err) => console.log(err))
            }
        }
        }
    React.useEffect(() => {
        const moviesArray = props.savedMovies;
        if(moviesArray.length !==0){
            moviesArray.forEach(e => {
                if(e.movieId === filmInfo.id){
                    setActive(true)
                    setSaveId(e._id)
                }
            });
        }
    },[props.savedMovies])
    return(
        <li className='movies-card'>
            <div className='movies-card__info'>
                <h2 className='movies-card__name'>{filmInfo.nameRU}</h2>
                <p className='movies-card__duration'>{props.duration}</p>
            </div>
            <div className='movies-card__image-block'>
                <a className='movies-card__link' href={filmInfo.trailerLink} target='_blank' rel="noreferrer">
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