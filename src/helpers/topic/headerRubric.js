import { arePorcentsValid } from "../topic";

export const getRubricInitialState = ({  
  methodology: {
    methodology_title_detail: 'Resolución del Problema',
    methodology_description_detail: '',
    methodology_porcent_detail: 50,
    methodology_value_detail: 0,
  },
  individual: {
    individual_title_detail: 'Desempeño Individual',
    individual_description_detail: '',
    individual_porcent_detail: 12.5,
    individual_value_detail: 0,
  },
  team: {
    team_title_detail: 'Desempeño Colectivo',
    team_description_detail: '',
    team_porcent_detail: 12.5,
    team_value_detail: 0,
  },
  autoevaluation: {
    autoevaluation_title_detail: 'Autoevaluación',
    autoevaluation_description_detail: '',
    autoevaluation_porcent_detail: 12.5,
    autoevaluation_value_detail: 0,
  },
  coevaluation: {
    coevaluation_title_detail: 'Coevaluación',
    coevaluation_description_detail: '',
    coevaluation_porcent_detail: 12.5,
    coevaluation_value_detail: 0,
  }
});

export const getRubricErrorsForm = ( errors, data ) => {
  const porcent_error_message = 'El presente porcentaje es obligatorio.';
  const detail_value_error_message = 'El valor de la nota es obligatorio.'
  const detail_title_error_message = 'El título de la presente rúbrica es ' + 
  'obligatorio.';

  if (data.finalValue === 0) {
    errors.finalValue = 'El valor final del ABP es requerido.'
  }
  if (!data.methodology.methodology_title_detail) {
    errors.methodology_title_detail = detail_title_error_message;
  }
  if (data.methodology.methodology_porcent_detail === 0) {
    errors.methodology_porcent_detail = porcent_error_message;
  }
  if (!data.methodology.methodology_value_detail) {
    errors.methodology_value_detail = detail_value_error_message;
  }
  if (!data.individual.individual_title_detail) {
    errors.individual_title_detail = detail_title_error_message;
  }
  if (data.individual.individual_porcent_detail === 0) {
    errors.individual_porcent_detail = porcent_error_message;
  }
  if (data.individual.individual_value_detail === 0 ) {
    errors.individual_value_detail = detail_value_error_message;
  }
  if (!data.team.team_title_detail) {
    errors.team_title_detail = detail_title_error_message;
  }
  if (data.team.team_porcent_detail === 0) {
    errors.team_porcent_detail = porcent_error_message;
  }
  if (data.team.team_value_detail === 0) {
    errors.team_value_detail = detail_value_error_message;
  }
  if (!data.autoevaluation.autoevaluation_title_detail) {
    errors.autoevaluation_title_detail = detail_title_error_message;
  }
  if (data.autoevaluation.autoevaluation_porcent_detail === 0) {
    errors.autoevaluation_porcent_detail = porcent_error_message;    
  }
  if (data.autoevaluation.autoevaluation_value_detail === 0) {
    errors.autoevaluation_value_detail = detail_value_error_message;
  }
  if (!data.coevaluation.coevaluation_title_detail) {
    errors.coevaluation_title_detail = detail_title_error_message;
  }
  if (data.coevaluation.coevaluation_porcent_detail === 0) {
    errors.coevaluation_porcent_detail = porcent_error_message;
  }
  if (data.coevaluation.coevaluation_value_detail === 0) {
    errors.coevaluation_value_detail = detail_value_error_message;
  }
  if (!arePorcentsValid(data)) {
    errors.porcents = 'La suma de los porcentajes ingresados debe sumar el 100%.'
  }
  return errors;
}

export const getRubricMsg = ( errors ) => {
  let errorMsg = '';
  const firstMsg = errors[`${Object.keys(errors)[0]}`];
  if (typeof firstMsg === 'object') {
    errorMsg = firstMsg[`${Object.keys(firstMsg)[0]}`]
  } else {
    errorMsg = firstMsg;
  }
  return errorMsg;
}

export const getRubricValueByPorcent = ( finalValue, porcent ) => {
  if ( finalValue > 0 || porcent > 0 ) {
    return parseFloat(((finalValue * porcent)/100).toFixed(2));
  } else {
    return 0;
  }
}

