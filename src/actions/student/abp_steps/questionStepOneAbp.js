import Swal from "sweetalert2";

import { fetchWithToken } from "../../../helpers/fetch";
import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { changeDate, getError } from "../../../helpers/admin";
import { 
    getQuestionAbpData, 
    getQuestionAbpDataErrorMessage 
} from "../../../helpers/abp-steps";

export const startLoadQuestionStepOneAbpList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingQuestionStepOneAbp() );
            const resp_question_abp = await fetchWithToken( 
                'abp-steps/api/step-one/question/'
            );
            const body_question_abp = await resp_question_abp.json();
    
            if (body_question_abp.ok) {
                dispatch( setQuestionStepOneAbpList( 
                    changeDate(body_question_abp.conon_data))
                );
                dispatch( endLoadingQuestionStepOneAbp() );
            } else {
                Swal.fire('Error', body_question_abp.detail, 'error');
                dispatch( endLoadingQuestionStepOneAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingQuestionStepOneAbp() );
        }
    }
}

export const startLoadQuestionsAndAnswersStepOneAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingQuestionStepOneAbp() );
            const resp_question_abp = await fetchWithToken( 
                `abp-steps/api/path/step-one/question/questions-and-answers/${teamId}` 
            );
            const body_question_abp = await resp_question_abp.json();
    
            if (body_question_abp.ok) {
                dispatch( setQuestionStepOneAbpList( 
                    changeDate(body_question_abp.conon_data))
                );
                dispatch( endLoadingQuestionStepOneAbp() );
            } else {
                Swal.fire('Error', body_question_abp.detail, 'error');
                dispatch( endLoadingQuestionStepOneAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingQuestionStepOneAbp() );
        }
    }
}

export const startLoadQuestionsByTeamStepOneAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingQuestionStepOneAbp() );
            const resp_question_abp = await fetchWithToken( 
                `abp-steps/api/path/step-one/question/questions-by-team/${teamId}` 
            );
            const body_question_abp = await resp_question_abp.json();
    
            if (body_question_abp.ok) {
                dispatch( setQuestionStepOneAbpList( body_question_abp.conon_data )
                );
                dispatch( endLoadingQuestionStepOneAbp() );
            } else {
                Swal.fire('Error', body_question_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveQuestionStepOneAbp = ( questionAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_question_abp = await fetchWithToken( 
                'abp-steps/api/step-one/question/', 
                questionAbp, 
                'POST'  
            );
            const body_question_abp = await resp_question_abp.json();

            if ( body_question_abp.ok ) {

                dispatch(addNewQuestionStepOneAbp( 
                    getQuestionAbpData(questionAbp, body_question_abp.id) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_question_abp.message, 
                    life: 4000 });
                
            } else if ( body_question_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_question_abp.detail, getQuestionAbpDataErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_question_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startSaveManyQuestionStepOneAbp = ( questionsAbpList, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_question_abp = await fetchWithToken( 
                'abp-steps/api/step-one/question/create-many/', 
                questionsAbpList, 
                'POST'  
            );
            const body_question_abp = await resp_question_abp.json();

            if ( body_question_abp.ok ) {

                body_question_abp.questions.forEach( opinion => {
                    dispatch(addNewQuestionStepOneAbp(
                        getQuestionAbpData( opinion, opinion.id )
                    ));
                });

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_question_abp.message, 
                    life: 4000 });
                
            } else if ( body_question_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_question_abp.detail, getQuestionAbpDataErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_question_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startBlockOQuestionStepOneAbp = ( questionId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_question_abp = await fetchWithToken( 
                `abp-steps/api/step-one/question/${questionId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_question_abp = await resp_question_abp.json();

            if ( body_question_abp.ok ) {
                dispatch( blockQuestionStepOneAbp(questionId));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_question_abp.message, 
                    life: 4000 });
                
            } else if ( body_question_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_question_abp.detail, 
                    'error'
                );
            } 
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setQuestionStepOneAbpList = ( questionAbpList ) => ({
    type: abpStepsTypes.questionStepOneList,
    payload: questionAbpList
});

export const startRemoveQuestionStepOneAbpList = () => ({
    type: abpStepsTypes.questionStepOneRemove
});

const startLoadingQuestionStepOneAbp = () => ({
    type: abpStepsTypes.questionStepOneLoad
});

const endLoadingQuestionStepOneAbp = () => ({
    type: abpStepsTypes.questionStepOneStop
});

const addNewQuestionStepOneAbp = ( questionAbp ) => ({
    type: abpStepsTypes.questionStepOneNew,
    payload: questionAbp
});

// const updateQuestionStepOneAbp = ( questionAbp ) => ({
//     type: abpStepsTypes.questionStepOneUpdate,
//     payload: questionAbp
// });

const blockQuestionStepOneAbp = ( questionAbpId ) => ({
    type: abpStepsTypes.questionStepOneBlock,
    payload: questionAbpId
});