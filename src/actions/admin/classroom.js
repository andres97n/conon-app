import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { changeDate, getClassroomData, getClassroomErrorMessage, getError } from "../../helpers/admin";

export const startLoadClassrooms = ( active ) => {
    return async (dispatch) => {
        try {
        
            dispatch( startLoadingClassroom() );
            let resp_classroom;
            if ( active ) {
                resp_classroom = await fetchWithToken( 'school/api/classroom?state=1' );
            } else {
                resp_classroom = await fetchWithToken( 'school/api/classroom/' );
            }
            const body_classroom = await resp_classroom.json();
    
            if (body_classroom.ok) {
                dispatch( setClassrooms( changeDate( body_classroom.conon_data )));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }
    
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startLoadClasroomSchoolPeriods = () => {
    return async (dispatch) => {
        try {
        
            dispatch( startLoadingClassroom() );
            const resp_classroom = await fetchWithToken( 'school/api/school-period/classroom/' );
            const body_classroom = await resp_classroom.json();

            if (body_classroom.ok) {
                dispatch( setClassroomSchoolPeriods( body_classroom.conon_data ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startLoadStudentsByClassroom = ( classroom_id, age ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingClassroom() );
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/${classroom_id}/new-students/`,
                {
                    age: age
                },
                'POST'
            );
            const body_classroom = await resp_classroom.json();

            if (body_classroom.ok) {
                dispatch( setStudentsByClassroom( body_classroom.conon_data ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startLoadClassroomsShortData = () => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingClassroom() );
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/short/`,
            );
            const body_classroom = await resp_classroom.json();

            if (body_classroom.ok) {
                dispatch( setClassrooms( body_classroom.conon_data ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    } 
}

export const startLoadClassroomsByTeacher = ( user_id ) => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingClassroom() );
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/by-teacher/`,
                {
                    user: user_id
                },
                'POST'
            );
            const body_classroom = await resp_classroom.json();

            if (body_classroom.ok) {
                dispatch( setClassrooms( changeDate(body_classroom.conon_data) ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startLoadClassroomsDetail = ( classroom_id ) => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingClassroom() );
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/${classroom_id}/students/`
            );
            const body_classroom = await resp_classroom.json();

            if (body_classroom.ok) {
                dispatch( setStudentsByClassroom( changeDate(body_classroom.conon_data) ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startLoadStudentsForAbpByClassroom = ( classroom_id, abp_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingClassroom() );
            const resp_students_by_classroom = await fetchWithToken( 
                `abp/api/path/team-abp/new-students-for-team-abp/${classroom_id}/${abp_id}/`
            );
            const body_students_by_classroom = await resp_students_by_classroom.json();

            if (body_students_by_classroom.ok) {
                dispatch( setStudentsByClassroom( 
                    body_students_by_classroom.conon_data
                ));
                dispatch( endLoadingClassroom() );
            } else {
                Swal.fire('Error', body_students_by_classroom.detail, 'error');
                dispatch( endLoadingClassroom() );
            }
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingClassroom() );
        }
    }
}

export const startSaveClassroom = ( classroom, toast ) => {
    return async (dispatch) => {

        try {
        
            const resp_classroom = await fetchWithToken( 
                'school/api/classroom/', 
                {
                    name: classroom.name,
                    school_period: classroom.school_period.id,
                    curse_level: classroom.curse_level,
                    capacity: classroom.capacity
                }, 
                'POST'  
            );
            const body_classroom = await resp_classroom.json();
    
            if ( body_classroom.ok ) {
                
                dispatch( addNewClassroom( 
                    getClassroomData( classroom, body_classroom.id ))
                );
    
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_classroom.message, 
                    life: 4000 });
    
            } else if ( body_classroom.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_classroom.detail, getClassroomErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_classroom}, consulte con el Desarrollador.`, 'error'
                );
            }
    
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

export const startUpdateClassroom = ( classroom, classroom_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/${classroom_id}/`, 
                {
                    name: classroom.name,
                    school_period: classroom.school_period.id,
                    curse_level: classroom.curse_level,
                    capacity: classroom.capacity
                }, 
                'PUT'  
            );
            const body_classroom = await resp_classroom.json();

            if ( body_classroom.ok ) {
                
                dispatch( updateClassroom( 
                    getClassroomData( classroom, classroom_id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Aula Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_classroom.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_classroom.detail, getClassroomErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_classroom}, consulte con el Desarrollador.`, 'error'
                );
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteClassroom = ( classroom_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_classroom = await fetchWithToken(
                `school/api/classroom/${classroom_id}/`, 
                {}, 
                'DELETE' 
            );
            const body_classroom = await resp_classroom.json();

            if ( body_classroom.ok ) {
                
                dispatch( deleteClassroom( classroom_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_classroom.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_classroom.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteClassrooms = ( classroom_keys, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_classroom = await fetchWithToken(
                'school/api/classroom/destroy-classrooms/', 
                {
                    classrooms: classroom_keys
                }, 
                'DELETE' 
            );
            const body_classroom = await resp_classroom.json();

            if ( body_classroom.ok ) {
                
                dispatch( deleteClassrooms( classroom_keys ) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_classroom.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_classroom.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveStudentsByClassroom = ( students_keys, classroom_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_classroom = await fetchWithToken( 
                `school/api/classroom/${classroom_id}/assign-students/`, 
                {
                    students: students_keys 
                }, 
                'POST'  
            );
            const body_classroom = await resp_classroom.json();
    
            if ( body_classroom.ok ) {
                
                dispatch( addNewStudentsByClassroom( students_keys )
                );
    
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_classroom.message, 
                    life: 4000 });
    
            } else {
                Swal.fire(
                    'Error', body_classroom.detail, 'error'
                ); 
            } 

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteStudentsByClassroom = ( classroom_id, students_keys, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_classroom = await fetchWithToken(
                `school/api/classroom/${classroom_id}/block-students/`, 
                {
                    students: students_keys
                }, 
                'DELETE' 
            );
            const body_classroom = await resp_classroom.json();

            if ( body_classroom.ok ) {
                
                dispatch( deleteClassroomDetail( students_keys ) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_classroom.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_classroom.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}
 
const setClassrooms = ( classrooms ) => ({
    type: types.classroomsList,
    payload: classrooms
});

export const startRemoveClassrooms = () => ({
    type: types.classroomsRemove
}); 

const startLoadingClassroom = () => ({
    type: types.classroomLoad
}); 

const endLoadingClassroom = () => ({
    type: types.classroomStop
});

const addNewClassroom = ( classroom ) => ({
    type: types.classroomNew,
    payload: classroom
});

const updateClassroom = ( classroom ) => ({
    type: types.classroomUpdate,
    payload: classroom
});

const deleteClassroom = ( classroom_id ) => ({
    type: types.classroomDelete,
    payload: classroom_id
});

const deleteClassrooms = ( classroom_keys ) => ({
    type: types.classroomsDelete,
    payload: classroom_keys
});

const setClassroomSchoolPeriods = ( school_periods ) => ({
    type: types.classroomSchoolPeriodList,
    payload: school_periods
});

export const startRemoveClassroomSchoolPeriods = () => ({
    type: types.classroomSchoolPeriodRemove
});

const setStudentsByClassroom = ( students ) => ({
    type: types.classroomDetailList,
    payload: students
});

export const startRemoveStudentsByClassroom = () => ({
    type: types.classroomDetailRemove
});

const addNewStudentsByClassroom = ( student_id ) => ({
    type: types.classroomDetailUpdate,
    payload: student_id
});

const deleteClassroomDetail = ( students_keys ) => ({
    type: types.classroomDetailDelete,
    payload: students_keys
});