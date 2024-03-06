import React from 'react';
import './Profile.css';
import { NavLink } from 'react-router-dom';
import validation from '../../utils/Validation';
import * as formValidation from '../../utils/FieldsValidationForms';
import { AppContext } from '../AppContext';
export default function Profile({updateUser, logout}) {
  const currentUser = React.useContext(AppContext);
  const [disabled, Setdisabled] = React.useState(true)
  const [name,setName] = React.useState(currentUser.name);
  const [nameErrorIsVisible, setNameErrorIsVisible] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [dirtyName, setDirtyName] = React.useState(false);
  const [email, setEmail] = React.useState(currentUser.email);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [emailErrorIsVisible, setEmailErrorIsVisible] = React.useState(false);
  const [dirtyEmail, setDirtyEmail] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);
  const nameForm = formValidation.nameForm;
	const emailForm = formValidation.emailForm;
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

  //Валидация email
function handleEmailChange(e){
  setEmail(e.target.value);
}
React.useEffect(()=>{
const result = checkValidation(emailForm,email);
if(result.result){
  setDirtyEmail(true);
  setEmailErrorMessage(result.error)
} else{
  setDirtyEmail(false);
  setEmailErrorIsVisible(false)
}
},[email]);

function blurHandler(e){
  switch (e.target.name){
    case 'name':
      if(dirtyName){
        setNameErrorIsVisible(true)
      } else{
        setNameErrorIsVisible(false)         
      }
      break
    case 'email':
      if(dirtyEmail){
        setEmailErrorIsVisible(true)
      } else{
        setEmailErrorIsVisible(false)
      }
      break
    default: 
      break             
  }
}
React.useEffect(()=>{
  if(!dirtyName && !dirtyEmail){
    setFormValid(false)
  } else{
    setFormValid(true)
  }
},[dirtyName,dirtyEmail])

function updateUserInfo(e){
  e.preventDefault();
  updateUser({name: name,email : email});
  Setdisabled(true);
}

React.useEffect(()=>{
  setName(currentUser.name);
  setEmail(currentUser.email);
},[currentUser])

    return(
        <main className='profile'>
            <section className='profile__block'>
                <h1 className='profile__title'>Привет, Виталий!</h1>
                <form className='profile__form' onSubmit={updateUserInfo} noValidate>
                    <div className='profile__form-block profile__form-block_name'>
                        <label className='profile__label'>Имя</label>
                        <input disabled={disabled} className='profile__input' onBlur={blurHandler} name='name' onChange={handleNameChange} value={name}/>
                    </div>
                    <div className='profile__form-block profile__form-block_email'>
                        <label className='profile__label'>E-mail</label>
                        <input disabled={disabled} className='profile__input' onBlur={blurHandler} name='email' onChange={handleEmailChange} value={email}/>
                    </div>
                    {disabled ?                     
                    <div className='profile__buttons-block'>
                        <button type='button' onClick={()=>Setdisabled(false)} className='profile__button profile__button_edit'>Редактировать</button>
                        <button type='button' onClick={logout} className='profile__button profile__button_exit'>Выйти из аккаунта</button>
                    </div> :
                    <div className='profile__button-block'>
                    <div className='profile__error-block'>
                    <label className={`profile__error ${!emailErrorIsVisible? 'profile__error_disabled': ''}`}>{`${emailErrorMessage ?`Поле Email: ${emailErrorMessage}`: ''}`}</label>
                    <label className={`profile__error ${!nameErrorIsVisible ? 'profile__error_disabled': ''}`}>{`${nameErrorMessage ? `Поле Имя: ${nameErrorMessage}`:''}`}</label>
                    </div>
                    <button disabled={formValid} type='submit'  className='profile__button profile__button_save'>Сохранить</button>
                    </div>
                    }
                </form> 
            </section>
        </main>
    )
}