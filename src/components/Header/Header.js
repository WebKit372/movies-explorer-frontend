import React from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
import icon from '../../images/header-logo.svg';
import logo from '../../images/logo.svg';
export default function Header (props) {
    const [visible, setVisible] = React.useState(false);
    function changeVisible(){
        console.log(props.location.pathname)
        if(visible){
            return setVisible(false);
        }
        setVisible(true);
    }
 return (
    <div className='header' style={{backgroundColor: `${props.location.pathname === '/profile' || props.location.pathname === '/movies' || props.location.pathname === '/saved-movies' ? 'rgba(32, 32, 32, 1)': ''}`}}>
        <div className="header__block">
            <NavLink to="/">
                <img src={logo} className='header__logo' alt='Логотип'/>
            </NavLink>
                {props.authorized?
                <>
                    <div className="header__info-block">
                        <div className="header__films-block">
                            <NavLink to="/movies" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Фильмы</NavLink>
                            <NavLink to="/saved-movies" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Сохранённые Фильмы</NavLink>
                        </div>
                        <div className='header__account-block'>
                        <NavLink to="/profile" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Аккаунт</NavLink>
                            <div style={{backgroundColor: `${props.location.pathname === '/profile' ? 'rgba(49, 49, 49, 1)': ''}`}} className="header__icon-block">
                                <img 
                                src={icon}
                                alt="Профиль"
                                className='header__icon'/>
                            </div>
                        </div>
                    </div>
                    <button  type='button' className='header__button-open' onClick={changeVisible}/>
                <div className={`header__menu ${visible? 'header__menu_active' : ''}`}>
                    <div className={`header__menu-block ${visible? 'header__menu-block_active' : ''}`}>
                        <button type='button' className='header__button-close' onClick={changeVisible}/>
                        <div className='header__menu-links'>
                            <NavLink to="/" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Главная</NavLink>
                            <NavLink to="/movies" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Фильмы</NavLink>
                            <NavLink to="/saved-movies" className={({isActive}) => `header__links ${isActive? "header__links_active" : ""}`}>Сохранённые фильмы</NavLink>                          
                        </div>
                        <div className='header__account-block'>
                            <NavLink to="/profile" className={({isActive}) => `header__links header__links_acc ${isActive? "header__links_active" : ""}`}>Аккаунт</NavLink>
                                <div style={{backgroundColor: `${props.location.pathname === '/profile' ? 'rgba(49, 49, 49, 1)': ''}`}} className="header__icon-block">
                                    <img 
                                    src={icon}
                                    alt="Профиль"
                                    className='header__icon'/>
                                </div>
                        </div>
                    </div>
                </div> 
                </>
                    :
                    <div style={{display:'flex'}}className="header__info-block">
                        <NavLink to="/signup" className="header__links header__links_auth">Регистрация</NavLink>
                        <div className='header__login-block'>
                            <NavLink to="/signin" className="header__links header__links_auth header__links_signin">Войти</NavLink>
                        </div>
                    </div>    
                }    
        </div>
    </div>
 )
}