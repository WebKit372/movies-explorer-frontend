import React from 'react'
import logo from '../../images/logo.svg'
import './Login.css'
import { NavLink } from 'react-router-dom'
import * as formValidation from '../../utils/FieldsValidationForms';
import validation from '../../utils/Validation';
export default function Login({updateUser, onLogin, apiErrorIsActive, apiErrorMessage, hideErrorDisplay}) {
	const emailForm = formValidation.emailForm;
	const passwordForm = formValidation.passwordForm;
  const [password, setPassword] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordErrorIsVisible, setPasswordErrorIsVisible] = React.useState(false);
  const [dirtyPassword, setDirtyPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [emailErrorIsVisible, setEmailErrorIsVisible] = React.useState(false);
  const [dirtyEmail, setDirtyEmail] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);

  function checkValidation(Form, input){
    const result = Object.values(validation(Form, input))
    let errorMessage = ''
    result.forEach((el) => {
      if(typeof el === 'string' && el !== ''){
        errorMessage += `${el}. `
      }
    })
    console.log(errorMessage)
    return({result:result.includes(false), error:errorMessage})
  }
  //Валидация пароля
	function handlePasswordChange(e){
		setPassword(e.target.value);
	}
  React.useEffect(()=>{
    const result = checkValidation(passwordForm,password)
    if(result.result){
      setDirtyPassword(true);
      setPasswordErrorMessage(result.error)
    } else{
      setDirtyPassword(false);
      setPasswordErrorIsVisible(false);
    }
  },[password]);

    //Валидация email
	function handleEmailChange(e) {
		setEmail(e.target.value);
	}
  React.useEffect(() => {
    hideErrorDisplay()
    updateUser({name:'', email: '', password: ''})
  },[])

  React.useEffect(()=>{
    const result = checkValidation(emailForm,email);
    if (result.result) {
      setDirtyEmail(true);
      setEmailErrorMessage(result.error)
    } else {
      setDirtyEmail(false);
      setEmailErrorIsVisible(false)
    }
  },[email]);

	function login(e) {
		e.preventDefault();
		updateUser({email: email, password: password});
    onLogin(email,password);
	}
  function blurHandler(e){
    switch (e.target.name){
      case 'password':
        if (dirtyPassword) {
          setPasswordErrorIsVisible(true)
        } else {
          setPasswordErrorIsVisible(false)         
        }
        break
      case 'email':
        if (dirtyEmail) {
          setEmailErrorIsVisible(true)
        } else {
          setEmailErrorIsVisible(false)
        }
        break
      default: 
        break             
    }
  }
  React.useEffect(()=>{
    if(!dirtyEmail && !dirtyPassword){
      setFormValid(false)
    } else{
      setFormValid(true)
    }
  },[dirtyEmail,dirtyPassword])

  return(
      <main className='login'>
        <section className='login__block'>
          <form className='login__form' onSubmit={login} noValidate>
          <NavLink className='login__logo' to='/'>
            <img className='login__logo-image' src={logo} alt='Логотип'/>
          </NavLink>
          <h1 className='login__title'>Рады видеть!</h1>
            <div className='login__form-block login__form-block_email'>
              <label className='login__label'>E-mail</label>
              <input type='email' name='email' className='login__input' placeholder='email@yandex.ru' value={email} onBlur={blurHandler} onChange={handleEmailChange}/>
              <label className={`login__error ${!emailErrorIsVisible ? 'login__error_disabled': ''}`}>{emailErrorMessage}</label>
            </div>
            <div className='login__form-block login__form-block_password'>
              <label className='login__label'>Пароль</label>
              <input type="password" name='password' className='login__input' placeholder='Пароль' onBlur={blurHandler} onChange={handlePasswordChange} value={password}/>
              <label className={`login__error ${!passwordErrorIsVisible ? 'login__error_disabled': ''}`}>{passwordErrorMessage}</label>
            </div>
            <div className='login__button-block'>
              <label className={`login__error-api ${!apiErrorIsActive ? 'login__error-api_disabled': ''}`}>{apiErrorMessage}</label>
              <button disabled={formValid} type='submit' className='login__button'>Войти</button>
            </div>
            <p className='login__text'>Ещё не зарегистрированы?<NavLink className='login__link' to='/signup'>Регистрация</NavLink></p>
          </form> 
        </section>
      </main>
  )
}