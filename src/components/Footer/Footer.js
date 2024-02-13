import './Footer.css';
export default function Footer(){
    return(
        <footer className="footer">
            <div className='footer__block'>
                <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className='footer__info'>
                    <p className='footer__text'>© 2024</p>
                    <div className='footer__links'>
                        <a href="https://practicum.yandex.ru/" rel="noreferrer" target='_blank' className='footer__text footer__link'>Яндекс.Практикум</a>
                        <a href="https://github.com/WebKit372" rel="noreferrer" target='_blank' className='footer__text footer__link'>Github</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}