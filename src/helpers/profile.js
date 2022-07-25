
export const getUsernameLetter = (username) => {
    let value = '';
    if (username) {
        username.toUpperCase();
        value = username.substr(0,1);
    } 
    return value;
}

export const isFormFieldValid = (name, formik) => !!(formik.touched[name] && formik.errors[name]);

export const getFormErrorMessage = (name, formik) => {
    return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
};

export const getCalendarLocalLanguage = () => ({
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy'
});