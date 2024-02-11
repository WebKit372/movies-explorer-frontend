import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
export default function MoviesCardList(props){
    return (
        <main className='moviescardlist'>
            <div className='moviescardlist__cards'>
                <MoviesCard type={'save'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
                <MoviesCard type={'find'} image={props.image} name='Абракадабра' duration='12'/>
            </div>
            {props.isOverFilled?
                <button className='moviescardlist__button'>Ещё</button> :
                <></>
            }
        </main>
    )
}