import { DateTime } from "luxon";

import { isDateValid } from "../topic";
import { getAbpFormFields, getAbpFormFieldsErrors } from "./abpMethodology";
import { getAcFormFields, getAcFormFieldsErrors } from "./acMethodology";
import { getDuaFormFields, getDuaFormFieldsErrors } from "./duaMethodology";  

export const getMainTopicFormFieldsErrors = ( data, errors ) => {
  if (!data.title) {
    errors.title = 'El título es requerido.';
  } else if (data.title.length < 5) {
    errors.title = 'El título tiene que tener por lo menos cinco caracteres.';
  }
  if (!data.description) {
    errors.description = 'La descripción es requerida.';
  }
  if (!data.objective) {
    errors.objective = 'El objetivo es requerido.';
  }
  if (!data.start_at) {
    errors.start_at = 'La fecha de inicio requerida.';
  } else if (
    data.start_at && 
    data.end_at && 
    !isDateValid(data.start_at, data.end_at, 1)
  ){
    errors.start_at = 'La fecha de inicio es mayor o igual que la fecha de cierre.';
  }
  if (!data.end_at) {
    errors.end_at = 'La fecha de cierre es requerida.';
  } else if (
    data.start_at && 
    data.end_at && 
    !isDateValid(data.start_at, data.end_at, 2)
  ){
    errors.end_at = 'La fecha de cierre es menor o igual que la fecha de inicio.';
  }
  return errors;
}

export const getMethodologyFormFields = ( type ) => {
  if (type === 'DUA') {
    return getDuaFormFields;
  } else if (type === 'AC') {
    return getAcFormFields;
  } else if (type === 'ABP') {
    return getAbpFormFields;
  }
};
export const getMethodologyFormFieldsErrors = ( type, data, errors ) => {
  if (type === 'DUA') {
    return getDuaFormFieldsErrors( data, errors );
  } else if (type === 'AC') {
    return getAcFormFieldsErrors( data, errors );
  } else if (type === 'ABP') {
    return getAbpFormFieldsErrors( data, errors );
  }
}

export const loadTopicSchoolData = ( schoolPeriodName, topic, title, isStudent ) => ({
  schoolPeriod: schoolPeriodName,
  classroom: topic.classroom.name,
  asignature: topic.asignature_detail.name,
  type: topic.methodology.abbrev,
  title,
  isStudent
});

export const getValidTopicAudios = (files) => {
  let isValid = true;
  let invalidAudio = '';
  // let validAudios = [];
  files.forEach( file => {
      if (
          (file.type === 'audio/mpeg') || 
          (file.type === 'audio/ogg') || 
          (file.type === 'audio/wav')
      ) {
          // validAudios.push(file);
          isValid = true;
      } else {
        invalidAudio = file.name;
          isValid = false;
      }
  });

  return { isValid, invalidAudio };
}

export const getDbFormat = ( date ) => {
  return DateTime.fromJSDate(date).toISO();
}

export const getMethodologyType = ( methodology ) => (
  methodology.abbrev === 'DUA'
    ? 1
    : methodology.abbrev === 'ABP'
      ? 2
      : methodology.abbrev === 'AC' && 3
)

export const getTopicFormData = ( data, topicData, methodologyType, userId ) => ({
  classroom: topicData.classroom.id,
  asignature: topicData.asignature_detail.id,
  owner: userId,
  title: data.title,
  description: data.description,
  objective: data.objective,
  type: methodologyType,
  start_at: getDbFormat( data.start_at ),
  end_at: getDbFormat( data.end_at ),
  active: true,
  observations: data.observations
});

