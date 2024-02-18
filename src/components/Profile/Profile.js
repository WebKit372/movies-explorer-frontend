import React from 'react'
import './Profile.css'
import { NavLink } from 'react-router-dom'
export default function Profile() {
    const [disabled, Setdisabled] = React.useState(true)
    return(
        <main className='profile'>
            <section className='profile__block'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form className='profile__form'>
                    <div className='profile__form-block profile__form-block_name'>
                        <label className='profile__label'>Имя</label>
                        <input disabled={disabled} className='profile__input' minLength={2} maxLength={30}  placeholder='Виталий'/>
                    </div>
                    <div className='profile__form-block profile__form-block_email'>
                        <label className='profile__label'>E-mail</label>
                        <input disabled={disabled} className='profile__input' placeholder='Виталий'/>
                    </div>
                    {disabled ?                     
                    <div className='profile__buttons-block'>
                        <button type='button' onClick={()=>Setdisabled(false)} className='profile__button profile__button_edit'>Редактировать</button>
                        <NavLink to='/signin' className='profile__button profile__button_exit'>Выйти из аккаунта</NavLink>
                    </div> :
                    <button type='submit' onClick={()=>Setdisabled(true)} className='profile__button profile__button_save'>Сохранить</button>
                    }
                </form> 
            </section>
        </main>
    )
}