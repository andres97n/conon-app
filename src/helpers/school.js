import { DateTime } from "luxon";

// ---- Topic Student Evaluation ----

export const getTopicStudentEvaluation = ( data, topicStudentEvaluationId ) => ({
    id: topicStudentEvaluationId,
    topic: data.topic,
    user: data.user,
    evaluation_body: data.evaluation_body,
    final_grade: data.final_grade,
    observations: data.observations,
    active: data.active || true,
    created_at: data.created_at || new DateTime.now()  
});

export const getTopicStudentEvaluationErrorMsg = ( detail ) => {
    if ( detail.topic ) {
        return detail.topic[0]
    } else if ( detail.user ) {
        return detail.user[0]
    } else if ( detail.type ) {
        return detail.type[0]
    } else if ( detail.evaluation_body ) {
        return detail.evaluation_body[0]
    } else if ( detail.final_grade ) {
        return detail.final_grade[0]
    } else if ( detail.observations ) {
        return detail.observations[0]
    } else if ( detail.active ) {
        return detail.active[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }
}

// -----------------------------------------------------

export const getEvaluation = ( data, title ) => {
    return data.filter( rubric => 
      rubric.rubric_detail_abp.title === title
    );
}

export const getValidEvaluationQuestions = ( isModerator, evaluationQuestions ) => {
    let validQuestions = [];
    let count = 0;
    evaluationQuestions.forEach( question => {
        if (!isModerator) {
            if (!question.forToModerator) {
                count++;
                validQuestions = [ ...validQuestions, {
                    ...question,
                    index: count
                }]
            }
        } else {
            validQuestions = [ ...validQuestions, question ]
        }
    });
    return validQuestions;
}

export const checkboxInitialState = {
    firstOption: false,
    secondOption: false,
    thirdOption: false,
    fourOption: false,
};

export const getCheckboxStateEvaluation = ({
    firstQuestion: checkboxInitialState,
    secondQuestion: checkboxInitialState,
    thirdQuestion: checkboxInitialState,
    fourthQuestion: checkboxInitialState,
    fifthQuestion: checkboxInitialState,
    sixthQuestion: checkboxInitialState,
    seventhQuestion: checkboxInitialState,
    eighthQuestion: checkboxInitialState,
});

export const getCheckboxOption = ( index ) => {
    if (index === 2) {
        return 'firstOption';
    } else if (index === 3) {
        return 'secondOption';
    } else if (index === 4) {
        return 'thirdOption';
    } else if (index === 5) {
        return 'fourOption';
    } else {
        return '';
    }
}

export const getCheckBoxState = ( label, type ) => {
    if (type === 1) {
        if (label === 'No lo hice') {
            return {
                ...checkboxInitialState,
                firstOption: true
            }    
        } else if (label === 'Lo hice poco') {
            return {
                ...checkboxInitialState,
                secondOption: true
            }    
        } else if (label === 'Lo hice normal') {
            return {
                ...checkboxInitialState,
                thirdOption: true
            }    
        } else if (label === 'Lo hice mucho') {
            return {
                ...checkboxInitialState,
                fourOption: true
            }    
        }    
    } else {
        if (label === 'No lo hice/hicimos') {
            return {
                ...checkboxInitialState,
                firstOption: true
            }    
        } else if (label === 'Lo hice/hicimos poco') {
            return {
                ...checkboxInitialState,
                secondOption: true
            }    
        } else if (label === 'Lo hice/hicimos normal') {
            return {
                ...checkboxInitialState,
                thirdOption: true
            }    
        } else if (label === 'Lo hice/hicimos mucho') {
            return {
                ...checkboxInitialState,
                fourOption: true
            }    
        }
    }
    return checkboxInitialState;
}

export const getOptionQuestionLabel = ( type, value, label ) => {
    let optionLabel = '';
    // if ( label ) {
    //     if (value === 'No lo hice') {
    //         optionLabel = 'firstOption';
    //     } else if (value === 'Lo hice poco') {
    //         optionLabel = 'secondOption';
    //     } else if (value === 'Lo hice normal') {
    //         optionLabel = 'thirdOption';
    //     } else if (value === 'Lo hice mucho') {
    //         optionLabel = 'fourOption';
    //     }
    // } else {
        if (type === 1) {
            if (value === 'firstOption') {
                optionLabel = 'No lo hice';
            } else if (value === 'secondOption') {
                optionLabel = 'Lo hice poco';
            } else if (value === 'thirdOption') {
                optionLabel = 'Lo hice normal';
            } else if (value === 'fourOption') {
                optionLabel = 'Lo hice mucho';
            }    
        } else {
            if (value === 'firstOption') {
                optionLabel = 'No lo hice/hicimos';
            } else if (value === 'secondOption') {
                optionLabel = 'Lo hice/hicimos poco';
            } else if (value === 'thirdOption') {
                optionLabel = 'Lo hice/hicimos normal';
            } else if (value === 'fourOption') {
                optionLabel = 'Lo hice/hicimos mucho';
            }
        }
    // }
    return optionLabel;
}

export const isEvaluationOptionEmpty = ( options ) => {
    let isValid = false;
    Object.values(options).forEach( value => {
        if (value === true) {
            isValid = true;
        }
    });
    return isValid;
} 

export const getErrorMsgEvaluation = ( index ) => {
    let errorMsg = '';
    if (index === 1) {
        errorMsg = 'Es necesario responder la primera pregunta';
    } else if (index === 2) {
        errorMsg = 'Es necesario responder la segunda pregunta';
    } else if (index === 3) {
        errorMsg = 'Es necesario responder la tercera pregunta';
    } else if (index === 4) {
        errorMsg = 'Es necesario responder la cuarta pregunta';
    } else if (index === 5) {
        errorMsg = 'Es necesario responder la quinta pregunta';
    } else if (index === 6) {
        errorMsg = 'Es necesario responder la sexta pregunta';
    } else if (index === 7) {
        errorMsg = 'Es necesario responder la séptima pregunta';
    } else if (index === 8) {
        errorMsg = 'Es necesario responder la octava pregunta';
    }
    return errorMsg;
} 

export const getQuestionOptionChoiced = ( options, type ) => {
    let optionChoiced = '';
    Object.entries(options).forEach(
        ([ key, value ]) => {
            if (value) {
                optionChoiced = getOptionQuestionLabel( type, key );
            }
        }
    )
    return optionChoiced;
}

export const getObjectQuestionEvaluation = ( index, question, options, type ) => {
    return {
        index,
        question,
        optionChoiced: getQuestionOptionChoiced( options, type )
    }
}

export const getEvaluationObject = ( values, isModerator, evaluationQuestions, type ) => {
    const questionsEvaluation = getValidEvaluationQuestions( 
        isModerator, evaluationQuestions 
    );
    const evaluationObject = questionsEvaluation.map( question => (
        getObjectQuestionEvaluation( 
            question.index, 
            question.question, 
            values[`${question.field}`],
            type
        )
    ));
    return evaluationObject;
}

export const setValuesEvaluation = ( 
    values, excludeField, isModerator, studentOptions, evaluationQuestions, type
) => {
    let finalValues;
    const questions = getValidEvaluationQuestions( isModerator, evaluationQuestions );
    let excludeValues = {}; 
    Object.entries(values).forEach( ([key, value]) => {
        if (key !== excludeField) {
            excludeValues = { ...excludeValues, [key]: value } 
        }
    });
    const newQuestions = questions.map( question => {
        let newValue;
        studentOptions.forEach( option => 
            question.question === option.question && (newValue = option.optionChoiced) 
        );
        return { ...question, newValue }
    });
    Object.entries(excludeValues).forEach( ([key, value], index) => {
        let newValue;
        newQuestions.forEach( question => 
            key === question.field && ( newValue = question.newValue )    
        );
        finalValues = { ...finalValues, [key]: getCheckBoxState( newValue, type ) }
    });
    return finalValues
}