import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import ok from '../../images/icon__COLOR_invisible.svg'
export default function Movies(props){
    return (
        <main className='movies'>
            <SearchForm getFilms={props.getFilms}/>
            <MoviesCardList key={props.getFilms} type='find' isOverFilled={props.isOverFilled} films={props.films} image={ok}/>
        </main>
    )
}