import Swal from "sweetalert2";

import { methodologyTypes } from "../../types/methodologyTypes";
import { fetchWithToken } from "../../helpers/fetch";
import { changeDate, getError } from "../../helpers/admin";
import { getRubricAbpData, getRubricAbpDetailData, 
         getRubricAbpDetailErrorMessage, getRubricAbpErrorMessage, getRubricDetailsAbpWithRubricAbpId, getToastMsg 
} from "../../helpers/abp";

export const startLoadRubricAbpList = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRubricAbp() );
            const resp_rubric_abp = await fetchWithToken( 'abp/api/rubric-abp/' );
            const body_rubric_abp = await resp_rubric_abp.json();
    
            if (body_rubric_abp.ok) {
                dispatch( setRubricAbpList( changeDate(body_rubric_abp.conon_data)));
                dispatch( endLoadingRubricAbp() );
            } else {
                Swal.fire('Error', body_rubric_abp.detail, 'error');
                dispatch( endLoadingRubricAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingRubricAbp() );
        }
    }
}

export const startLoadRubricByAbp = ( abpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRubricAbp() );
            const resp_rubric_dua = await fetchWithToken( 
                `abp/api/rubric-abp?abp=${abpId}` 
            );
            const body_rubric_abp = await resp_rubric_dua.json();
    
            if (body_rubric_abp.ok) {
                if (body_rubric_abp.conon_data) {
                    dispatch( setRubricAbpList( body_rubric_abp.conon_data ));
                }
                dispatch( endLoadingRubricAbp() );
            } else {
                Swal.fire('Error', body_rubric_abp.detail, 'error');
                dispatch( endLoadingRubricAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingRubricAbp() );
        }
    }
}

