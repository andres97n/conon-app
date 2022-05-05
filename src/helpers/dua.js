import { DateTime } from "luxon";
import moment from "moment";

// TODO: Los demás geterrors deberían apuntar también al atributo state

export const getDuaData = ( data, duaId ) => {
    return {
        id: duaId,
        topic: data.topic,
        written_conceptualization: data.written_conceptualization,
        oral_conceptualization: data.oral_conceptualization,
        example: data.example,
        images: data.images,
        observations: data.observations || 'S/N',
        state: data.state || 1,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getDuaErrorMessage = ( detail ) => {
    if ( detail.topic ) {
        return detail.topic[0]
    } else if ( detail.written_conceptualization ) {
        return detail.written_conceptualization[0]
    } else if ( detail.oral_conceptualization ) {
        return detail.oral_conceptualization[0]
    } else if ( detail.example ) {
        return detail.example[0]
    } else if ( detail.images ) {
        return detail.images[0]
    } else if (detail.state) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getActivityData = ( data, activityId ) => {
    return {
        id: activityId,
        dua: data.dua,
        description: data.description,
        objective: data.objective,
        final_grade: data.final_grade,
        state: data.state || 1,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getActivityErrorMessage = ( detail ) => {
    if ( detail.id ) {
        return detail.id[0]
    } else if ( detail.dua ) {
        return detail.dua[0]
    } else if ( detail.description ) {
        return detail.description[0]
    } else if ( detail.objective ) {
        return detail.objective[0]
    } else if ( detail.final_grade ) {
        return detail.final_grade[0]
    } else if (detail.state) {
        return detail.state[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getQuestionData = ( data, questionId ) => {
    return {
        id: questionId,
        activity: data.activity,
        title: data.title,
        answers: data.answers,
        value: data.value,
        active: data.active || true,
        created_at: data.created_at || moment().format('DD-MM-YYYY')
    }
}

export const getActivityDetailErrorMessage = ( detail ) => {
    if ( detail.id ) {
        return detail.id[0]
    } else if ( detail.activity ) {
        return detail.activity[0]
    } else if ( detail.title ) {
        return detail.title[0]
    } else if ( detail.answers ) {
        return detail.answers[0]
    } else if ( detail.value ) {
        return detail.value[0]
    } else if (detail.active) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getStudentActivityData = ( data, studentActivityId ) => {
    return {
        id: studentActivityId,
        activity: data.activity,
        owner: data.owner,
        qualification: data.qualification,
        observations: data.observations,
        active: data.active || true,
        created_at: data.created_at || new DateTime.now()
    }
}

export const getStudentActivityErrorMessage = ( detail ) => {
    if ( detail.activity ) {
        return detail.activity[0]
    } else if ( detail.owner ) {
        return detail.owner[0]
    } else if ( detail.qualification ) {
        return detail.qualification[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getAnswerWithStudentActivity = ( answers, studentActivityId ) => {
    return answers.map( answer => ({
        ...answer,
        activity_student: studentActivityId
    }));
}

export const getAnswerData = ( data, answerId ) => ({
    id: answerId,
    activity_student: data.activity_student,
    question: data.question,
    detail: data.detail,
    value: data.value,
    active: data.active || true,
    created_at: data.created_at || new DateTime.now()
});

export const getAnswerDataErrorMessage = ( detail ) => {
    if ( detail.activity_student ) {
        return detail.activity_student[0]
    } else if ( detail.question ) {
        return detail.question[0]
    } else if ( detail.detail ) {
        return detail.detail[0]
    } else if ( detail.value ) {
        return detail.value[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

export const getAnswerDataManyErrorMessage = ( detail ) => {
    if (Array.isArray(detail)) {
        if ( detail[0].activity_student ) {
            return detail[0].activity_student[0]
        } else if ( detail[0].question ) {
            return detail[0].question[0]
        } else if ( detail[0].detail ) {
            return detail[0].detail[0]
        } else if ( detail[0].value ) {
            return detail[0].value[0]
        } else {
            return 'Error, consulte con el Administrador.';
        }
    } else {
        return detail;
    }
}

// ------- END DATA ---------

export const getQuestionsWithActivityId = ( questions, activityId ) => {
    return questions.map( question => ({
        activity: activityId,
        ...question
    }))
}

// ------- DUA FUNCTIONS ----------

export const getFormikFieldsActivity = ( questions ) => {
    let formQuestions = {};
    questions.forEach( (question, index) => {
        let formAnswers = {};
        question.answers.forEach( (answer, i) => {
            formAnswers = { ...formAnswers, [`answer${i + 1}`]: false }
        });
        formQuestions = { ...formQuestions, [`question${index + 1}`]: formAnswers }
    });
    return formQuestions;
}

export const getQuestionInitialState = ( question ) => {
    let questionsAnswers = {};
    question.answers.forEach( (answer, i) => {
        questionsAnswers = { ...questionsAnswers, [`answer${i + 1}`]: false }
    });
    return questionsAnswers;
}

export const getAnswerOptions = ( optionsInitialState, option, clear ) => {
    let newOptions = {};
    if (clear) {
      newOptions = Object.fromEntries(Object.entries(optionsInitialState).map(
        ([ key ]) => {
          return [ key, false ];
        }
      ));
    } else {
      newOptions = Object.fromEntries(Object.entries(optionsInitialState).map(
        ([ key ]) => key !== option 
          ? [ key, true ]
          : [ key, false ]
      ));
    }
    return newOptions;
  }

export const isOptionSelected = ( question ) => {
    let isSelected = false;
    Object.values(question).forEach( value => value === true && (isSelected = true));
    return isSelected;
}

export const getStudentActivityObject = ( questions, values ) => {
    return questions.map( (question, index) => ({
        question: question.id,
        detail: question.answers.map( (answer, i) => ({
            literal: answer.literal,
            isSelected: values[`question${index + 1}`][`answer${i + 1}`],
            value: answer.value
        })),
        value: question.value,
        active: true
    }));
}

export const getStudentActivityCalification = ( questions, values ) => {
    let qualification = 0;
    questions.forEach( (question, index) => {
        question.answers.forEach( (answer, i) => {
            if (values[`question${index + 1}`][`answer${i + 1}`]) {
                qualification = qualification + answer.value
            }
        })
    });
    return qualification;
}