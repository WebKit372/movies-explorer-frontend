import './AboutMe.css';
import avatar from '../../../images/avatar.png';

export default function AboutMe(){
    return(
        <div className="aboutme">
            <div className='aboutme__block'>
                <p className="aboutme__name">Студент</p>
                <div className="aboutme__info-block">
                    <div className='aboutme__info'>
                        <div className='aboutme__personal'>
                            <h2 className='aboutme__title'>Тамир</h2>
                            <h3 className='aboutme__subtitle'>Аналитик/Фронтент-разработчик, 24 года</h3>
                            <p className='aboutme__subscription'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        </div>
                        <a className='aboutme__link' href='https://github.com/WebKit372' target="_blank" rel="noopener noreferrer">Github</a>
                    </div>
                    <img className='aboutme__avatar' src={avatar} alt='Мой аватар'/>
                </div> 
            </div>
        </div>
    )
}