import './Movies.css'
import MoviesCard from './MoviesCard/MoviesCard'
import SearchForm from './SearchForm/SearchForm'
export default function Movies(){
    return (
        <main className='movies'>
            <SearchForm/>
            <MoviesCard/>
        </main>
    )
}