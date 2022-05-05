import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { changeDate, getError} from "../../helpers/admin";
import { getTopicErrorMessage } from "../../helpers/topic";
import { startSaveDua } from "../teacher/dua";
import { getToastMsg } from "../../helpers/abp";
import { startSaveAbp } from "../teacher/abp";
import { startSaveAc } from "../teacher/ac";

export const startLoadTopics = ( type ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/topic?type=${type}`,
            );
            const body_topic = await resp_topic.json();
    
            if (body_topic.ok) {
                dispatch( setTopics( changeDate( body_topic.conon_data )));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
                dispatch( endLoadingTopics() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadTopicsByTeacher = ( teacher_id ) => {
    return async (dispatch) => {
        try {
            
            if (teacher_id) {
                dispatch( startLoadingTopics() );
                const resp_topic = await fetchWithToken( 
                    `topic/api/topic/${teacher_id}/by-teacher`,
                );
                const body_topic = await resp_topic.json();
        
                if (body_topic.ok) {
                    dispatch( setTopics( changeDate( body_topic.conon_data )));
                    dispatch( endLoadingTopics() );
                } else {
                    Swal.fire('Error', body_topic.detail, 'error');
                    dispatch( endLoadingTopics() );
                }   
            } else {
                dispatch( setTopics([]));
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadTopicsByOwner = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        try {
            
            if (uid) {
                dispatch( startLoadingTopics() );
                const resp_topic = await fetchWithToken( 
                    `topic/api/topic?owner=${uid}&auth_state=A`,
                );
                const body_topic = await resp_topic.json();
        
                if (body_topic.ok) {
                    // dispatch( setTopics( changeDate( body_topic.conon_data )));
                    dispatch( setTopics(body_topic.conon_data));
                    dispatch( endLoadingTopics() );
                } else {
                    Swal.fire('Error', body_topic.detail, 'error');
                    dispatch( endLoadingTopics() );
                }   
            } else {
                dispatch( setTopics([]));
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadTopicsListByStudent = ( userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/path/topic/topics-by-student/${userId}/`,
            );
            const body_topic = await resp_topic.json();

            if (body_topic.ok) {
                dispatch( setTopics(body_topic.conon_data));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
                dispatch( endLoadingTopics() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadNewStudentsForTopics = ( topic_id, age ) => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/topic/${topic_id}/new-students/`,
                {
                    age: age
                },
                'POST'
            );
            const body_topic = await resp_topic.json();

            if (body_topic.ok) {
                dispatch( setTopicStudents( body_topic.conon_data ));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
                dispatch( endLoadingTopics() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadNewTopicStudents = ( topicId, classroomId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/path/topic/new-students/${topicId}/${classroomId}/`
            );
            const body_topic = await resp_topic.json();

            if (body_topic.ok) {
                dispatch( setTopicStudents( body_topic.conon_data ));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadStudentsByTopic = ( topic_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/path/topic/students-by-topic/${topic_id}/`,
            );
            const body_topic = await resp_topic.json();

            if (body_topic.ok) {
                dispatch( setTopicStudents( body_topic.conon_data ));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
                dispatch( endLoadingTopics() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingTopics() );
        }
    }
}

export const startLoadCurrentTopic = ( topic_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingTopics() );
            const resp_topic = await fetchWithToken( 
                `topic/api/topic/${topic_id}/`,
            );
            const body_topic = await resp_topic.json();

            if (body_topic.ok) {
                dispatch( addNewTopic( body_topic.conon_data ));
                dispatch( endLoadingTopics() );
            } else {
                Swal.fire('Error', body_topic.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveStudentsToTopic = ( students_keys, topic_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_topic = await fetchWithToken( 
                `topic/api/topic/${topic_id}/assign-students/`, 
                {
                    students: students_keys 
                }, 
                'POST'  
            );
            const body_topic = await resp_topic.json();
    
            if ( body_topic.ok ) {
                
                dispatch( addNewStudentsToTopic( students_keys )
                );
    
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_topic.message, 
                    life: 4000 });
    
            } else {
                Swal.fire(
                    'Error', body_topic.detail, 'error'
                ); 
            } 

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveTopic = ( topic, methodology, toast ) => {
    return async (dispatch) => {
        try {
            const resp_topic = await fetchWithToken( 
                'topic/api/topic/', 
                topic, 
                'POST'  
            );
            const body_topic = await resp_topic.json();

            if ( body_topic.ok ) {
                dispatch( addNewTopic( 
                    { ...topic, id: body_topic.id }
                ));
                if ( topic.type === 1 ) {
                    dispatch( startSaveDua( 
                        body_topic.id, methodology, toast 
                    ));
                } else if ( topic.type === 2 ) {
                    dispatch( startSaveAbp( 
                        body_topic.id, methodology, toast 
                    ));
                } else if ( topic.type === 3 ) {
                    dispatch( startSaveAc( 
                        body_topic.id, methodology, toast 
                    ));
                }
            } else if ( body_topic.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_topic.detail, 
                        getTopicErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_topic}, consulte con el Desarrollador.`, 
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

export const startUpdateTopic = ( topic, isList, toast ) => {
    return async (dispatch) => {
        try {
            const resp_topic = await fetchWithToken( 
                `topic/api/topic/${topic.id}/`, 
                topic, 
                'PUT'  
            );
            const body_topic = await resp_topic.json();

            if ( body_topic.ok ) {
                if (isList) {
                    dispatch( updateTopic( topic ));
                } else {
                    dispatch( addNewTopic( topic ));
                }
                getToastMsg(toast, 'success', 'Estudiantes agregados correctamente.' );
                
            } else if ( body_topic.detail ) {
                Swal.fire(
                    'Error',
                    getError( 
                        body_topic.detail, 
                        getTopicErrorMessage 
                    ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    `${body_topic}, consulte con el Desarrollador.`, 
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

export const startBlockTopic = ( topic, topic_id, toast ) => {
    return async (dispatch) => {
        try {
            const resp_topic = await fetchWithToken( 
                `topic/api/topic/${topic_id}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_topic = await resp_topic.json();

            if ( body_topic.ok ) {
                const newTopic = { ...topic, active: false };
                dispatch( blockTopic( newTopic ));
                getToastMsg(toast, 'success', body_topic.message );                
            } else {
                Swal.fire(
                    'Error', `${body_topic.detail}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteTopic = ( topic_id, toast ) => {
    return async (dispatch) => {
        try {
            const resp_topic = await fetchWithToken(
                `topic/api/topic/${topic_id}/`, {}, 'DELETE' 
            );
            const body_topic = await resp_topic.json();

            if ( body_topic.ok ) {
                dispatch( deleteTopic( topic_id ) );
                getToastMsg(toast, 'success', body_topic.message );
            } else {
                Swal.fire(
                    'Error', body_topic.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteTopics = ( topics_keys, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_topic = await fetchWithToken(
                'topic/api/topic/destroy-topics/', 
                {
                    topics: topics_keys
                }, 
                'DELETE' 
            );
            const body_topic = await resp_topic.json();

            if ( body_topic.ok ) {
                
                dispatch( deleteTopics( topics_keys ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_topic.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_topic.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setTopics = ( topics ) => ({
    type: types.topicsList,
    payload: topics
});

export const startRemoveTopics = () => ({
    type: types.topicsRemove
});

export const startLoadingTopics = () => ({
    type: types.topicLoad
}); 

export const endLoadingTopics = () => ({
    type: types.topicStop
});

const addNewTopic = ( topic ) => ({
    type: types.currentTopicNew,
    payload: topic
});

export const starRemoveCurrentTopic = () => ({
    type: types.currentTopicRemove
});

const updateTopic = ( topic ) => ({
    type: types.topicUpdate,
    payload: topic
});

const blockTopic = ( topic ) => ({
    type: types.topicBlock,
    payload: topic
});

const deleteTopic = ( topic_id ) => ({
    type: types.topicDelete,
    payload: topic_id
});

const deleteTopics = ( topics_keys ) => ({
    type: types.topicsDelete,
    payload: topics_keys
});

export const setTopicStudents = ( topic_students ) => ({
    type: types.topicStudentsList,
    payload: topic_students
});

export const startRemoveTopicStudents = () => ({
    type: types.topicStudentsRemove
});

const addNewStudentsToTopic = ( student_id ) => ({
    type: types.topicStudentsUpdate,
    payload: student_id
});

export const setCurrentMethodology = ( methodology ) => ({
    type: types.currentMethodologyNew,
    payload: methodology
});

export const startRemoveCurrentMethodology = () => ({
    type: types.currentMethodologyRemove
});

export const startLoadingCurrentMethodology = () => ({
    type: types.currentMethodologyLoad
}); 

export const endLoadingCurrentMethodology = () => ({
    type: types.currentMethodologyStop
});