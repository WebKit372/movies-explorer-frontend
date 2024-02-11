import React from 'react'
import './Profile.css'
export default function Profile() {
    const [disabled, Setdisabled] = React.useState(true)
    return(
        <div className='profile'>
            <div className='profile__block'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <form className='profile__form'>
                    <div className='profile__form-block profile__form-block_name'>
                        <label className='profile__label'>Имя</label>
                        <input disabled={disabled} className='profile__input' placeholder='Виталий'/>
                    </div>
                    <div className='profile__form-block profile__form-block_email'>
                        <label className='profile__label'>E-mail</label>
                        <input disabled={disabled} className='profile__input' placeholder='Виталий'/>
                    </div>
                    {disabled ?                     
                    <div className='profile__buttons-block'>
                        <button type='button' onClick={()=>Setdisabled(false)} className='profile__button profile__button_edit'>Редактировать</button>
                        <button className='profile__button profile__button_exit'>Выйти из аккаунта</button>
                    </div> :
                    <button type='button' onClick={()=>Setdisabled(true)} className='profile__button profile__button_save'>Сохранить</button>
                    }
                </form> 
            </div>
        </div>
    )
}