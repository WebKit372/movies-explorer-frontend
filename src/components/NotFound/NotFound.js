import './NotFound.css'
import { NavLink } from "react-router-dom";
export default function NotFound(){
    return(
        <div className="notfound">
            <div className='notfound__block'>
                <div className='notfound__info-block'>
                    <h2 className="notfound__title">404</h2>
                    <p className="notfound__text">Страница не найдена</p>
                    <NavLink to='/' className="notfound__link">Назад</NavLink>
                </div>
            </div>
        </div>
    )
}