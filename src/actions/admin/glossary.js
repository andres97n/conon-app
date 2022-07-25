import Swal from "sweetalert2";

import { types } from "../../types/types";
import { 
    getError, 
    getGlossaryDetailErrorMessage, 
    getGlossaryErrorMessage 
} from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { getToastMsg } from "../../helpers/abp";


export const startLoadGlossaries = () => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingGlossaries() );
            const resp_glossary = await fetchWithToken( 'school/api/glossary/' );
            const body_glossary = await resp_glossary.json();
    
            if (body_glossary.ok) {
                dispatch( setGlossaries( body_glossary.conon_data ));
                dispatch( endLoadingGlossaries() );
            } else {
                Swal.fire('Error', body_glossary.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
} 

export const startLoadGlossariesDetail = ( glossary_id ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingGlossaries() );
            const resp_glossary = await fetchWithToken( 
                `school/api/glossary-detail?glossary=${glossary_id}` 
            );
            const body_glossary = await resp_glossary.json();
    
            if (body_glossary.ok) {
                dispatch( setGlossariesDetail( body_glossary.conon_data ));
                dispatch( endLoadingGlossaries() );
            } else {
                Swal.fire('Error', body_glossary.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startLoadGlossaryWithDetails = ( classroomId, active ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingGlossaries() );
            let resp_glossary = null;
            if (active) {
                resp_glossary = await fetchWithToken( 
                    `school/api/path/glossary/detail/${classroomId}/${2}/` 
                );
            } else {
                resp_glossary = await fetchWithToken( 
                    `school/api/path/glossary/detail/${classroomId}/${1}/` 
                );
            }
            const body_glossary = await resp_glossary.json();
    
            if (body_glossary.ok) {
                dispatch( setCurrentGlossary( body_glossary.conon_data ));
                dispatch( endLoadingGlossaries() );
            } else {
                Swal.fire('Error', body_glossary.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveGlossary = ( glossary, glossaryDetail, owner, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary = await fetchWithToken( 
                'school/api/glossary/', glossary, 'POST'  
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                dispatch( addNewGlossary({ ...glossary, id: body_glossary.id }));
                dispatch( startSaveGlossaryDetail( 
                    body_glossary.id, glossaryDetail, owner, toast
                ));
            } else if ( body_glossary.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_glossary.detail, getGlossaryErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( body_glossary.detail, getGlossaryErrorMessage ),  
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

export const startBlockGlossary = ( glossaryId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary = await fetchWithToken(
                `school/api/glossary/${glossaryId}/block/`, {}, 'DELETE' 
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                dispatch( deleteGlossary( glossaryId ) );
                getToastMsg( toast, 'success', body_glossary.message );
            } else {
                Swal.fire(
                    'Error', body_glossary.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteGlossary = ( glossary_id, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary = await fetchWithToken(
                `school/api/glossary/${glossary_id}/`, {}, 'DELETE' 
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                dispatch( deleteGlossary( glossary_id ) );
                getToastMsg( toast, 'success', body_glossary.message );
            } else {
                Swal.fire(
                    'Error', body_glossary.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveGlossaryDetail = ( glossaryId, glossaryDetail, owner, toast ) => {
    return async (dispatch) => {
        try {
            const newGlossaryDetail = { glossary: glossaryId, ...glossaryDetail };
            const resp_glossary = await fetchWithToken( 
                'school/api/glossary-detail/', newGlossaryDetail, 'POST'  
            );
            const body_glossary_detail = await resp_glossary.json();

            if ( body_glossary_detail.ok ) {
                dispatch( addNewGlossaryDetail({ 
                    ...newGlossaryDetail, 
                    id: body_glossary_detail.id,
                    owner
                }));
                getToastMsg( toast, 'success', body_glossary_detail.message );
            } else if ( body_glossary_detail.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_glossary_detail.detail, 
                        getGlossaryDetailErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_glossary_detail.detail, 
                        getGlossaryDetailErrorMessage 
                    ), 
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

export const startBlockGlossaryDetail = ( glossary, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary = await fetchWithToken(
                `school/api/glossary-detail/${glossary.id}/block/`, {}, 'DELETE' 
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                dispatch( blockGlossaryDetail( glossary ) );
                getToastMsg( toast, 'success', body_glossary.message );
            } else {
                Swal.fire(
                    'Error', body_glossary.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startBlockGlossaryDetailByStudent = ( glossaryId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary = await fetchWithToken(
                `school/api/glossary-detail/${glossaryId}/block/`, {}, 'DELETE' 
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                dispatch( blockGlossaryDetailByStudent( glossaryId ) );
                getToastMsg( toast, 'success', body_glossary.message );
            } else {
                Swal.fire(
                    'Error', body_glossary.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteGlossaryDetail = ( termId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary_detail = await fetchWithToken(
                `school/api/glossary-detail/${termId}/`, 
                {}, 
                'DELETE' 
            );
            const body_glossary_detail = await resp_glossary_detail.json();

            if ( body_glossary_detail.ok ) {
                dispatch( deleteGlossaryDetail( termId ) );
                getToastMsg( toast, 'success', body_glossary_detail.message );
            } else {
                Swal.fire(
                    'Error', body_glossary_detail.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteGlossariesDetail = ( glossariesDetailKeys, toast ) => {
    return async (dispatch) => {
        try {
            const resp_glossary_detail = await fetchWithToken(
                'school/api/glossary-detail/destroy-terms/', 
                {
                    terms: glossariesDetailKeys
                }, 
                'DELETE' 
            );
            const body_glossary_detail = await resp_glossary_detail.json();

            if ( body_glossary_detail.ok ) {
                dispatch( deleteGlossariesDetail( glossariesDetailKeys ) );
                getToastMsg( toast, 'success', body_glossary_detail.message );
            } else {
                Swal.fire(
                    'Error', body_glossary_detail.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

const setGlossaries = ( glossaries ) => ({
    type: types.glossariesList,
    payload: glossaries
});

export const startRemoveGlossaries = () => ({
    type: types.glossariesRemove
});

const startLoadingGlossaries = () => ({
    type: types.glossaryLoad
}); 

const endLoadingGlossaries = () => ({
    type: types.glossaryStop
});

const addNewGlossary = ( glossary ) => ({
    type: types.glossaryNew,
    payload: glossary
});

const deleteGlossary = ( glossary_id ) => ({
    type: types.glossaryDelete,
    payload: glossary_id
});

const setGlossariesDetail = ( glossaries_detail ) => ({
    type: types.glossariesDetailList,
    payload: glossaries_detail
});

export const startRemoveGlossariesDetail = () => ({
    type: types.glossariesDetailRemove
});

const addNewGlossaryDetail = ( glossaryDetail ) => ({
    type: types.glossariesDetailNew,
    payload: glossaryDetail
});

const blockGlossaryDetail = ( glossaryDetail ) => ({
    type: types.glossaryDetailBlock,
    payload: glossaryDetail
});

const blockGlossaryDetailByStudent = ( glossaryDetailId ) => ({
    type: types.glossaryDetailBlockByStudent,
    payload: glossaryDetailId
});

const deleteGlossaryDetail = ( glossary_detail_id ) => ({
    type: types.glossaryDetailDelete,
    payload: glossary_detail_id
});

const deleteGlossariesDetail = ( glossaries_detail_keys ) => ({
    type: types.glossariesDetailDelete,
    payload: glossaries_detail_keys
});

const setCurrentGlossary = ( glossary ) => ({
    type: types.currentGlossaryList,
    payload: glossary
});

export const startRemoveCurrentGlossary = () => ({
    type: types.currentGlossaryRemove
});