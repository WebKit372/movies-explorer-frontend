import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import ok from '../../images/icon__COLOR_invisible.svg'
export default function Movies(props){
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCardList isOverFilled={props.isOverFilled} image={ok}/>
        </main>
    )
}