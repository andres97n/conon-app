import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { getError, getStudentData, getStudentErrorMessage } from "../../helpers/admin";
import { deletePerson, deletePersons, getPersonErrorMessage, savePerson, updatePerson } from "../../helpers/person";
import { deleteUser, deleteUsers, getUserErrorMessage, saveUser, updateUser } from "../../helpers/user";

// TODO: Revisar los métodos de retornar de error y verificar si retornan lo esperado

// TODO: Desarrollar una manera para que las tablas persona, estudiante y usuario borren sus
//  datos si ocurre algún error

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

export const startSaveStudent = ( data, toast ) => {
    return async (dispatch) => {

        try {
            
            const body_person = await savePerson( data );

            if ( body_person.ok ) {
    
                const student = {
                    person: body_person.id,
                    representative_name: data.representative_name,
                    emergency_contact: data.emergency_contact,
                    expectations: {},
                    observations: data.observations || 'S/N'
                }

                const resp_student = await fetchWithToken( 
                    'user/api/student/', student, 'POST'  
                );
                const body_student = await resp_student.json();

                if (body_student.ok) {

                    const body_user = await saveUser( data, body_person.id, 2 );

                    if ( body_user.ok ) {

                        dispatch( addNewStudent( getStudentData(
                            data, 
                            {
                                person_id: body_person.id,
                                student_id: body_student.id,
                                user_id: body_user.id
                            }
                        )) );

                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: body_student.message, 
                            life: 4000 });

                    } else if ( body_user.detail ) {
                        Swal.fire(
                            'Error', 
                            getError( body_user.detail, getUserErrorMessage ), 
                            'error'
                        );
                    } else {
                        Swal.fire(
                            'Error', `${body_user}, consulte con el Administrador.`, 'error'
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
                        'Error', `${body_student}, consulte con el Desarrollador.`, 'error'
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
                    'Error', `${body_person}, consulte con el Desarrollador.`, 'error'
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

                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: 'Estudiante Actualizado Correctamente', 
                            life: 4000 });

                    } else {
                        
                        const body_user = await updateUser( data, student_keys );        
    
                        if ( body_user.ok ) {

                            dispatch( updateStudent( getStudentData(
                                data,
                                student_keys 
                            )) );
    
                            toast.current.show({ 
                                severity: 'success', 
                                summary: 'Conon Informa', 
                                detail: 'Estudiante Actualizado Correctamente', 
                                life: 4000 });

                        } else if (body_user.detail) {
                            Swal.fire(
                                'Error', 
                                getError( body_user.detail, getUserErrorMessage ), 
                                'error'
                            );
                        } else {
                            Swal.fire(
                                'Error', `${body_user}, consulte con el Desarrollador.`, 'error'
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
                        'Error', `${body_student}, consulte con el Desarrollador.`, 'error'
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
                    'Error', `${body_person}, consulte con el Desarrollador.`, 'error'
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
            
            const resp_student = await fetchWithToken(`user/api/student/${student_keys.student_id}/`, {}, 'DELETE' );
            const body_student = await resp_student.json();

            if (body_student.ok) {

                if (student_keys.user_id === 0) {

                    const body_person = await deletePerson( student_keys.person_id );

                    if ( body_person.ok ) {

                        dispatch( deleteStudent( student_keys.student_id ) );
        
                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: 'Estudiante Eliminado Correctamente.', 
                            life: 4000 
                        });

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
            
                            toast.current.show({ 
                                severity: 'success', 
                                summary: 'Conon Informa', 
                                detail: body_student.message, 
                                life: 4000 
                            });

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
    
                            toast.current.show({ 
                                severity: 'success', 
                                summary: 'Conon Informa', 
                                detail: body_student.message, 
                                life: 4000 });
    
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
