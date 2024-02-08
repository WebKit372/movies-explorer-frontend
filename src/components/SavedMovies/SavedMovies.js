import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import deleteLogo from '../../images/icon__COLOR_icon-main.svg'
export default function SavedMovies(props){
    return (
        <main className='saved-movies'>
            <SearchForm/>
            <MoviesCardList isOverFilled={props.isOverFilled} image={deleteLogo}/>
        </main>
    )
}