import React from 'react';
import './Header.css'
import icon from '../../images/header-logo.svg';
import logo from '../../images/logo.svg';

export default function Header (props) {
 return (
    <div className="header">
        <img src={logo} className='header__logo' alt='Логотип'/>
            {props.authorized?
                <div className="header__info-block">
                    <div className="header_films-block">
                        <a className="header__links">Фильмы</a>
                        <a className="header__links">Сохранённые Фильмы</a>
                    </div>
                    <div className='header__account-block'>
                        <a className="header__links">Аккаунт</a>
                        <div className="header__icon-block">
                            <img 
                            src={icon}
                            alt="Профиль"
                            className='header__icon'/>
                        </div>
                    </div>
                </div>
                :
                <div className="header__info-block">
                    <a className="header__links header__links_auth">Регистрация</a>
                    <div className='header__login-block'>
                        <a className="header__links header__links_auth">Войти</a>
                    </div>
                </div>    
            }      
    </div>
 )
}