export const createFormControls = (options, validation) => {
  return {
    ...options,
    value: '',
    valid: !validation,
    touched: false,
    validation: validation
  }
}

export const validateControl = (value, validation) => {

  if (!validation) {
    return true
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;

}

export const validateForm = (formControls) => {

  let isFormValid = true;

  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid
    }
  }

  return isFormValid

}