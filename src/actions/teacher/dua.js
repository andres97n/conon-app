import Swal from "sweetalert2";

import { fetchWithToken } from "../../helpers/fetch";
import { methodologyTypes } from "../../types/methodologyTypes";
import { changeDate, getError } from "../../helpers/admin";
import { getDuaData, getDuaErrorMessage } from "../../helpers/dua";
import { 
    setCurrentMethodology, 
    endLoadingCurrentMethodology, 
    startLoadingCurrentMethodology 
} from "../admin/topic";
import { getToastMsg } from "../../helpers/abp";

export const startLoadDuaList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingDua() );
            const resp_dua = await fetchWithToken( 'dua/api/dua/' );
            const body_dua = await resp_dua.json();
    
            if (body_dua.ok) {
                dispatch( setDuaList( changeDate(body_dua.conon_data)));
                dispatch( endLoadingDua() );
            } else {
                Swal.fire('Error', body_dua.detail, 'error');
                dispatch( endLoadingDua() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingDua() );
        }
    }
}

export const startLoadDuaByTopic = ( topicId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingCurrentMethodology() );
            const resp_dua = await fetchWithToken( `dua/api/dua?topic=${topicId}` );
            const body_dua = await resp_dua.json();
    
            if (body_dua.ok) {
                dispatch( setCurrentMethodology( body_dua.conon_data[0] ));
                dispatch( endLoadingCurrentMethodology() );
            } else {
                Swal.fire('Error', body_dua.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadDuaDetailList = ( duaId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingDua() );
            const resp_dua_detail = await fetchWithToken( 
                `dua/api/dua/${duaId}/students/` 
            );
            const body_dua_detail = await resp_dua_detail.json();
    
            if (body_dua_detail.ok) {
                dispatch( setDuaDetailList(body_dua_detail.conon_data));
                dispatch( endLoadingDua() );
            } else {
                Swal.fire('Error', body_dua_detail.detail, 'error');
                dispatch( endLoadingDua() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingDua() );
        }
    }
}

export const startLoadStudentEvaluation = ( topicId ) => {
    return async (dispatch, getState) => {
        try {
            const { auth } = getState();
            const { uid } = auth;
            dispatch( startLoadingCurrentMethodology() );
            const resp_dua_detail = await fetchWithToken( 
                `dua/api/path/dua/student-evaluation/${topicId}/${uid}/` 
            );
            const body_dua_detail = await resp_dua_detail.json();
    
            if (body_dua_detail.ok) {
                dispatch( setCurrentMethodology(body_dua_detail.conon_data));
                dispatch( endLoadingCurrentMethodology() );
            } else {
                Swal.fire('Error', body_dua_detail.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveDua = ( topicId, dua, toast ) => {
    return async ( dispatch ) => {
        try {
            const newDua = { ...dua, topic: topicId,  };
            const resp_dua = await fetchWithToken( 
                'dua/api/dua/', newDua, 'POST'  
            );
            const body_dua = await resp_dua.json();

            if ( body_dua.ok ) {

                dispatch( addNewDua(
                    { ...newDua, id: body_dua.id }
                ));
                getToastMsg(toast, 'success', body_dua.message );
                
            } else if ( body_dua.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_dua.detail, getDuaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_dua}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateDua = ( dua, duaId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_dua = await fetchWithToken( 
                `dua/api/dua/${duaId}/`, 
                {
                    topic: dua.topic,
                    written_conceptualization: dua.written_conceptualization,
                    oral_conceptualization: dua.oral_conceptualization,
                    example: dua.example,
                    images: dua.images,
                    observations: dua.observations || 'S/N'
                }, 
                'PUT'  
            );
            const body_dua = await resp_dua.json();

            if ( body_dua.ok ) {
                dispatch( updateDua( getDuaData( dua, duaId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Metodología DUA Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_dua.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_dua.detail, getDuaErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_dua}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteDua = ( duaId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_dua = await fetchWithToken(
                `dua/api/dua/${duaId}/`, 
                {}, 
                'DELETE' );
            const body_dua = await resp_dua.json();

            if ( body_dua.ok ) {
                dispatch( deleteDua( duaId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_dua.message, 
                    life: 4000 });

            } else if (body_dua.detail) {
                Swal.fire(
                    'Error', body_dua.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setDuaList = ( duaList ) => ({
    type: methodologyTypes.duaList,
    payload: duaList
});

export const startRemoveDuaList = () => ({
    type: methodologyTypes.duaRemove
});

const startLoadingDua = () => ({
    type: methodologyTypes.duaLoad
});

const endLoadingDua = () => ({
    type: methodologyTypes.duaStop
});

const addNewDua = ( dua ) => ({
    type: methodologyTypes.duaNew,
    payload: dua
});

const updateDua = ( dua ) => ({
    type: methodologyTypes.duaUpdate,
    payload: dua
});

const deleteDua = ( dua_id ) => ({
    type: methodologyTypes.duaDelete,
    payload: dua_id
});

// DUA DETAIL

const setDuaDetailList = ( duaDetailList ) => ({
    type: methodologyTypes.duaDetailList,
    payload: duaDetailList
});

export const startRemoveDuaDetailList = () => ({
    type: methodologyTypes.duaDetailRemove
});

export const startRemoveCurrentDua = () => ({
    type: methodologyTypes.currentDuaRemove
});

// const addNewDuaDetail = ( students ) => ({
//     type: methodologyTypes.duaDetailNew,
//     payload: students
// });

// // Reformar
// const updateDuaDetail = ( student ) => ({
//     type: methodologyTypes.studentActivityDetailUpdate,
//     payload: student
// });

// const deleteDuaDetail = ( students ) => ({
//     type: methodologyTypes.duaDetailDelete,
//     payload: students
// });