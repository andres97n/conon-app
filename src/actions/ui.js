import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";


export const startError = () => {
    return (dispatch) => {

    }
}

export const startSetCurrentSchoolPeriod = () => {
    return async( dispatch ) => {
        try {
            dispatch( startLoadingUi() );
            const resp_school_period = await fetchWithToken(
                'school/api/school-period?state=1'
            );  
            const body_school_period = await resp_school_period.json(); 
    
            if ( body_school_period.ok ) {
                dispatch( setSchoolPeriod(
                    {
                        id: body_school_period.conon_data[0].id,
                        name: body_school_period.conon_data[0].name,
                    }
                ) );
                // localStorage.setItem('currentPeriod', {
                //     id: body_school_period.conon_data[0].id,
                //     name: body_school_period.conon_data[0].name,
                // });
                localStorage.setItem(
                    'currentPeriodId', 
                    body_school_period.conon_data[0].id
                );
                localStorage.setItem(
                    'currentPeriodName', body_school_period.conon_data[0].name
                );
                dispatch( endLoadingUi() );
            }
        } catch (error) {
            console.log('No se pudo encontrar el presente Período Lectivo');
            dispatch( endLoadingUi() );
        }
    }
}

export const startSetSpeedDialItem = ( item ) => {
    return ( dispatch ) => {
        try {
            dispatch( setSpeedDialList(item) );
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const setError = () => ({
    type: types.newError
});

export const removeError = () => ({
    type: types.removeError
});

export const setMessage = ( message ) => ({
    type: types.newMessage,
    payload: message
});

export const removeMessage = () => ({
    type: types.removeMessage
});

export const setSchoolPeriod = ( schoolPeriod ) => ({
    type: types.setSchoolPeriod,
    payload: schoolPeriod
});

export const removeSchoolPeriod = () => ({
    type: types.removeSchoolPeriod
});

export const startLoadingUi = () => ({
    type: types.uiLoad
}); 

export const endLoadingUi = () => ({
    type: types.uiStop
});

export const setMessagesCount = ( count ) => ({
    type: types.uiMessagesList,
    payload: count
});

export const removeMessagesCount = () => ({
    type: types.uiMessagesRemove
});

const setSpeedDialList = ( item ) => ({
    type: types.uiSpeedDialList,
    payload: item
});

export const startRemoveSpeedDialList = () => ({
    type: types.uiSpeedDialRemove
});

export const startSetUiUser = ( user ) => ({
    type: types.uiSetChangeUserPass,
    payload: user
});

export const startRemoveUiUser = () => ({
    type: types.uiRemoveChangeUserPass
});