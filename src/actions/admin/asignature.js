import Swal from "sweetalert2";

import { types } from "../../types/types";
import { changeDate, getAsignatureData, getAsignatureDetailData, getAsignatureDetailErrorMessage, getAsignatureErrorMessage, getError } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";

export const startLoadAsignatures = ( active ) => {
    return async (dispatch) => {

        try {
            
            dispatch( startLoadingAsignature() );
            let resp_asignature;
            if ( active ) {
                resp_asignature = await fetchWithToken( 'school/api/asignature/active/' );
            } else {
                resp_asignature = await fetchWithToken( 'school/api/asignature/' );
            }
            const body_asignature = await resp_asignature.json();
    
            if (body_asignature.ok) {
                dispatch( setAsignatures( changeDate( body_asignature.conon_data )));
                dispatch( endLoadingAsignature() );
            } else {
                Swal.fire('Error', body_asignature.detail, 'error');
                dispatch( endLoadingAsignature() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() );
        }

    }
}

export const startLoadAsignatureAreas = () => {
    return async (dispatch) => {

        try {
            
            dispatch( startLoadingAsignature() );
            const resp_areas = await fetchWithToken( 'school/api/knowledge-area/asignature/' );
            const body_areas = await resp_areas.json();
    
            if (body_areas.ok) {
                dispatch( setAsignatureAreas( body_areas.conon_data ));
                dispatch( endLoadingAsignature() );
            } else {
                Swal.fire('Error', body_areas.detail, 'error');
                dispatch( endLoadingAsignature() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() );
        }

    }
}

export const startLoadClasroomForAsignatures = ( asignature_id ) => {
    return async (dispatch) => {
        try {
        
            const resp_asignature = await fetchWithToken( 
                `school/api/asignature/${asignature_id}/classrooms/` 
            );
            const body_asignature = await resp_asignature.json();

            if (body_asignature.ok) {
                dispatch( setAsignatureClassrooms( body_asignature.conon_data ));
            } else {
                Swal.fire('Error', body_asignature.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadTeachersForAsignatures = ( asignature_id ) => {
    return async (dispatch) => {
        try {
        
            const resp_asignature = await fetchWithToken( 
                `school/api/asignature/${asignature_id}/teachers/` 
            );
            const body_asignature = await resp_asignature.json();

            if (body_asignature.ok) {
                dispatch( setAsignatureTeachers( body_asignature.conon_data ));
            } else {
                Swal.fire('Error', body_asignature.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadAsignaturesDetailByAsignature = ( asignature_id ) => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingAsignature() );
            const resp_asignature_detail = await fetchWithToken( 
                // `school/api/asignature-classroom/${asignature_id}/by-asignatures/` 
                `school/api/asignature-classroom?asignature=${asignature_id}&state=1` 
            );
            const body_asignature_detail = await resp_asignature_detail.json();
    
            if (body_asignature_detail.ok) {
                dispatch( setAsignaturesDetail( changeDate( body_asignature_detail.conon_data )));
                dispatch( endLoadingAsignature() );
            } else {
                Swal.fire('Error', body_asignature_detail.detail, 'error');
                dispatch( endLoadingAsignature() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() )
        }
    }
}

export const startLoadAsignaturesDetail = () => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingAsignature() );
            const resp_asignature_detail = await fetchWithToken( 
                'school/api/asignature-classroom?state=1' 
            );
            const body_asignature_detail = await resp_asignature_detail.json();
    
            if (body_asignature_detail.ok) {
                dispatch( setAsignaturesDetail( changeDate( body_asignature_detail.conon_data )));
                dispatch( endLoadingAsignature() );
            } else {
                Swal.fire('Error', body_asignature_detail.detail, 'error');
                dispatch( endLoadingAsignature() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() );
        }
    }
}

export const startLoadAsignaturesDetailByClassroom = ( classroom_id ) => {
    return async (dispatch) => {
        try {

            if ( classroom_id ) {
                dispatch( startLoadingAsignature() );
                const resp_asignature_detail = await fetchWithToken( 
                        `school/api/asignature-classroom?classroom=${classroom_id}`
                    );
                const body_asignature_detail = await resp_asignature_detail.json();
        
                if (body_asignature_detail.ok) {
                    dispatch( setAsignaturesDetail( changeDate( body_asignature_detail.conon_data )));
                    dispatch( endLoadingAsignature() );
                } else {
                    Swal.fire('Error', body_asignature_detail.detail, 'error');
                    dispatch( endLoadingAsignature() );
                }
            } else {
                dispatch( setAsignaturesDetail([]));
            }
            

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() );
        }
    }
}

export const startLoadAsignatureDetailByClassroomAndUser = ( classroom_id, user_id ) => {
    return async (dispatch) => {
        try {
            
            if ( classroom_id && user_id ) {
                dispatch( startLoadingAsignature() );
                const resp_asignature_detail = await fetchWithToken( 
                        'school/api/asignature-classroom/by-classroom-and-user/',
                        {
                            user: user_id,
                            classroom: classroom_id
                        },
                        'POST'
                    );
                const body_asignature_detail = await resp_asignature_detail.json();
        
                if (body_asignature_detail.ok) {
                    dispatch( setAsignaturesDetail( changeDate( body_asignature_detail.conon_data )));
                    dispatch( endLoadingAsignature() );
                } else {
                    Swal.fire('Error', body_asignature_detail.detail, 'error');
                    dispatch( endLoadingAsignature() );
                }
            } else {
                dispatch( setAsignaturesDetail([]));
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingAsignature() );
        }
    }
}

export const startSaveAsignature = ( asignature, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_asignature = await fetchWithToken( 
                'school/api/asignature/', 
                {
                    name: asignature.name,
                    knowledge_area: asignature.knowledge_area.id,
                    objective: asignature.objective,
                    observations: asignature.observations || 'S/N'
                }, 
                'POST'  
            );
            const body_asignature = await resp_asignature.json();

            if ( body_asignature.ok ) {
                
                dispatch( addNewAsignature( 
                    getAsignatureData( asignature, body_asignature.id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_asignature.message, 
                    life: 4000 });

            } else if ( body_asignature.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_asignature.detail, getAsignatureErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_asignature}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

export const startUpdateAsignature = ( asignature, asignature_id, toast ) => {
    return async (dispatch) => {

        try {
            const resp_asignature = await fetchWithToken( 
                `school/api/asignature/${asignature_id}/`, 
                {
                    name: asignature.name,
                    knowledge_area: asignature.knowledge_area.id,
                    objective: asignature.objective,
                    observations: asignature.observations
                }, 
                'PUT'  
            );
            const body_asignature = await resp_asignature.json();

            if ( body_asignature.ok ) {
                
                dispatch( updateAsignature( 
                    getAsignatureData( asignature, asignature_id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Asignatura Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_asignature.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_asignature.detail, getAsignatureErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_asignature}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
} 

export const startDeleteAsignature = ( asignature_id, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_asignature = await fetchWithToken(
                `school/api/asignature/${asignature_id}/`, 
                {}, 
                'DELETE' 
            );
            const body_asignature = await resp_asignature.json();

            if ( body_asignature.ok ) {
                
                dispatch( deleteAsignature( asignature_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_asignature.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_asignature.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

export const startDeleteAsignatures = ( asignature_keys, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_asignature = await fetchWithToken(
                'school/api/asignature/destroy-asignatures/', 
                {
                    asignatures: asignature_keys
                }, 
                'DELETE' 
            );
            const body_asignature = await resp_asignature.json();

            if ( body_asignature.ok ) {
                
                dispatch( deleteAsignatures(asignature_keys) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_asignature.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_asignature.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }

    }
}

export const startSaveAsignatureDetail = ( asignature_detail, asignature_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_asignature_detail = await fetchWithToken( 
                'school/api/asignature-classroom/', 
                {
                    classroom: asignature_detail.classroom.id,
                    asignature: asignature_id,
                    teacher: asignature_detail.teacher.id,
                    observations: asignature_detail.observations || 'S/N'
                }, 
                'POST'  
            );
            const body_asignature_detail = await resp_asignature_detail.json();

            if ( body_asignature_detail.ok ) {
                
                dispatch( addNewAsignatureDetail( 
                    getAsignatureDetailData( asignature_detail, body_asignature_detail.id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_asignature_detail.message, 
                    life: 4000 });

            } else if ( body_asignature_detail.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_asignature_detail.detail, getAsignatureDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_asignature_detail}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startBlockAsignatureDetail = ( asignature_detail_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_asignature_detail = await fetchWithToken(
                `school/api/asignature-classroom/${asignature_detail_id}/block-asignature-classroom/`, 
                {}, 
                'DELETE' 
            );
            const body_asignature_detail = await resp_asignature_detail.json();

            if ( body_asignature_detail.ok ) {
                
                dispatch( deleteAsignatureDetail( asignature_detail_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_asignature_detail.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_asignature_detail.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setAsignatures = ( asignatures ) => ({
    type: types.asignaturesList,
    payload: asignatures
});

export const startRemoveAsignatures = () => ({
    type: types.asignatureRemove
}); 

const startLoadingAsignature = () => ({
    type: types.asignatureLoad
}); 

const endLoadingAsignature = () => ({
    type: types.asignatureStop
});

const addNewAsignature = ( asignature ) => ({
    type: types.asignatureNew,
    payload: asignature
});

const updateAsignature = ( asignature ) => ({
    type: types.asignatureUpdate,
    payload: asignature
});

const deleteAsignature = ( asignature_id ) => ({
    type: types.asignatureDelete,
    payload: asignature_id
});

const deleteAsignatures = ( asignature_keys ) => ({
    type: types.asignaturesDelete,
    payload: asignature_keys
});

const setAsignatureAreas = ( areas ) => ({
    type: types.asignatureAreaList,
    payload: areas
});

export const startRemoveAsignatureAreas = () => ({
    type: types.asignatureAreaRemove
});

const setAsignatureClassrooms = ( classrooms ) => ({
    type: types.asignatureClassroomList,
    payload: classrooms
});

export const startRemoveAsignatureClassrooms = () => ({
    type: types.asignatureClassroomRemove
});

const setAsignatureTeachers = ( teachers ) => ({
    type: types.asignatureTeacherList,
    payload: teachers
});

export const startRemoveAsignatureTeachers = () => ({
    type: types.asignatureTeacherRemove
});

const setAsignaturesDetail = ( asignatures_detail ) => ({
    type: types.asignaturesDetailList,
    payload: asignatures_detail
});

export const startRemoveAsignaturesDetail = () => ({
    type: types.asignaturesDetailRemove
});

const addNewAsignatureDetail = ( asignature_detail ) => ({
    type: types.asignatureDetailNew,
    payload: asignature_detail
});

const deleteAsignatureDetail = ( asignature_detail_id ) => ({
    type: types.asignatureDetailDelete,
    payload: asignature_detail_id
});

