import { getLetterOfAlphabet } from "../topic";

export const getDuaActivityFormErrors = ( data, errors ) => {
  let questions = [];
  if (!data.description) {
    errors.description = 'La descripción de la actividad es obligatoria.';
  }
  if (!data.objective) {
    errors.objective = 'El objetivo de la actividad es obligatorio.';
  }
  data.questions.forEach( (question, index) => {
    let questionError = {}
    let answers = [];
    if (!question.title) {
      questionError.title = `La pregunta ${index + 1} es obligatoria.`;
    }
    if (!question.questionValue || question.questionValue === 0) {
      questionError.questionValue = `El valor de la pregunta ${index + 1} es obligatorio.`;
    }
    question.answers.forEach( (answer, i) => {
      let answerError = {};
      if (!answer.detail) {
        answerError.detail = 
        `La respuesta en el literal ${getLetterOfAlphabet(i).toUpperCase()} es obligatoria.`;
      }
      // if (!answer.value || question.value === 0) {
      //   answerError.value = 
      //   `El valor del literal ${getLetterOfAlphabet(i).toUpperCase()} es obligatorio.`;
      // }
      answers = [ ...answers, answerError ];
    });

    if (answers.length > 0) {
      let isValid = false;
      answers.forEach( answer => {
        if (Object.keys(answer).length > 0) {
          isValid = true;
        }
      });
      if (isValid) {
        questionError.answers = answers;
      }
    }
    questions = [ ...questions, questionError ]
  });
  if (questions.length > 0) {
    let isValid = false;
    questions.forEach( question => {
      if (Object.keys(question).length > 0) {
        isValid = true;
      }
    });
    if (isValid) {
      errors.questions = questions;
    }
  }
  return errors;
}

export const getDuaActivityFormError = ( errors ) => {
  const errorMsg = errors[`${Object.keys(errors)[0]}`];
  if (Array.isArray(errorMsg)) {
    if (errorMsg[0]) {
      const questionMsg = errorMsg[0][Object.keys(errorMsg[0])[0]];
      if (Array.isArray(questionMsg)) {
        if (questionMsg[0]) {
          const answerMsg = questionMsg[0][Object.keys(questionMsg[0])[0]];
          return answerMsg;
        }
      } else {
        return questionMsg;
      }
    }
  } else {
    return errorMsg;
  }
}

export const getActivityFormFinalValue = ( questions ) => {
  let finalValue = 0;
  questions.forEach( question => {
    finalValue = finalValue + question.questionValue;
  });
  return finalValue;
}

export const getQuestionsLiteral = ( questions ) => {
  return questions.map( question => ({
    ...question,
    answers: question.answers.map( (answer, index) => ({
      ...answer,
      literal: getLetterOfAlphabet(index).toLocaleUpperCase()
    })) 
  }));
}

export const getStudentsTeamAbp = ( students ) => {
  return students.map( data => ({
    user: data.id,
    is_moderator: data.studentSwitch,
    active: true,
  }));
}