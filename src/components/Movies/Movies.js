import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import ok from '../../images/icon__COLOR_invisible.svg'
import React from 'react'
export default function Movies(props){
    return (
        <main className='movies'>
            <SearchForm
              getFilms={props.getFilms}
              handleChange={props.handleChange}
              searchFormName={props.searchFormName}
              changePreloaderDisplay={props.changePreloaderDisplay}
              changeCheckbox={props.changeCheckbox}
              checkboxValue={props.checkboxValue}
            />
            <MoviesCardList
              key={props.getFilms}
              type='find'
              films={props.films}
              image={ok}
              searchFormName={props.searchFormName}
              preloaderDisplay={props.preloaderDisplay}
              checkboxValue={props.checkboxValue}
              filterFilms={props.filterFilms}
              setFilms={props.setFilms}
            />
        </main>
    )
}