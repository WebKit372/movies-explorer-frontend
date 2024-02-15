import React from 'react'
import logo from '../../images/logo.svg'
import './Login.css'
import { NavLink } from 'react-router-dom'
export default function Login() {
    return(
        <div className='login'>
            <div className='login__block'>
                <form className='login__form'>
                <NavLink className='login__logo' to='/'>
                    <img className='login__logo' src={logo} alt='Логотип'/>
                </NavLink>
                <h2 className='login__title'>Рады видеть!</h2>
                    <div className='login__form-block login__form-block_email'>
                        <label type="email" className='login__label'>E-mail</label>
                        <input className='login__input' placeholder='Виталий'/>
                        <label className='login__error login__error__disabled'>Что-то пошло не так...</label>
                    </div>
                    <div className='login__form-block login__form-block_password'>
                        <label className='login__label'>Пароль</label>
                        <input type="password" className='login__input' placeholder=''/>
                        <label className='login__error login__error__disabled'>Что-то пошло не так...</label>
                    </div>
                    <button type='button' className='login__button'>Войти</button>
                    <p className='login__text'>Ещё не зарегистрированы?<NavLink className='login__link' to='/signup'>Регистрация</NavLink></p>
                </form> 
            </div>
        </div>
    )
}