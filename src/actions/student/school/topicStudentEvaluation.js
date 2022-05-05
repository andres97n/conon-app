import Swal from "sweetalert2";

import { types } from "../../../types/types";
import { getToastMsg } from "../../../helpers/abp";
import { getError } from "../../../helpers/admin";
import { fetchWithToken } from "../../../helpers/fetch";
import { 
    getTopicStudentEvaluation, 
    getTopicStudentEvaluationErrorMsg 
} from "../../../helpers/school";

export const startLoadTopicStudentEvaluationList = ( topicId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopicStudentEvaluation() );
            const resp_topic_student_evaluation = await fetchWithToken( 
                `topic/api/topic-student-evaluation?topic=${topicId}&user=${userId}&active=true` 
            );
            const body_topic_student_evaluation = await resp_topic_student_evaluation.json();
    
            if (body_topic_student_evaluation.ok) {
                dispatch( setTopicStudentEvaluationList((
                    body_topic_student_evaluation.conon_data
                )));
                dispatch( endLoadingTopicStudentEvaluation() );
            } else {
                Swal.fire('Error', body_topic_student_evaluation.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveTopicStudentEvaluation = ( topicStudentEvaluation, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_topic_student_evaluation = await fetchWithToken( 
                'topic/api/topic-student-evaluation/', 
                topicStudentEvaluation, 
                'POST'  
            );
            const body_topic_student_evaluation = await resp_topic_student_evaluation.json();

            if ( body_topic_student_evaluation.ok ) {
                dispatch( addNewTopicStudentEvaluation( 
                    getTopicStudentEvaluation( 
                        topicStudentEvaluation, body_topic_student_evaluation.id 
                    ) 
                ));
                getToastMsg(toast, 'error', body_topic_student_evaluation.message );
                
            } else if ( body_topic_student_evaluation.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_topic_student_evaluation.detail, 
                        getTopicStudentEvaluationErrorMsg 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_topic_student_evaluation}, consulte con el Desarrollador.`, 
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

export const startBlockTopicStudentEvaluation = ( topicStudentEvaluationId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_topic_student_evaluation = await fetchWithToken( 
                `topic/api/topic-student-evaluation/${topicStudentEvaluationId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_topic_student_evaluation = await resp_topic_student_evaluation.json();

            if ( body_topic_student_evaluation.ok ) {
                dispatch( blockTopicStudentEvaluation(topicStudentEvaluationId) );
                getToastMsg(toast, 'error', body_topic_student_evaluation.message );                
            } else if ( body_topic_student_evaluation.detail ) {
                Swal.fire(
                    'Error', 
                    body_topic_student_evaluation.detail, 
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

const startLoadingTopicStudentEvaluation = () => ({
    type: types.topicStudentEvaluationLoad
});

const endLoadingTopicStudentEvaluation = () => ({
    type: types.topicStudentEvaluationStop
});

const setTopicStudentEvaluationList = ( topicStudentEvaluationList ) => ({
    type: types.topicStudentEvaluationList,
    payload: topicStudentEvaluationList
});

export const startRemoveTopicStudentEvaluationList = () => ({
    type: types.topicStudentEvaluationRemove
});

const addNewTopicStudentEvaluation = ( topicStudentEvaluation ) => ({
    type: types.topicStudentEvaluationNew,
    payload: topicStudentEvaluation
});

const blockTopicStudentEvaluation = ( topicStudentEvaluationId ) => ({
    type: types.topicStudentEvaluationBlock,
    payload: topicStudentEvaluationId
});

