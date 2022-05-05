import { DateTime } from "luxon";

export const changeObjectFullDate = ( date ) => {
  const cononFormat = {
    hour: 'numeric',
    minute: '2-digit', 
  }
  return `${DateTime.fromISO( date ).toISODate()} ${DateTime.fromISO( date ).toLocaleString(cononFormat)}`
}

export const getMultipleFormError = ( errors, container, field ) => {
  let forms = [];
  if (container) {
    const dataValid = container.filter( data => !data.item);
    if (dataValid.length > 0) {
      container.forEach( (data, index) => {
        let itemError = {};
        if (!data.item) {
          itemError.item = `El campo ${index + 1} es requerido.`;
        }
        forms = [ ...forms, itemError ];
      });
    }
  }
  if (forms.length > 0) {
    errors[field] = forms;
  }
  return errors;
}