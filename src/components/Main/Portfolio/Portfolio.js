import './Portfolio.css';
export default function Portfolio(){
    return(
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <div className="portfolio__element">
                    <h2 className='portfolio__name'>Статичный сайт</h2>
                    <p className='portfolio__name'>↗</p>
                </div>
                <div className="portfolio__element">
                    <h2 className='portfolio__name'>Адаптивный сайт</h2>
                    <p className='portfolio__name'>↗</p>
                </div>
                <div className="portfolio__element">
                    <h2 className='portfolio__name'>Одностраничное приложение</h2>
                    <p className='portfolio__name'>↗</p>
                </div>
            </ul>
        </div>
    )
}