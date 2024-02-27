const emailForm = {required:true, reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/};
const nameForm = {minLength: 2, maxLength: 30, required: true};
const passwordForm = {required: true, minLength: 2, maxLength: 30};
export {emailForm,nameForm,passwordForm}