import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { 
    getError, 
    getStudentData, 
    getStudentErrorMessage 
} from "../../helpers/admin";
import { 
    deletePerson, 
    deletePersons, 
    getPersonErrorMessage, 
    savePerson, 
    updatePerson 
} from "../../helpers/person";
import { 
    deleteUser, 
    deleteUsers, 
    getUserErrorMessage, 
    saveUser, 
    updateUser 
} from "../../helpers/user";
import { getToastMsg } from "../../helpers/abp";


export const startLoadStudents = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingStudent());
            const resp = await fetchWithToken( 'user/api/student/' );
            const body = await resp.json();
    
            if (body.ok) {
                dispatch(setStudents(body.conon_data));
                dispatch(endLoadingStudent());
            } else {
                Swal.fire('Error', body.detail, 'error');
                dispatch(endLoadingStudent());
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Administrador`, 'error'
            );
            dispatch(endLoadingStudent());
        }
    }
}

export const startSaveStudent = ( person, user, student, toast ) => {
    return async (dispatch) => {
        try {
            const body_person = await savePerson( person );

            if ( body_person.ok ) {
                const resp_student = await fetchWithToken( 
                    'user/api/student/', 
                    { ...student, person: body_person.id }, 
                    'POST'  
                );
                const body_student = await resp_student.json();
                if (body_student.ok) {
                    const body_user = await saveUser( user, body_person.id, 2 );
                    if ( body_user.ok ) {
                        dispatch( addNewStudent( getStudentData(
                            { ...person, ...user, ...student }, 
                            {
                                person_id: body_person.id,
                                student_id: body_student.id,
                                user_id: body_user.id
                            }
                        )) );
                        getToastMsg(toast, 'success', body_student.message );
                    } else if ( body_user.detail ) {
                        Swal.fire(
                            'Error', 
                            getError( body_user.detail, getUserErrorMessage ), 
                            'error'
                        );
                    } else {
                        Swal.fire(
                            'Error', 
                            getError( body_user.detail, getUserErrorMessage ),  
                            'error'
                        );
                    }
                } else if (body_student.detail){
                    Swal.fire(
                        'Error', 
                        getError( body_student.detail, getStudentErrorMessage ), 
                        'error'
                    );
                } else {
                    Swal.fire(
                        'Error', 
                        getError( body_student.detail, getStudentErrorMessage ),  
                        'error'
                    );
                }
            } else if ( body_person.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_person.detail, getPersonErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_person.detail, getPersonErrorMessage ),  
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

export const startUpdateStudent = ( data, student_keys, toast ) => {
    return async (dispatch) => {
        try {
            const body_person = await updatePerson( data, student_keys.person_id );
            
            if ( body_person.ok ) {
                const student = {
                    person: student_keys.person_id,
                    representative_name: data.representative_name,
                    expectations: {},
                    emergency_contact: data.emergency_contact,
                    observations: data.observations
                }
                const resp_student = await fetchWithToken( 
                    `user/api/student/${student_keys.student_id}/`, student, 'PUT'  
                );
                const body_student = await resp_student.json();
                if (body_student.ok) {
                    if ( student_keys.user_id === 0 ) {
                        dispatch( updateStudent( getStudentData(
                            data,
                            student_keys 
                        )) );
                        getToastMsg(
                            toast, 
                            'success', 
                            'Estudiante Actualizado Correctamente' 
                        );
                    } else {
                        const body_user = await updateUser( data, student_keys );        
                        if ( body_user.ok ) {
                            dispatch( updateStudent( getStudentData(
                                data,
                                student_keys 
                            )) );
                            getToastMsg(
                                toast, 
                                'success', 
                                'Estudiante Actualizado Correctamente' 
                            );
                        } else if (body_user.detail) {
                            Swal.fire(
                                'Error', 
                                getError( body_user.detail, getUserErrorMessage ), 
                                'error'
                            );
                        } else {
                            Swal.fire(
                                'Error', 
                                getError( body_user.detail, getUserErrorMessage ),  
                                'error'
                            );
                        }
                    } 
                } else if (body_student.detail) {
                    Swal.fire(
                        'Error', 
                        getError( body_student.detail, getStudentErrorMessage ), 
                        'error'
                    );
                } else {
                    Swal.fire(
                        'Error', 
                        getError( body_student.detail, getStudentErrorMessage ),  
                        'error'
                    );
                }
            } else if ( body_person.detail ) {
                    Swal.fire(
                        'Error', 
                        getError( body_person.detail, getPersonErrorMessage ), 
                        'error'
                    );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_person.detail, getPersonErrorMessage ),  
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

export const startDeleteStudent = ( student_keys, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_student = await fetchWithToken(
                `user/api/student/${student_keys.student_id}/`, {}, 'DELETE' 
            );
            const body_student = await resp_student.json();

            if (body_student.ok) {
                if (student_keys.user_id === 0) {
                    const body_person = await deletePerson( student_keys.person_id );
                    if ( body_person.ok ) {
                        dispatch( deleteStudent( student_keys.student_id ) );
                        getToastMsg(
                            toast, 
                            'success', 
                            'Estudiante Eliminado Correctamente' 
                        );
                    } else {
                        Swal.fire(
                            'Error', body_person.detail, 'error'
                        )
                    }
                } else {
                    const body_user = await deleteUser( student_keys.user_id );
                    if ( body_user.ok ) {
                        const body_person = await deletePerson( student_keys.person_id );
                        if ( body_person.ok ) {
                            dispatch( deleteStudent( student_keys.student_id ) );
                            getToastMsg( toast, 'success', body_student.message );
                        } else {
                            Swal.fire(
                                'Error', body_person.detail, 'error'
                            );
                        }
                    } else {
                        Swal.fire(
                            'Error', body_user.detail, 'error'
                        );
                    }
                }
            } else {
                Swal.fire(
                    'Error', body_student.detail, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteManyStudents = ( students_keys, toast ) => {
    return async ( dispatch, getState ) => {
        const { type } = getState().auth;
        if ( type === 0 ) {
            try {
                const resp_student = await fetchWithToken(
                    'user/api/student/destroy-students/', 
                    {
                        students: students_keys.students
                    }, 
                    'DELETE' 
                );
                const body_student = await resp_student.json();
    
                if ( body_student.ok ) {
                    const body_user = await deleteUsers( students_keys.users );
                    if ( body_user.ok ) {
                        const body_person = await deletePersons( students_keys.persons );
                        if ( body_person.ok ) {
                            dispatch( deleteStudents(students_keys.students) );
                            getToastMsg( toast, 'success', body_student.message );
                        } else {
                            Swal.fire(
                                'Error', body_person.detail, 'error'
                            );    
                        }
                    } else {
                        Swal.fire(
                            'Error', body_user.detail, 'error'
                        );         
                    }
                } else {
                    Swal.fire(
                        'Error', body_student.detail, 'error'
                    ); 
                }
                
            } catch (error) {
                Swal.fire(
                    'Error', `${error}, consulte con el Desarrollador.`, 'error'
                );
            }
        } else {
            Swal.fire(
                'Error', 
                'Usted no tiene los permisos necesarios para realizar la siguiente acción', 
                'error'
            );
        }
    }
}

const setStudents = (students) => ({
    type: types.studentList,
    payload: students
});

export const startRemoveStudents = () => ({
    type: types.studentRemove
});

const startLoadingStudent = () => ({
    type: types.studentLoad
});

const endLoadingStudent = () => ({
    type: types.studentStop
});

const addNewStudent = ( student ) => ({
    type: types.studentNew,
    payload: student
});

const updateStudent = ( student ) => ({
    type: types.studentUpdate,
    payload: student
});

const deleteStudent = ( student_id ) => ({
    type: types.studentDelete,
    payload: student_id
});

const deleteStudents = ( students ) => ({
    type: types.studentsDelete,
    payload: students
});
