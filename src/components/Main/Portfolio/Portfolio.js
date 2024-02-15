import './Portfolio.css';
export default function Portfolio(){
    return(
        <div className="portfolio">
            <div className='portfolio__block'>
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className="portfolio__list">
                    <li className="portfolio__element">
                        <a href='https://github.com/WebKit372/how-to-learn' rel='noreferrer' target="_blank" className='portfolio__name'>Статичный сайт</a>
                        <p className='portfolio__name portfolio__name_arrow'>↗</p>
                    </li>
                    <li className="portfolio__element">
                        <a href='https://github.com/WebKit372/russian-travel' rel='noreferrer' target="_blank" className='portfolio__name'>Адаптивный сайт</a>
                        <p className='portfolio__name portfolio__name_arrow'>↗</p>
                    </li>
                    <li className="portfolio__element">
                        <a href='https://github.com/WebKit372/react-mesto-api-full-gha' rel='noreferrer' target="_blank" className='portfolio__name'>Одностраничное приложение</a>
                        <p className='portfolio__name portfolio__name_arrow'>↗</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}