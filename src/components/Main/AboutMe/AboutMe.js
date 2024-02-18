import './AboutMe.css';
import avatar from '../../../images/avatar.png';

export default function AboutMe(){
    return(
        <section className="aboutme">
            <div className='aboutme__block'>
                <h2 className="aboutme__name">Студент</h2>
                <div className="aboutme__info-block">
                    <div className='aboutme__info'>
                        <div className='aboutme__personal'>
                            <h3 className='aboutme__title'>Виталий</h3>
                            <h4 className='aboutme__subtitle'>Аналитик/Фронтент-разработчик, 24 года</h4>
                            <p className='aboutme__subscription'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
                        </div>
                        <a className='aboutme__link' href='https://github.com/WebKit372' target="_blank" rel="noopener noreferrer">Github</a>
                    </div>
                    <img className='aboutme__avatar' src={avatar} alt='Мой аватар'/>
                </div> 
            </div>
        </section>
    )
}