export const getHelpRubricInfoMessage = (type) => {
  if (type) {
    if (type === 'methodology') {
      return 'Es importante considerar los puntos más relevantes que engloben la ' + 
      'resolución del problema planteado, de tal manera esto conlleve en una mejor ' + 
      'orientación al estudiante y a una evaluación objetiva.'
    } else if (type === 'individual') {
      return 'Es el trabajo que un estudiante genera como producto de sus ' + 
      'actividades para la solución del problema y como parte de un equipo.'
    } else if (type === 'team') {
      return 'Es semejante al trabajo o aporte individual, pero ahora como resultado ' + 
      'del trabajo conjunto del equipo.'
    } else if (type === 'autoevaluation') {
      return 'Es la evaluación que hace el estudiante sobre sí mismo con base en una ' +
      'reflexión de lo que ha aprendido y su contraste con los objetivos del problema o ' + 
      'curso.'
    } else if (type === 'coevaluation') {
      return 'Es la evaluación que hace un estudiante a sus compañeros, en base a una ' + 
      'tabla de características y nivel de desempeño.'
    }
  } else {
    return '';
  }
} 

export const getRubricDetailsAbp = ( data ) => {
  let rubricDetailsAbp = [];
  const rubricDetailAbp = {
    observations_detail: '',
    active: true,
  }
  Object.entries(data).forEach( ([field, value]) => {
    if (field === 'methodology') {
      rubricDetailsAbp = setRubricDetailAbp( rubricDetailsAbp, rubricDetailAbp, value );
    }
    if (field === 'individual') {
      rubricDetailsAbp = setRubricDetailAbp( rubricDetailsAbp, rubricDetailAbp, value );
    }
    if (field === 'team') {
      rubricDetailsAbp = setRubricDetailAbp( rubricDetailsAbp, rubricDetailAbp, value );
    }
    if (field === 'autoevaluation') {
      rubricDetailsAbp = setRubricDetailAbp( rubricDetailsAbp, rubricDetailAbp, value );
    }
    if (field === 'coevaluation') {
      rubricDetailsAbp = setRubricDetailAbp( rubricDetailsAbp, rubricDetailAbp, value );
    }
  });
  return rubricDetailsAbp;
}

const setRubricDetailAbp = ( rubricDetailsAbp, rubricDetailAbp, value ) => {
  let dataObject = {};
  Object.values(value).forEach( (data, index) => {
    if (index === 0) {
      dataObject.title_detail = data;
    } else if (index === 1) {
      dataObject.description_detail = data;
    } else if (index === 2) {
      dataObject.grade_percentage = data;
    } else if (index === 3) {
      dataObject.rating_value = data;
    }
  });
  return [ ...rubricDetailsAbp, { ...dataObject, ...rubricDetailAbp } ];
}

export const getRubricDetailsAbc = ( data ) => {
  let rubricDetailsAc = [];
  const rubricDetailAc = {
    observations: '',
    active: true,
  }
  Object.entries(data).forEach( ([field, value]) => {
    if (field === 'methodology') {
      rubricDetailsAc = setRubricDetailAc( rubricDetailsAc, rubricDetailAc, value );
    }
    if (field === 'individual') {
      rubricDetailsAc = setRubricDetailAc( rubricDetailsAc, rubricDetailAc, value );
    }
    if (field === 'team') {
      rubricDetailsAc = setRubricDetailAc( rubricDetailsAc, rubricDetailAc, value );
    }
    if (field === 'autoevaluation') {
      rubricDetailsAc = setRubricDetailAc( rubricDetailsAc, rubricDetailAc, value );
    }
    if (field === 'coevaluation') {
      rubricDetailsAc = setRubricDetailAc( rubricDetailsAc, rubricDetailAc, value );
    }
  });
  return rubricDetailsAc;
}

const setRubricDetailAc = ( rubricDetailsAc, rubricDetailAc, value ) => {
  let dataObject = {};
  Object.values(value).forEach( (data, index) => {
    if (index === 0) {
      dataObject.detail_title = data;
    } else if (index === 1) {
      dataObject.detail_description = data;
    } else if (index === 2) {
      dataObject.percentage_grade = data;
    } else if (index === 3) {
      dataObject.rating_value = data;
    }
  });
  return [ ...rubricDetailsAc, { ...dataObject, ...rubricDetailAc } ];
}