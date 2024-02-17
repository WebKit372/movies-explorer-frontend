import React from 'react'
import logo from '../../images/logo.svg'
import './Register.css'
import { NavLink } from 'react-router-dom'
export default function Register() {
    return(
        <main className='register'>
            <section className='register__block'>
                <form className='register__form'>
                <NavLink className='register__logo' to='/'>
                    <img className='register__logo-image' src={logo} alt='Логотип'/>
                </NavLink>
                <h1 className='register__title'>Добро пожаловать!</h1>
                    <div className='register__form-block register__form-block_name'>
                        <label className='register__label'>Имя</label>
                        <input className='register__input' placeholder='Виталий' minLength={2} maxLength={30} required/>
                        <label className='register__error register__error_disabled'>Что-то пошло не так...</label>
                    </div>
                    <div className='register__form-block register__form-block_email'>
                        <label  className='register__label'>E-mail</label>
                        <input type="email" className='register__input' placeholder='Виталий' required/>
                        <label className='register__error register__error_disabled'>Что-то пошло не так...</label>
                    </div>
                    <div className='register__form-block register__form-block_password'>
                        <label className='register__label'>Пароль</label>
                        <input type="password" className='register__input' minLength={2} maxLength={30} placeholder='Введите пароль' required/>
                        <label className='register__error register__error_disabled'>Что-то пошло не так...</label>
                    </div>
                    <button type='submit' className='register__button'>Зарегистрироваться</button>
                    <p className='register__text'>Уже зарегистрированы?<NavLink className='register__link' to='/signin'>Войти</NavLink></p>
                </form> 
            </section>
        </main>
    )
}