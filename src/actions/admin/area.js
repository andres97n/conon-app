
import Swal from "sweetalert2";

import { types } from "../../types/types";
import { getToastMsg } from "../../helpers/abp";
import { fetchWithToken } from "../../helpers/fetch";
import { 
    getAreaData, 
    getAreaErrorMessage, 
    getError 
} from "../../helpers/admin";


export const startLoadAreas = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingArea() );
            const resp_area = await fetchWithToken( 'school/api/knowledge-area/' );
            const body_area = await resp_area.json();
    
            if (body_area.ok) {
                dispatch( setAreas( body_area.conon_data ) );
                dispatch( endLoadingArea() );
            } else {
                Swal.fire('Error', body_area.detail, 'error');
                dispatch( endLoadingArea() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingArea() );
        }
    }
}

export const startLoadTeachersByArea = ( area_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingArea() );
            let resp_area_teachers;
            if ( area_id ) {
                resp_area_teachers = await fetchWithToken( 
                    `school/api/knowledge-area/${area_id}/teachers/` 
                );
            } else {
                resp_area_teachers = await fetchWithToken( 
                    'school/api/knowledge-area/teachers/' 
                );
            }
            const body_area_teachers = await resp_area_teachers.json();

            if ( body_area_teachers.ok ) {
                if ( body_area_teachers.message ) {
                    dispatch( setTeachersByArea([]) );
                    dispatch( endLoadingArea() );
                } else {
                    dispatch( setTeachersByArea(body_area_teachers.conon_data) );
                    dispatch( endLoadingArea() );
                }
            } else {
                Swal.fire('Error', body_area_teachers.detail, 'error');
                dispatch( endLoadingArea() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingArea() );
        }
    }
}

export const startLoadNewTeacherForArea = ( area_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingArea() );
            const resp_area_teachers = await fetchWithToken( 
                `school/api/knowledge-area/${area_id}/new-teachers/` 
            );
            const body_area_teachers = await resp_area_teachers.json();

            if ( body_area_teachers.ok ) {
                if ( body_area_teachers.message ) {
                    dispatch( setTeachersByArea([]) );
                    dispatch( endLoadingArea() );
                } else {
                    dispatch( setTeachersByArea(body_area_teachers.conon_data) );
                    dispatch( endLoadingArea() );
                }
            } else {
                Swal.fire('Error', body_area_teachers.detail, 'error');
                dispatch( endLoadingArea() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingArea() );
        }
    }
}

export const startLoadCoordinators = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingArea() );
            const resp_coordinator = await fetchWithToken( 
                'user/api/teacher/get_coordinators/' 
            );
            const body_coordinator = await resp_coordinator.json();

            if ( body_coordinator.ok ) {
                dispatch( setCoordinators(body_coordinator.conon_data) );
                dispatch( endLoadingArea() );
            } else {
                Swal.fire('Error', body_coordinator.detail, 'error');
                dispatch( endLoadingArea() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingArea() );
        }
    }
}

export const startSaveArea = ( area, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_area = await fetchWithToken( 
                'school/api/knowledge-area/', 
                {
                    name: area.name,
                    coordinator: area.coordinator.id,
                    sub_coordinator: area.sub_coordinator.id,
                    type: area.type,
                    objective: area.objective,
                    observations: area.observations || 'S/N'
                }, 
                'POST'  
            );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {
                dispatch( addNewArea( getAreaData( area, body_area.id ) ));
                getToastMsg(toast, 'success', body_area.message );
            } else if ( body_area.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ),  
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

export const startUpdateArea = ( area, areaToUpdate, toast ) => {
    return async (dispatch) => {
        try {
            const resp_area = await fetchWithToken( 
                `school/api/knowledge-area/${area.id}/`, 
                areaToUpdate, 
                'PUT'  
            );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {
                dispatch( updateArea( area ));
                getToastMsg(
                    toast, 
                    'success',
                    'Área de Conocimiento Actualizada Correctamente'
                );
            } else if ( body_area.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ),  
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

export const startUpdateAreaWithTeachers = ( areaId, area, teacherId, data, toast ) => {
    return async (dispatch) => {
        try {
            const resp_area = await fetchWithToken( 
                `school/api/knowledge-area/${areaId}/`, area, 'PUT'  
            );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {
                dispatch( updateArea( getAreaData( 
                    { 
                        ...area, 
                        coordinator: data.coordinator,
                        sub_coordinator: data.sub_coordinator 
                    }, areaId 
                ) ));
                dispatch( deleteTeachersByArea(teacherId) );
                getToastMsg(
                    toast, 
                    'success',
                    'Área de Conocimiento Actualizada Correctamente'
                );
            } else if ( body_area.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ),  
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

export const startDeleteArea = ( area_id, toast ) => {
    return async (dispatch) => {
        try {
            const resp_area = await fetchWithToken(
                `school/api/knowledge-area/${area_id}/`, 
                {}, 
                'DELETE' );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {
                dispatch( deleteArea( area_id ) );
                getToastMsg(toast, 'success', body_area.message );
            } else if (body_area.detail) {
                Swal.fire(
                    'Error', body_area.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteManyAreas = ( area_keys, toast ) => {
    return async (dispatch) => {
        try {
            const resp_area = await fetchWithToken(
                'school/api/knowledge-area/destroy-areas/', 
                {
                    areas: area_keys
                }, 
                'DELETE' 
            );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {   
                dispatch( deleteAreas(area_keys) );
                getToastMsg(toast, 'success', body_area.message );
            } else {
                Swal.fire(
                    'Error', body_area.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
} 

export const startSaveTeachersToArea = ( teacher_keys, area_id, toast ) => {
    return async (dispatch) => {
        try {
            const resp_area = await fetchWithToken( 
                `school/api/knowledge-area/${area_id}/assign-teachers/`, 
                {
                    teachers: teacher_keys
                },
                'POST'  
            );
            const body_area = await resp_area.json();

            if ( body_area.ok ) {
                dispatch( updateTeachersByArea( teacher_keys ) );
                getToastMsg(toast, 'success', body_area.message );
            } else if ( body_area.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_area.detail, getAreaErrorMessage ),  
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

const setAreas = ( areas ) => ({
    type: types.areaList,
    payload: areas
});

export const startRemoveAreas = () => ({
    type: types.areaRemove
});

const startLoadingArea = () => ({
    type: types.areaLoad
});

const endLoadingArea = () => ({
    type: types.areaStop
});

const addNewArea = ( area ) => ({
    type: types.areaNew,
    payload: area
});

const updateArea = ( area ) => ({
    type: types.areaUpdate,
    payload: area
});

const deleteArea = ( area_id ) => ({
    type: types.areaDelete,
    payload: area_id
});

const deleteAreas = ( areas ) => ({
    type: types.areasDelete,
    payload: areas
});

const setCoordinators = ( coordinators ) => ({
    type: types.coordinatorList,
    payload: coordinators
});

export const startRemoveCoordinators = () => ({
    type: types.coordinatorRemove
});

const setTeachersByArea = ( teachers ) => ({
    type: types.areaTeacherList,
    payload: teachers
});

const updateTeachersByArea = ( teachers ) => ({
    type: types.areaTeacherUpdate,
    payload: teachers
});

const deleteTeachersByArea = ( teacherId ) => ({
    type: types.areaTeacherDelete,
    payload: teacherId
});

export const startRemoveTeachersByArea = () => ({
    type: types.areaTeacherRemove
});