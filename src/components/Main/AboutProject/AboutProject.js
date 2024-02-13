import './AboutProject.css'
export default function AboutProject(){
    return(
        <div className="about-project" id="project">
            <div className='about-project__block'>
                <h2 className="about-project__title">О проекте</h2>
                <div className="about-project__info-block">
                    <div className="about-project__info-subblock">
                        <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="about-project__info-subblock">
                        <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="about-project__timebar">
                    <div className="about-project__timbar-block">
                        <div className="about-project__bar about-project__bar_backend">
                            <h3 className="about-project__timebar-title about-project__timebar-title_backend">1 неделя</h3>
                        </div>
                        <p className="about-project__timebar-subtitle">Back-end</p>
                    </div>
                    <div className="about-project__timbar-block">
                        <div className="about-project__bar about-project__bar_frontend">
                            <h3 className="about-project__timebar-title about-project__timebar-title_frontend">4 недели</h3>
                        </div>
                        <p className="about-project__timebar-subtitle">Front-end</p>
                    </div>
                </div>
            </div>
        </div>
    )
}