import Swal from "sweetalert2";

import { types } from "../../types/types";
import { changeDate, getError, getGlossaryData, getGlossaryDetailData, getGlossaryErrorMessage } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";

export const startLoadGlossaries = () => {
    return async (dispatch) => {
        try {
            
            dispatch( startLoadingGlossaries() );
            const resp_glossary = await fetchWithToken( 'school/api/glossary/' );
            const body_glossary = await resp_glossary.json();
    
            if (body_glossary.ok) {
                dispatch( setGlossaries( changeDate( body_glossary.conon_data )));
                dispatch( endLoadingGlossaries() );
            } else {
                Swal.fire('Error', body_glossary.detail, 'error');
                dispatch( endLoadingGlossaries() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingGlossaries() );
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
                dispatch( setGlossariesDetail( changeDate( body_glossary.conon_data )));
                dispatch( endLoadingGlossaries() );
            } else {
                Swal.fire('Error', body_glossary.detail, 'error');
                dispatch( endLoadingGlossaries() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
} 

export const startSaveGlossary = ( glossary, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_glossary = await fetchWithToken( 
                'school/api/glossary/', 
                {
                    
                }, 
                'POST'  
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                
                dispatch( addNewGlossary( 
                    getGlossaryData( glossary, body_glossary.id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_glossary.message, 
                    life: 4000 });

            } else if ( body_glossary.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_glossary.detail, getGlossaryErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_glossary}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startUpdateGlossary = ( glossary, glossary_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_glossary = await fetchWithToken( 
                `school/api/glossary/${glossary_id}/`, 
                {
                    asignature_classroom: glossary.asignature_classroom.id,
                    state: glossary.state
                }, 
                'PUT'  
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                
                dispatch( updateGlossary( 
                    getGlossaryData( glossary, glossary_id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Glosario Actualizado Correctamente', 
                    life: 4000 });
                
            } else if ( body_glossary.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_glossary.detail, getGlossaryErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_glossary}, consulte con el Desarrollador.`, 'error'
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
                `school/api/glossary/${glossary_id}/`, 
                {}, 
                'DELETE' 
            );
            const body_glossary = await resp_glossary.json();

            if ( body_glossary.ok ) {
                
                dispatch( deleteGlossary( glossary_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_glossary.message, 
                    life: 4000 });

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

export const startGlossaryDetailUpdate = ( 
    glossary_id, glossary_detail, glossary_detail_id, toast 
) => {
    return async (dispatch) => {
        try {
            
            const resp_glossary_detail = await fetchWithToken( 
                `school/api/glossary-detail/${glossary_detail_id}/`, 
                {
                    glossary: glossary_id,
                    title: glossary_detail.title,
                    description: glossary_detail.description,
                    image: glossary_detail.image,
                    url: glossary_detail.url,
                    state: glossary_detail.state,
                    observation: glossary_detail.observation
                }, 
                'PUT'  
            );
            const body_glossary_detail = await resp_glossary_detail.json();

            if ( body_glossary_detail.ok ) {
                
                dispatch( updateGlossaryDetail( 
                    getGlossaryDetailData( glossary_detail, glossary_detail_id ))
                );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Glosario Actualizado Correctamente', 
                    life: 4000 });
                
            } else if ( body_glossary_detail.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_glossary_detail.detail, getGlossaryErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_glossary_detail}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startDeleteGlossaryDetail = ( glossary_detail_id, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_glossary_detail = await fetchWithToken(
                `school/api/glossary-detail/${glossary_detail_id}/`, 
                {}, 
                'DELETE' 
            );
            const body_glossary_detail = await resp_glossary_detail.json();

            if ( body_glossary_detail.ok ) {
                
                dispatch( deleteGlossaryDetail( glossary_detail_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_glossary_detail.message, 
                    life: 4000 });

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

export const startDeleteGlossariesDetail = ( glossaries_detail_keys, toast ) => {
    return async (dispatch) => {
        try {
            
            const resp_glossary_detail = await fetchWithToken(
                'school/api/glossary-detail/destroy-terms/', 
                {
                    terms: glossaries_detail_keys
                }, 
                'DELETE' 
            );
            const body_glossary_detail = await resp_glossary_detail.json();

            if ( body_glossary_detail.ok ) {
                
                dispatch( deleteGlossariesDetail( glossaries_detail_keys ) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_glossary_detail.message, 
                    life: 4000 });

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

const updateGlossary = ( glossary ) => ({
    type: types.glossaryUpdate,
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

const updateGlossaryDetail = ( glossary_detail ) => ({
    type: types.glossaryDetailUpdate,
    payload: glossary_detail
});

const deleteGlossaryDetail = ( glossary_detail_id ) => ({
    type: types.glossaryDetailDelete,
    payload: glossary_detail_id
});

const deleteGlossariesDetail = ( glossaries_detail_keys ) => ({
    type: types.glossariesDetailDelete,
    payload: glossaries_detail_keys
});