export const startLoadCurrentRubricAbp = ( abpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRubricAbp() );
            const resp_rubric_dua = await fetchWithToken( 
                `abp/api/path/rubric-abp/rubric-abp-detail-by-abp/${abpId}/` 
            );
            const body_rubric_abp = await resp_rubric_dua.json();
    
            if (body_rubric_abp.ok) {
                if (body_rubric_abp.conon_data) {
                    dispatch( setRubricAbpDetailList( body_rubric_abp.conon_data ));
                }
                dispatch( endLoadingRubricAbp() );
            } else {
                Swal.fire('Error', body_rubric_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadCurrentRubricAbpByAbp = ( abpId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRubricAbp() );
            const resp_rubric_abp = await fetchWithToken( 
                `abp/api/path/rubric-abp/rubric-abp-with-detail/${abpId}/` 
            );
            const body_rubric_abp = await resp_rubric_abp.json();
    
            if (body_rubric_abp.ok) {
                if (body_rubric_abp.conon_data) {
                    dispatch( setRubricAbpDetailList( body_rubric_abp.conon_data ));
                }
                dispatch( endLoadingRubricAbp() );
            } else {
                Swal.fire('Error', body_rubric_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveRubricAbp = ( rubricAbp, rubricDetailsAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_rubric_abp = await fetchWithToken( 
                'abp/api/rubric-abp/', rubricAbp, 'POST'  
            );
            const body_rubric_abp = await resp_rubric_abp.json();

            if ( body_rubric_abp.ok ) {
                dispatch(addNewRubricAbp( 
                    { ...rubricAbp, id: body_rubric_abp.id }
                ));
                dispatch( startSaveRubricAbpDetail( 
                    body_rubric_abp.id, rubricDetailsAbp, body_rubric_abp.message, toast 
                 ));
                // getToastMsg(toast, 'success', body_rubric_abp.message );
            } else if ( body_rubric_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_rubric_abp.detail, getRubricAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_rubric_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateRubricAbp = ( rubricId, rubricAbp, toast ) => {
    return async (dispatch) => {
        try {
            const resp_rubric_abp = await fetchWithToken( 
                `abp/api/rubric-abp/${rubricId}/`, 
                {
                    abp: rubricAbp.abp,
                    description_rubric: rubricAbp.description_rubric,
                    abp_final_value: rubricAbp.abp_final_value,
                    state: rubricAbp.state || 1,
                    observations: rubricAbp.observations
                }, 
                'PUT'  
            );
            const body_rubric_abp = await resp_rubric_abp.json();

            if ( body_rubric_abp.ok ) {
                dispatch( updateRubricAbp( getRubricAbpData( rubricAbp, rubricId ) ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Rúbrica Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_rubric_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_rubric_abp.detail, getRubricAbpErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_rubric_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteRubricAbp = ( rubricAbpId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_rubric_abp = await fetchWithToken(
                `abp/api/rubric-abp/${rubricAbpId}/`, 
                {}, 
                'DELETE' );
            const body_rubric_abp = await resp_rubric_abp.json();

            if ( body_rubric_abp.ok ) {
                dispatch( deleteRubricAbp( rubricAbpId ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_rubric_abp.message, 
                    life: 4000 });

            } else if (body_rubric_abp.detail) {
                Swal.fire(
                    'Error', body_rubric_abp.detail, 'error'
                );  
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveRubricAbpDetail = ( rubricId, rubricDetail, msg, toast ) => {
    return async ( dispatch ) => {
        try {
            const newRubricDetailsAc = getRubricDetailsAbpWithRubricAbpId(
                rubricDetail, rubricId 
            );
            const resp_rubric_abp = await fetchWithToken( 
                'abp/api/rubric-detail-abp/', newRubricDetailsAc, 'POST'  
            );
            const body_rubric_abp = await resp_rubric_abp.json();

            if ( body_rubric_abp.ok ) {
                dispatch( addNewRubricAbpDetail( body_rubric_abp.rubric_detail_abp ));
                getToastMsg(toast, 'success', msg );
            } else if ( body_rubric_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_rubric_abp.detail, getRubricAbpDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_rubric_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startUpdateRubricAbpDetail = ( rubricDetailId, rubricAbpDetail, toast ) => {
    return async (dispatch) => {
        try {
            const resp_rubric_abp = await fetchWithToken( 
                `abp/api/rubric-detail-abp/${rubricDetailId}/`, 
                {
                    rubric_abp: rubricAbpDetail.rubric_abp,
                    title_detail: rubricAbpDetail.title_detail,
                    description_detail: rubricAbpDetail.description_detail,
                    grade_percentage: rubricAbpDetail.grade_percentage,
                    rating_value: rubricAbpDetail.rating_value,
                    active: rubricAbpDetail.active || true,
                    observations_detail: rubricAbpDetail.observations_detail
                }, 
                'PUT'  
            );
            const body_rubric_abp = await resp_rubric_abp.json();

            if ( body_rubric_abp.ok ) {
                dispatch( updateRubricAbpDetail( 
                    getRubricAbpDetailData( rubricAbpDetail, rubricDetailId ) 
                ));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Sección Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_rubric_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_rubric_abp.detail, getRubricAbpDetailErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_rubric_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setRubricAbpList = ( rubricsAbp ) => ({
    type: methodologyTypes.rubricAbpList,
    payload: rubricsAbp
});

export const startRemoveRubricAbpList = () => ({
    type: methodologyTypes.rubricAbpRemove
});

const startLoadingRubricAbp = () => ({
    type: methodologyTypes.rubricAbpLoad
});

const endLoadingRubricAbp = () => ({
    type: methodologyTypes.rubricAbpStop
});

const addNewRubricAbp = ( rubricAbp ) => ({
    type: methodologyTypes.rubricAbpNew,
    payload: rubricAbp
});

const updateRubricAbp = ( rubricAbp ) => ({
    type: methodologyTypes.rubricAbpUpdate,
    payload: rubricAbp
});

const deleteRubricAbp = ( rubricTeamId ) => ({
    type: methodologyTypes.rubricAbpDelete,
    payload: rubricTeamId
});

const setRubricAbpDetailList = ( rubricDetailList ) => ({
    type: methodologyTypes.rubricDetailAbpList,
    payload: rubricDetailList
});

export const startRemoveRubricAbpDetailList = () => ({
    type: methodologyTypes.rubricDetailAbpRemove
});

const addNewRubricAbpDetail = ( rubricAbpDetail ) => ({
    type: methodologyTypes.rubricDetailAbpNew,
    payload: rubricAbpDetail
});

const updateRubricAbpDetail = ( rubricAbpDetail ) => ({
    type: methodologyTypes.rubricDetailAbpUpdate,
    payload: rubricAbpDetail 
});
