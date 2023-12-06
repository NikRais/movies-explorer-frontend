import { useState, useCallback } from "react";

const useForm = () => {
  const [errors, setErrors] = useState({});
  const [enteredValues, setEnteredValues] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setEnteredValues({
      ...enteredValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage,
    });
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
    errors,
    enteredValues,
    isFormValid,
    handleChange,
    resetForm,
  };
};

export default useForm;
