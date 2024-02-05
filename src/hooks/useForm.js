import { useState, useCallback } from "react";

const regularEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regularPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const useForm = () => {
  const [enteredValues, setEnteredValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (evt) => {
    /*const name = evt.target.name;
    const value = evt.target.value;*/

    const {name, value} = evt.target;

    if (name === 'name') {
      if (evt.target.value === '') {
           // создаём кастомное сообщение об ошибке для элементов формы - setCustomValidity
           evt.target.setCustomValidity('Поле не должно быть пустым');
       } else if (evt.target.value.length < 2) {
           evt.target.setCustomValidity('Имя должно содержать минимум 2 символа');
       } else if (evt.target.value.length > 30) {
           evt.target.setCustomValidity('Имя должно содержать максимум 30 символов');
       } else {
           evt.target.setCustomValidity('');
       }
   } else if (name === 'email') {
       if (value === '') {
        evt.target.setCustomValidity('Поле не должно быть пустым');
       } else if (!value.match(regularEmail)) {
        evt.target.setCustomValidity('Некорректный формат почты');
       } else {
        evt.target.setCustomValidity('');
       }
   } else if (name === 'password') {
       if (value === '') {
        evt.target.setCustomValidity('Поле не должно быть пустым');
       } else if (!value.match(regularPassword)) {
        evt.target.setCustomValidity('Пароль должен содержать не менее 8 символов, включая цифры');
       } else {
        evt.target.setCustomValidity('');
       }
   } else {
    evt.target.setCustomValidity('');
   }
   setEnteredValues({...enteredValues, [name]: value});
   setErrors({...errors, [name]: evt.target.validationMessage});
   const form = evt.target.closest('form');
   setIsFormValid(form ? form.checkValidity() : false);

    /*setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage,
    });

    setIsFormValid(evt.target.closest(".form").checkValidity());*/
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChange,
    isFormValid,
    resetForm,
  };
};

export default useForm;
