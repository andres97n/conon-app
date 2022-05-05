// import { useCallback } from "react";
import { useFormik } from "formik";

export const useActivity = ( handleAddNewActivity ) => {

    const activityFormik = useFormik({
        initialValues: {
            description: '',
            objective: '',
            questions: [{
                title: '',
                answers: [{
                    literal: 'a',
                    detail: '',
                    value: null
                }],
                questionValue: null,
            }],
        },
        validate: (data) => {
            let errors = {}
            const questions = [];

            if (!data.description) {
                errors.description = 'La descripción de la actividad es obligatoria.';
            }

            data.questions.forEach( (question, index) => {
                let objectQuestion = {};
                const answers = [];
                
                if (!question.title) {
                    objectQuestion = {
                        ...objectQuestion,
                        title: 'La pregunta es obligatoria.'
                    }
                    // errors.questions[index].title = 'La pregunta es obligatoria.';
                }
                data.questions[index].answers.forEach( answer => {
                    let answerObject = {};
                    if (!answer.detail) {
                        answerObject = {
                            ...answerObject,
                            detail: 'La respuesta es obligatoria.',
                            index
                        }
                    }
                    if (answerObject.value > 0) {
                        answerObject = {
                            ...answerObject,
                            value: 'El valor de la respuesta es obligatoria.',
                            index
                        }
                    }

                    if (Object.keys(answerObject).length > 0) {
                        answers.push(answerObject);
                    }
                    
                });

                if (answers.length > 0) {
                    objectQuestion = {
                        ...objectQuestion,
                        answers
                    }
                }

                if (Object.keys(objectQuestion).length > 0) {
                    questions.push(objectQuestion);
                }
            });

            if (questions.length > 0) {
                errors.questions = questions;
            }

            return errors;
        },
        onSubmit: (data) => {
            handleAddNewActivity(data);
        }
    });
    
    // const handleConfirmIsActivityFormFieldValid = useCallback(
    //     (name, indexQuestion, fieldQuestion, indexAnswer, fieldAnswer) => {
    //     if (name === 'questions') {
    //         if (activityFormik.errors['questions']) {
    //             return !!(activityFormik.errors['questions'][indexQuestion]);
    //         } else {
    //             return false;
    //         }
    //     } else {
    //         return !!(activityFormik.errors[name]);
    //     }
    // }, [activityFormik.errors] );

    const handleConfirmIsActivityFormFieldValid = (
        name, indexQuestion, fieldQuestion, indexAnswer, fieldAnswer
    ) => {
        if (name === 'questions') {
            if (activityFormik.errors['questions']) {
                return !!(activityFormik.errors['questions'][indexQuestion]);
            } else {
                return false;
            }
        } else {
            return !!(activityFormik.errors[name]);
        }
    }

    // const handleGetActivityFormErrorMessage = useCallback(
    //     (name, indexQuestion, fieldQuestion, indexAnswer, fieldAnswer) => {
    //     if (name === 'questions') {
    //         if (fieldQuestion && indexQuestion) {
    //             if (fieldQuestion === 'answers') {
    //                 if (fieldAnswer && indexAnswer) {
    //                     return handleConfirmIsActivityFormFieldValid(name, indexQuestion) 
    //                     && <small className="p-error">{activityFormik.errors['questions'][indexQuestion]['answers'][indexAnswer][fieldAnswer]}</small>;   
    //                 } else {
    //                     return null;      
    //                 }
    //             } else {
    //                 return handleConfirmIsActivityFormFieldValid(name, indexQuestion) 
    //                 && <small className="p-error">{activityFormik.errors['questions'][indexQuestion]['title']}</small>;    
    //             } 
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return handleConfirmIsActivityFormFieldValid(name) 
    //         && <small className="p-error">{activityFormik.errors[name]}</small>;
    //     }
    // }, [activityFormik.errors, handleConfirmIsActivityFormFieldValid] );

    const handleGetActivityFormErrorMessage = (
        name, indexQuestion, fieldQuestion, indexAnswer, fieldAnswer
    ) => {
        if (name === 'questions') {
            if (fieldQuestion && indexQuestion) {
                if (fieldQuestion === 'answers') {
                    if (fieldAnswer && indexAnswer) {
                        return handleConfirmIsActivityFormFieldValid(name, indexQuestion) 
                        && <small className="p-error">{activityFormik.errors['questions'][indexQuestion]['answers'][indexAnswer][fieldAnswer]}</small>;   
                    } else {
                        return null;      
                    }
                } else {
                    return handleConfirmIsActivityFormFieldValid(name, indexQuestion) 
                    && <small className="p-error">{activityFormik.errors['questions'][indexQuestion]['title']}</small>;    
                }                    
                // if (fieldAnswer && indexAnswer) {
                //     console.log('entro respuesta');
                //     return handleConfirmIsActivityFormFieldValid(name) 
                //     && <small className="p-error">{activityFormik.errors[name][indexQuestion]?.fieldQuestion[indexAnswer][fieldAnswer]}</small>;   
                // } else {
                //     return handleConfirmIsActivityFormFieldValid(name) 
                //     && <small className="p-error">{activityFormik.errors[name][indexQuestion][fieldQuestion]}</small>;        
                // }
            } else {
                return null;
            }
        } else {
            return handleConfirmIsActivityFormFieldValid(name) 
            && <small className="p-error">{activityFormik.errors[name]}</small>;
        }
    }

    return [ 
        activityFormik, 
        handleConfirmIsActivityFormFieldValid,
        handleGetActivityFormErrorMessage  
    ];

}