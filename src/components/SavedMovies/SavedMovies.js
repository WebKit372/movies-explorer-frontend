import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import deleteLogo from '../../images/icon__COLOR_icon-main.svg'
export default function SavedMovies(props){
    return (
        <main className='saved-movies'>
            <SearchForm
              getFilms={props.getFilms}
              handleChange={props.handleChange}
              searchFormName={props.searchFormName}
              changePreloaderDisplay={props.changePreloaderDisplay}
              changeCheckbox={props.changeCheckbox}
              checkboxValue={props.checkboxValue}
              changeVisibleFilmsLength={props.changeVisibleFilmsLength}
              visit={props.visit}
              type='save'
              resetSavedForm={props.resetSavedForm}
            />
            <MoviesCardList
              key={props.getFilms}
              type='save'
              films={props.films}
              image={deleteLogo}
              searchFormName={props.searchFormName}
              preloaderDisplay={props.preloaderDisplay}
              checkboxValue={props.checkboxValue}
              filterFilms={props.filterFilms}
              setFilms={props.setFilms}
              changeVisibleFilmsLength={props.changeVisibleFilmsLength}
              visibleFilmsLength={props.visibleFilmsLength}
              isFilmsVisited={props.isFilmsVisited}
              isVisited={props.isVisited}
              savedMovies={props.savedMovies}
              deleteMovie={props.deleteMovie}
              addMovie={props.addMovie}
              arrayAddSavedMovies={props.arrayAddSavedMovies}
              arrayDeleteMovie={props.arrayDeleteMovie}
            />
        </main>
    )
}