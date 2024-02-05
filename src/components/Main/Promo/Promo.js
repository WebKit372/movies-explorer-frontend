import './Promo.css'
import promo from '../../../images/promo.svg';
export default function Promo(){
    return(
        <div className="promo">
            <div className='promo__info'>
                <div className="promo__block-info">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <a className="promo__link">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</a>
                </div>
                <img src={promo} className="promo__image"/>
            </div>
            <div className='promo__button-block'>
                <a className='promo__button'>Узнать больше</a>
            </div> 
        </div>
    )
}