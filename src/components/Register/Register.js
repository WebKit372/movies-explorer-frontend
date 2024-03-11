import React from 'react';
import logo from '../../images/logo.svg';
import './Register.css';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../AppContext';
import validation from '../../utils/Validation';
import * as formValidation from '../../utils/FieldsValidationForms';
export default function Register({onRegistrate, apiErrorMessage, apiErrorIsActive, hideErrorDisplay}) {
	const currentUser = React.useContext(AppContext);
	const [name,setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
  const [nameErrorIsVisible, setNameErrorIsVisible] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [dirtyName, setDirtyName] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [emailErrorIsVisible, setEmailErrorIsVisible] = React.useState(false);
  const [dirtyEmail, setDirtyEmail] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [passwordErrorIsVisible, setPasswordErrorIsVisible] = React.useState(false);
  const [dirtyPassword, setDirtyPassword] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);

	const nameForm = formValidation.nameForm;
	const emailForm = formValidation.emailForm;
	const passwordForm = formValidation.passwordForm;

  function checkValidation(Form, input){
    const result = Object.values(validation(Form, input))
    let errorMessage = ''
    result.forEach((el) => {
      if(typeof el === 'string' && el !== ''){
        errorMessage += `${el}. `
      }
    })
    return({result:result.includes(false), error:errorMessage})
  }

  //Валидация имени
	function handleNameChange(e){
		setName(e.target.value);
	}
  React.useEffect(()=>{
    const result =checkValidation(nameForm,name);
    if(result.result){
      setDirtyName(true);
      setNameErrorMessage(result.error)
    } else{
      setDirtyName(false);
      setNameErrorIsVisible(false);
    }  
  },[name]);

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
	function handleEmailChange(e){
		setEmail(e.target.value);
	}
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

	function createUser(e){
		e.preventDefault();
    onRegistrate(name, email, password)
	}

	function blurHandler(e){
		switch (e.target.name){
			case 'name':
				if (dirtyName) {
          setNameErrorIsVisible(true)
        } else {
          setNameErrorIsVisible(false)         
        }
			  break
			case 'email':
				if (dirtyEmail) {
          setEmailErrorIsVisible(true)
        } else {
          setEmailErrorIsVisible(false)
        }
        break
      case 'password':
        if (dirtyPassword) {
          setPasswordErrorIsVisible(true)
        } else {
          setPasswordErrorIsVisible(false)
        }
        break 
      default: 
        break             
		}
	}

  React.useEffect(()=>{
    if(!dirtyName && !dirtyEmail && !dirtyPassword){
      setFormValid(false)
    } else{
      setFormValid(true)
    }
  },[dirtyName,dirtyEmail,dirtyPassword])

  React.useEffect(() => {
    hideErrorDisplay()
  },[])
  
	return(
		 <main className='register'>
			<section className='register__block'>
				<form className='register__form' onSubmit={createUser} noValidate>
				<NavLink className='register__logo' to='/'>
					<img className='register__logo-image' src={logo} alt='Логотип'/>
				</NavLink>
				<h1 className='register__title'>Добро пожаловать!</h1>
					<div className='register__form-block register__form-block_name'>
						<label className='register__label'>Имя</label>
						<input value={name} onBlur={blurHandler} onChange={handleNameChange} name='name' className='register__input' placeholder='Виталий'/>
						<label className={`register__error ${!nameErrorIsVisible ? 'register__error_disabled': ''}`}>{nameErrorMessage}</label>
					</div>
					<div className='register__form-block register__form-block_email'>
						<label  className='register__label'>E-mail</label>
						<input value={email} onBlur={blurHandler} onChange={handleEmailChange} name='email' type="email" className='register__input' placeholder='email@yandex.ru'/>
						<label className={`register__error ${!emailErrorIsVisible ? 'register__error_disabled': ''}`}>{emailErrorMessage}</label>
					</div>
					<div className='register__form-block register__form-block_password'>
						<label className='register__label'>Пароль</label>
						<input value={password} onBlur={blurHandler} onChange={handlePasswordChange} type="password" name='password' className='register__input' placeholder='Введите пароль'/>
						<label className={`register__error ${!passwordErrorIsVisible ? 'register__error_disabled': ''}`}>{passwordErrorMessage}</label>
					</div>
          <div className='register__button-block'>
          <label className={`register__error-api ${!apiErrorIsActive ? 'register__error-api_disabled': ''}`}>{apiErrorMessage}</label>
					<button disabled={formValid} type='submit' className='register__button'>Зарегистрироваться</button>
          </div>
					<p className='register__text'>Уже зарегистрированы?<NavLink className='register__link' to='/signin'>Войти</NavLink></p>
				</form> 
			</section>
		</main>
	)
}