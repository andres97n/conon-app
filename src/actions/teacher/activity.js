import Swal from "sweetalert2";

import { methodologyTypes } from "../../types/methodologyTypes";
import { fetchWithToken } from "../../helpers/fetch";
import { changeDate, getError } from "../../helpers/admin";
import { getActivityData, getActivityDetailErrorMessage, 
         getActivityErrorMessage, getQuestionData, getQuestionsWithActivityId 
} from "../../helpers/dua";
import { getToastMsg } from "../../helpers/abp";

export const startLoadActivitiesDuaList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingActivity() );
            const resp_activity = await fetchWithToken( 'dua/api/activity/' );
            const body_activity = await resp_activity.json();
    
            if (body_activity.ok) {
                dispatch( setActivitiesList( changeDate(body_activity.conon_data)));
                dispatch( endLoadingActivity() );
            } else {
                Swal.fire('Error', body_activity.detail, 'error');
                dispatch( endLoadingActivity() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingActivity() );
        }
    }
}

export const startLoadActivityDetailsList = ( activityId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingActivity() );
            const resp_activity_detail = await fetchWithToken( 
                `dua/api/activity/${activityId}/questions/` 
            );
            const body_activity_detail = await resp_activity_detail.json();
    
            if (body_activity_detail.ok) {
                dispatch( setActivityDetailList(body_activity_detail.conon_data));
                dispatch( endLoadingActivity() );
            } else {
                Swal.fire('Error', body_activity_detail.detail, 'error');
                dispatch( endLoadingActivity() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingActivity() );
        }
    }
}

export const startLoadActivityWithQuestions = ( duaId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingActivity() );
            const resp_activity = await fetchWithToken( 
                `dua/api/path/activity/activity-questions/${duaId}/` 
            );
            const body_activity = await resp_activity.json();
    
            if (body_activity.ok) {
                dispatch( setCurrentActivity(body_activity.conon_data));
                dispatch( endLoadingActivity() );
            } else {
                Swal.fire('Error', body_activity.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveActivity = ( activity, questions, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_activity = await fetchWithToken( 
                'dua/api/activity/', 
                activity, 
                'POST'  
            );
            const body_activity = await resp_activity.json();

            if ( body_activity.ok ) {
                dispatch( addNewActivity( getActivityData(
                    { id: body_activity.id, ...activity }
                )));
                dispatch( startSaveQuestionByActivity(
                    body_activity.id, questions, body_activity.message, toast
                ) );
            } else if ( body_activity.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_activity.detail, getActivityErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_activity}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateActivity = ( activity, activityId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_activity = await fetchWithToken( 
                `dua/api/activity/${activityId}/`, 
                activity, 
                'PUT'  
            );
            const body_activity = await resp_activity.json();

            if ( body_activity.ok ) {
                dispatch( updateActivity( getActivityData( activity, activityId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Actividad Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_activity.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_activity.detail, getActivityErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_activity}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteActivity = ( activityId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_activity = await fetchWithToken(
                `dua/api/activity/${activityId}/`, 
                {}, 
                'DELETE' );
            const body_activity = await resp_activity.json();

            if ( body_activity.ok ) {
                dispatch( deleteActivity( activityId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_activity.message, 
                    life: 4000 });

            } else if (body_activity.detail) {
                Swal.fire(
                    'Error', body_activity.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

// Solo para many questions
export const startSaveQuestionByActivity = ( activityId, questions, msg, toast ) => {
    return async ( dispatch ) => {
        try {
            const newQuestions = getQuestionsWithActivityId( questions, activityId );
            const resp_question = await fetchWithToken( 
                'dua/api/question/', newQuestions, 'POST'  
            );
            const body_question = await resp_question.json();

            if ( body_question.ok ) {
                dispatch( addNewActivityDetail( getQuestionData(
                    body_question.question
                )));
                getToastMsg(toast, 'success', msg );
                
            } else if ( body_question.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_question.detail, getActivityDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_question}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateQuestion = ( question, questionId, activityId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_question = await fetchWithToken( 
                `dua/api/question/${questionId}/`, 
                {
                    activity: activityId,
                    title: question.title,
                    answers: question.answers,
                    value: question.value,
                    active: question.active,
                }, 
                'PUT'  
            );
            const body_question = await resp_question.json();

            if ( body_question.ok ) {
                dispatch( updateActivityDetail( getQuestionData( question, questionId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Pregunta Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_question.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_question.detail, getActivityDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_question}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteQuestion = ( questionId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_question = await fetchWithToken(
                `dua/api/question/${questionId}/`, 
                {}, 
                'DELETE' );
            const body_question = await resp_question.json();

            if ( body_question.ok ) {
                dispatch( deleteActivityDetail( questionId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_question.message, 
                    life: 4000 });

            } else if (body_question.detail) {
                Swal.fire(
                    'Error', body_question.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setActivitiesList = ( activities ) => ({
    type: methodologyTypes.activityList,
    payload: activities
});

export const startRemoveActivities = () => ({
    type: methodologyTypes.activityRemove
});

const setCurrentActivity = ( currentActivity ) => ({
    type: methodologyTypes.activityCurrentList,
    payload: currentActivity
});

export const startRemoveCurrentActivity = () => ({
    type: methodologyTypes.activityCurrentRemove
});

const startLoadingActivity = () => ({
    type: methodologyTypes.activityLoad
});

const endLoadingActivity = () => ({
    type: methodologyTypes.activityStop
});

const addNewActivity = ( activity ) => ({
    type: methodologyTypes.activityNew,
    payload: activity
});

const updateActivity = ( activity ) => ({
    type: methodologyTypes.activityUpdate,
    payload: activity
});

const deleteActivity = ( activityId ) => ({
    type: methodologyTypes.activityDelete,
    payload: activityId
});

// ACTIVITY DETAIL

const setActivityDetailList = ( activityDetails ) => ({
    type: methodologyTypes.activityDetailList,
    payload: activityDetails
});

export const startRemoveActivityDetails = () => ({
    type: methodologyTypes.activityDetailRemove
});

const addNewActivityDetail = ( activityDetail ) => ({
    type: methodologyTypes.activityDetailNew,
    payload: activityDetail
});

const updateActivityDetail = ( activityDetail ) => ({
    type: methodologyTypes.activityDetailUpdate,
    payload: activityDetail
});

const deleteActivityDetail = ( activityDeleteId ) => ({
    type: methodologyTypes.activityDetailDelete,
    payload: activityDeleteId
});