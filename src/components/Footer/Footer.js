import './Footer.css';
export default function Footer(){
    return(
        <footer className="footer">
            <div className='footer__block'>
                <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className='footer__info'>
                    <p className='footer__text'>© 2024</p>
                    <div className='footer__links'>
                        <a className='footer__text'>Яндекс.Практикум</a>
                        <a className='footer__text'>Github</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}