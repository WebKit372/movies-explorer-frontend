import './SearchForm.css'
export default function SearchForm(props){
    return(
        <form className="search-form">
            <div className="search-form__bar">
                <input className="search-form__movie" type="text" placeholder='Фильм' required/>
                <button type='submit' onClick={props.getFilms} className="search-form__button">Поиск</button>
            </div>
            <div className='search-form__checkbox-block'>
            <label className="search-form__checkbox-form">
                <input type="checkbox" className="search-form__checkbox"/>
                <span className="search-form__slider"/>
            </label>
            <label className="search-form__checkbox-text">Короткометражки</label>
            </div>
        </form>
    )
}