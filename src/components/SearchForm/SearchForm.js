import React from 'react'
import './SearchForm.css'
export default function SearchForm(props){
    function onSubmit(e){
        e.preventDefault()
        props.changePreloaderDisplay()
        props.getFilms(props.searchFormName)
        props.changeVisibleFilmsLength(0)
        props.visit();
    }
    function onChangeCheckBox(){
        props.changeCheckbox();
        props.changePreloaderDisplay();
        props.getFilms(props.searchFormName)
        props.changeVisibleFilmsLength(0)
        props.visit();
    }
    return(
        <form className="search-form" onSubmit={onSubmit}>
            <div className="search-form__bar">
                <input className="search-form__movie" type="text" value={props.searchFormName} onChange={props.handleChange} placeholder='Фильм' required={props.type==='find'}/>
                <button type='submit' className="search-form__button">Поиск</button>
            </div>
            <div className='search-form__checkbox-block'>
            <label className="search-form__checkbox-form">
                <input type="checkbox" onChange={onChangeCheckBox} checked={props.checkboxValue}className="search-form__checkbox"/>
                <span className="search-form__slider"/>
            </label>
            <label className="search-form__checkbox-text">Короткометражки</label>
            </div>
        </form>
    )
}