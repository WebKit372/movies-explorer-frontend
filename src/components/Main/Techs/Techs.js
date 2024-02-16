import './Techs.css'
export default function Techs(){
    return(
        <section className="techs">
            <div className='techs__block'>
                <h2 className="techs__name">Технологии</h2>
                <div className="techs__info-block">
                    <h3 className='techs__title'>7 технологий</h3>
                    <p className='techs__subscription'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                </div>  
                <ul className='techs__list'>
                    <li className='techs__list-element'>HTML</li>
                    <li className='techs__list-element'>CSS</li>
                    <li className='techs__list-element'>JS</li>
                    <li className='techs__list-element'>React</li>
                    <li className='techs__list-element'>Git</li>
                    <li className='techs__list-element'>Express.js</li>
                    <li className='techs__list-element'>mongoDB</li>
                </ul>
            </div>
        </section>
    )
}