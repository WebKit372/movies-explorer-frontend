import './NotFound.css'
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
export default function NotFound(){
    const navigate = useNavigate()
    return(
        <main className="notfound">
            <section className='notfound__block'>
                <div className='notfound__info-block'>
                    <h2 className="notfound__title">404</h2>
                    <p className="notfound__text">Страница не найдена</p>
                    <button type='button' onClick={() => navigate(-1)} className="notfound__link">Назад</button>
                </div>
            </section>
        </main>
    )
}