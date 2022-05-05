import Swal from "sweetalert2";

import { fetchWithToken } from "../../helpers/fetch";
import { methodologyTypes } from "../../types/methodologyTypes";
import { getToastMsg } from "../../helpers/abp";
import { getError } from "../../helpers/admin";
import { 
    getAnswerData, 
    getAnswerDataErrorMessage, 
    getAnswerDataManyErrorMessage, 
    getAnswerWithStudentActivity, 
    getStudentActivityData, 
    getStudentActivityErrorMessage 
} from "../../helpers/dua";

export const startLoadStudentActivityWithAnswers = ( activityId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingStudentActivity() );
            const resp_student_activity = await fetchWithToken( 
                `dua/api/path/activity-student/activity-student-answers/${activityId}/${userId}/` 
            );
            const body_student_activity = await resp_student_activity.json();
    
            if (body_student_activity.ok) {
                dispatch( setCurrentStudentActivity(body_student_activity.conon_data));
                dispatch( endLoadingStudentActivity() );
            } else {
                Swal.fire('Error', body_student_activity.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadStudentActivityExists = ( activityId, userId ) => {
    return async (dispatch) => {
        try {
            const resp_student_activity = await fetchWithToken( 
                `dua/api/path/activity-student/activity-students-exists/${activityId}/${userId}/` 
            );
            const body_student_activity = await resp_student_activity.json();
    
            if (body_student_activity.ok) {
                if (body_student_activity.conon_data) {
                    dispatch( activeStudentActivity());
                }
            } else {
                Swal.fire('Error', body_student_activity.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveStudentActivity = ( studentActivity, answers, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_student_activity = await fetchWithToken( 
                'dua/api/activity-student/', 
                studentActivity, 
                'POST'  
            );
            const body_student_activity = await resp_student_activity.json();

            if ( body_student_activity.ok ) {
                dispatch( addNewStudentActivity( 
                    getStudentActivityData( studentActivity, body_student_activity.id ) 
                ));
                dispatch( startSaveAnswers( body_student_activity.id, answers, toast ));
                
            } else if ( body_student_activity.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_student_activity.detail, 
                        getStudentActivityErrorMessage
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_student_activity}, consulte con el Desarrollador.`, 
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
} 

export const startBlockStudentActivity = ( studentActivityId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_student_activity = await fetchWithToken( 
                `dua/api/activity-student/${studentActivityId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_student_activity = await resp_student_activity.json();

            if ( body_student_activity.ok ) {
                dispatch( blockStudentActivity(studentActivityId) );
                getToastMsg(toast, 'error', body_student_activity.message );                
            } else if ( body_student_activity.detail ) {
                Swal.fire(
                    'Error', 
                    body_student_activity.detail, 
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

export const startSaveAnswers = ( studentActivityId, answers, toast ) => {
    return async ( dispatch ) => {
        try {
            console.log(answers);
            const newAnswers = Array.isArray(answers)
                ? getAnswerWithStudentActivity( answers, studentActivityId )
                : { ...answers, activity_student: studentActivityId }
            console.log(newAnswers, 'new');
            const resp_answer = await fetchWithToken( 
                'dua/api/answer/', 
                newAnswers, 
                'POST'  
            );
            const body_answer = await resp_answer.json();

            if ( body_answer.ok ) {
                dispatch( addNewAnswer( 
                    Array.isArray(body_answer.answer)
                        ? body_answer.answer
                        : getAnswerData( newAnswers, body_answer.answer ) 
                ));
                getToastMsg(toast, 'success', body_answer.message );
            } else if ( body_answer.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_answer.detail,
                        Array.isArray(newAnswers)
                            ? getAnswerDataErrorMessage
                            : getAnswerDataManyErrorMessage
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_answer}, consulte con el Desarrollador.`, 
                    'error'
                );
            }
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startBlockAnswer = ( answerId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_answer = await fetchWithToken( 
                `dua/api/answer/${answerId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_answer = await resp_answer.json();

            if ( body_answer.ok ) {
                dispatch( blockAnswer(answerId) );
                getToastMsg(toast, 'error', body_answer.message );                
            } else if ( body_answer.detail ) {
                Swal.fire(
                    'Error', 
                    body_answer.detail, 
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

const setCurrentStudentActivity = ( sutdentActivities ) => ({
    type: methodologyTypes.studentActivityList,
    payload: sutdentActivities
});

export const startRemoveCurrentStudentActivity = () => ({
    type: methodologyTypes.studentActivityRemove
});

const startLoadingStudentActivity = () => ({
    type: methodologyTypes.studentActivityLoad
});

const endLoadingStudentActivity = () => ({
    type: methodologyTypes.studentActivityStop
});

const addNewStudentActivity = ( studentActivity ) => ({
    type: methodologyTypes.studentActivityNew,
    payload: studentActivity
});

// const updateStudentActivity = ( studentActivity ) => ({
//     type: methodologyTypes.studentActivityUpdate,
//     payload: studentActivity
// });

const blockStudentActivity = ( studentActivityId ) => ({
    type: methodologyTypes.studentActivityBlock,
    payload: studentActivityId
});

// const setAnswersList = ( answers ) => ({
//     type: methodologyTypes.studentActivityDetailList,
//     payload: answers
// });

export const startRemoveAnswers = () => ({
    type: methodologyTypes.studentActivityDetailRemove
});

const addNewAnswer = ( answer ) => ({
    type: methodologyTypes.studentActivityDetailNew,
    payload: answer
});

// const updateAnswer = ( answer ) => ({
//     type: methodologyTypes.studentActivityDetailUpdate,
//     payload: answer
// });

const blockAnswer = ( answerId ) => ({
    type: methodologyTypes.studentActivityDetailBlock,
    payload: answerId
});

const activeStudentActivity = () => ({
    type: methodologyTypes.studentActivitySetActive
});

export const inactiveStudentActivity = () => ({
    type: methodologyTypes.studentActivitySetInactive
});
