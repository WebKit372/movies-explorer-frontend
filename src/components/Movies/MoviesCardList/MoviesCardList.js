import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
export default function MoviesCardList(){
    return (
        <main className='moviescardlist'>
            <MoviesCard name='Абракадабра' duration='12'/>
            <MoviesCard name='Абракадабра' duration='12'/>
            <MoviesCard name='Абракадабра' duration='12'/>
            <MoviesCard name='Абракадабра' duration='12'/>
            <MoviesCard name='Абракадабра' duration='12'/>
            
        </main>
    )
}