export default function validation(options, input){
  const output ={
    minLength:'',
    maxLength:'',
    reg:'',
    required: '',
    minLengthError:'',
    maxLenghtError:'',
    regError:'',
    requiredError:''
  }
  if(options.required && input !== ''){
    output.required = true;
  } else if(!options.required){
    output.required = true;
  } else {
    output.required = false;
    output.requiredError = 'Поле является обязательным'
  };
  if(!options.minLength){
    output.minLength = true
  } else if(options.minLength > input.length && input.length !==0 ){
    output.minLength = false;
    output.minLengthError = `Минимальный размер поля равен ${options.minLength} символам`
  } else{
    output.minLength = true
  };
  if(!options.maxLength){
    output.maxLength = true
  } else if(options.maxLength < input.length){
    output.maxLength= false;
    output.maxLengthError = `Максимальный размер поля равен ${options.maxLength} символам`
  } else{
    output.maxLength = true
  };
  if(!options.reg){
    output.reg = true;
  } else if(options.reg.test(input.toLowerCase()) && options.reg!==''){
    output.reg = true;
  } else{
    output.reg = false;
    output.regError = `Указан неверный формат поля`  
  };
  console.log(output);
  return output;
}