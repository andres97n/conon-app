import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { getError, getTeacherData, getTeacherErrorMessage } from "../../helpers/admin";
import { deletePerson, deletePersons, getPersonErrorMessage, savePerson, updatePerson } from "../../helpers/person";
import { deleteUser, deleteUsers, getUserErrorMessage, saveUser, updateUser } from "../../helpers/user";

export const startLoadTeachers = ( short ) => {
    return async ( dispatch ) => {

        try {
            dispatch( startLoadingTeacher() );
            let resp;
            if ( short ) {
                resp = await fetchWithToken( 'user/api/teacher/short/' );
            } else {
                resp = await fetchWithToken( 'user/api/teacher/' );
            }
            const body = await resp.json();
            
            if ( body.ok ) {
                dispatch(setTeachers(body.conon_data));
                dispatch(endLoadingTeacher());

            } else {
                Swal.fire('Error', body.detail, 'error');
                dispatch(endLoadingTeacher());
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
        
    }
} 

export const startSaveTeacher = ( data, toast ) => {
    return async (dispatch) => {

        try {

            const body_person = await savePerson( data );
            
            if ( body_person.ok ) {
    
                const teacher = {
                    person: body_person.id,
                    title: data.title,
                    objective: data.objective || 'S/N'
                }
                    
                const resp_teacher = await fetchWithToken( 
                    'user/api/teacher/', teacher, 'POST'  
                );
                const body_teacher = await resp_teacher.json();
                
                if (body_teacher.ok) {

                    const body_user = await saveUser( data, body_person.id, 1 );

                    if ( body_user.ok ) {

                        dispatch( addNewTeacher( getTeacherData(
                            data, 
                            {
                                person_id: body_person.id,
                                teacher_id: body_teacher.id,
                                user_id: body_user.id
                            }
                        )) );

                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: body_teacher.message, 
                            life: 4000 });
                        
                    } else if ( body_user.detail ) {
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

                } else if (body_teacher.detail){
                    Swal.fire(
                        'Error', 
                        getError( body_teacher.detail, getTeacherErrorMessage ), 
                        'error'
                    );
                } else {
                    Swal.fire(
                        'Error', `${body_teacher}, consulte con el Desarrollador.`, 'error'
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

export const startUpdateTeacher = ( data, teacher_keys, toast ) => {
    return async (dispatch) => {

        try {
            
            const body_person = await updatePerson( data, teacher_keys.person_id );

            if ( body_person.ok ) {
    
                const teacher = {
                    person: teacher_keys.person_id,
                    title: data.title,
                    objective: data.objective
                }
                    
                const resp_teacher = await fetchWithToken( 
                    `user/api/teacher/${teacher_keys.teacher_id}/`, teacher, 'PUT'  
                );
                const body_teacher = await resp_teacher.json();
                
                if (body_teacher.ok) {

                    if ( teacher_keys.user_id === 0 ) {

                        dispatch( updateTeacher( getTeacherData(
                            data,
                            teacher_keys 
                        )) );

                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: 'Docente Actualizado Correctamente', 
                            life: 4000 });

                    } else {
                        
                        const body_user = await updateUser( data, teacher_keys );        
    
                        if ( body_user.ok ) {
    
                            dispatch( updateTeacher( getTeacherData(
                                data,
                                teacher_keys 
                            )) );
    
                            toast.current.show({ 
                                severity: 'success', 
                                summary: 'Conon Informa', 
                                detail: 'Docente Actualizado Correctamente', 
                                life: 4000 });
                            
                        } else if ( body_user.detail ) {
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

                } else if (body_teacher.detail) {
                    Swal.fire(
                        'Error', 
                        getError( body_teacher.detail, getTeacherErrorMessage ), 
                        'error'
                    );
                } else {
                    Swal.fire(
                        'Error', `${body_teacher}, consulte con el Desarrollador.`, 'error'
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

export const startDeleteTeacher = ( teacher_keys, toast ) => {
    return async ( dispatch ) => {

        try {
            
            const resp_teacher = await fetchWithToken(
                `user/api/teacher/${teacher_keys.teacher_id}/`, 
                {}, 
                'DELETE' 
            );
            const body_teacher = await resp_teacher.json();

            if (body_teacher.ok) {
                
                const body_person = await deletePerson( teacher_keys.person_id );

                if ( body_person.ok ) {

                    if (teacher_keys.user_id === 0) {
                        dispatch( deleteTeacher( teacher_keys.teacher_id ) );
        
                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: 'Docente Eliminado Correctamente', 
                            life: 4000 });

                    } else {
            
                        const body_user = await deleteUser( teacher_keys.user_id );
    
                        if ( body_user.ok ) {
                            
                            dispatch( deleteTeacher( teacher_keys.teacher_id ) );
            
                            toast.current.show({ 
                                severity: 'success', 
                                summary: 'Conon Informa', 
                                detail: 'Docente Eliminado Correctamente', 
                                life: 4000 });
                            
                        } else {
                            Swal.fire(
                                'Error', body_user.detail, 'error'
                            );    
                        }
                    }

                } else {
                    Swal.fire(
                        'Error', body_person.detail, 'error'
                    );
                }

            } else {
                Swal.fire(
                    'Error', body_teacher.detail, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

export const startDeleteManyTeachers = ( teachers_keys, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_teacher = await fetchWithToken(
                'user/api/teacher/destroy-teachers/', 
                {
                    teachers: teachers_keys.teachers
                }, 
                'DELETE' 
            );
            const body_teacher = await resp_teacher.json();

            if ( body_teacher.ok ) {
                
                const body_person = await deletePersons( teachers_keys.persons );

                if ( body_person.ok ) {
                    
                    const body_user = await deleteUsers( teachers_keys.users );

                    if ( body_user.ok ) {
                        
                        dispatch( deleteTeachers(teachers_keys.teachers) );

                        toast.current.show({ 
                            severity: 'success', 
                            summary: 'Conon Informa', 
                            detail: 'Docentes Eliminados Correctamente', 
                            life: 4000 });

                    } else {
                        Swal.fire(
                            'Error', body_user.detail, 'error'
                        );      
                    }

                } else {
                    Swal.fire(
                        'Error', body_person.detail, 'error'
                    );  
                }

            } else {
                Swal.fire(
                    'Error', body_teacher.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

const setTeachers = ( teachers ) => ({
    type: types.teacherList,
    payload: teachers
});

export const startRemoveTeachers = () => ({
    type: types.teacherRemove
});

const startLoadingTeacher = () => ({
    type: types.teacherLoad
});

const endLoadingTeacher = () => ({
    type: types.teacherStop
});

const addNewTeacher = ( teacher ) => ({
    type: types.teacherNew,
    payload: teacher
});

const updateTeacher = ( teacher ) => ({
    type: types.teacherUpdate,
    payload: teacher
});

const deleteTeacher = ( teacher_id ) => ({
    type: types.teacherDelete,
    payload: teacher_id
});

const deleteTeachers = ( teachers ) => ({
    type: types.teachersDelete,
    payload: teachers
});