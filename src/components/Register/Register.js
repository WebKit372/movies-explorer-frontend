import React from 'react'
import logo from '../../images/logo.svg'
import './Register.css'
import { NavLink } from 'react-router-dom'
export default function Register() {
    return(
        <div className='register'>
            <div className='register__block'>
                <form className='register__form'>
                <img className='register__logo' src={logo} alt='Логотип'/>
                <h2 className='register__title'>Добро пожаловать!</h2>
                    <div className='register__form-block register__form-block_name'>
                        <label className='register__label'>Имя</label>
                        <input className='register__input' placeholder='Виталий'/>
                        <label className='register__error register__error__disabled'>Что-то пошло не так...</label>
                    </div>
                    <div className='register__form-block register__form-block_email'>
                        <label type="email" className='register__label'>E-mail</label>
                        <input className='register__input' placeholder='Виталий'/>
                        <label className='register__error register__error__disabled'>Что-то пошло не так...</label>
                    </div>
                    <div className='register__form-block register__form-block_password'>
                        <label className='register__label'>Пароль</label>
                        <input type="password" className='register__input' placeholder='Виталий'/>
                        <label className='register__error register__error__disabled'>Что-то пошло не так...</label>
                    </div>
                    <button type='button' className='register__button'>Зарегистрироваться</button>
                    <p className='register__text'>Уже зарегистрированы?<NavLink className='register__link' to='/signin'>Войти</NavLink></p>
                </form> 
            </div>
        </div>
    )
}