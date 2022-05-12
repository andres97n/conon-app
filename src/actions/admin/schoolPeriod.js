import Swal from "sweetalert2";

import { types } from "../../types/types";
import { getDate, getError, getSchoolPeriodData, getSchoolPeriodErrorMessage } from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { startSetCurrentSchoolPeriod } from "../ui";


export const startLoadSchoolPeriods = ( active ) => {
    return async (dispatch) => {

        try {
            
            dispatch( startLoadingSchoolPeriod() );
            let resp_school_period;
            if ( active ) {
                resp_school_period = await fetchWithToken( 'school/api/school-period/active/' );  
            } else {
                resp_school_period = await fetchWithToken( 'school/api/school-period/' );
            }
            const body_school_period = await resp_school_period.json();
    
            if (body_school_period.ok) {
                dispatch( setSchoolPeriods( body_school_period.conon_data ));
                dispatch( endLoadingSchoolPeriod() );
            } else {
                Swal.fire('Error', body_school_period.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );  
        }

    }
}

export const startSaveSchoolPeriod = ( schoolPeriod, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_school_period = await fetchWithToken( 
                'school/api/school-period/', 
                {
                    name: schoolPeriod.name,
                    init_date: getDate(schoolPeriod.init_date, 'YYYY-MM-DD'),
                    end_date: getDate(schoolPeriod.end_date, 'YYYY-MM-DD'),
                    school_end_date: getDate(schoolPeriod.school_end_date, 'YYYY-MM-DD'),
                    observations: schoolPeriod.observations || 'S/N',
                    state: 1
                }, 
                'POST'  
            );
            const body_school_period = await resp_school_period.json();

            if ( body_school_period.ok ) {

                dispatch( addNewSchoolPeriod( getSchoolPeriodData( schoolPeriod, body_school_period.id ) ));
                dispatch( startSetCurrentSchoolPeriod() );
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_school_period.message, 
                    life: 4000 });
                
            } else if ( body_school_period.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_school_period.detail, getSchoolPeriodErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_school_period}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );  
        }

    }
}

export const startUpdateSchoolPeriod = ( schoolPeriod, school_period_id, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_school_period = await fetchWithToken( 
                `school/api/school-period/${school_period_id}/`, 
                {
                    name: schoolPeriod.name,
                    init_date: getDate(schoolPeriod.init_date, 'YYYY-MM-DD'),
                    end_date: getDate(schoolPeriod.end_date, 'YYYY-MM-DD'),
                    school_end_date: getDate(schoolPeriod.school_end_date, 'YYYY-MM-DD'),
                    observations: schoolPeriod.observations
                }, 
                'PUT'  
            );
            const body_school_period = await resp_school_period.json();

            if ( body_school_period.ok ) {

                dispatch( updateSchoolPeriod( 
                    getSchoolPeriodData( schoolPeriod, school_period_id ) 
                    ));

                toast.current.show({
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: 'Área de Conocimiento Actualizada Correctamente', 
                    life: 4000 });
                
            } else if ( body_school_period.detail ) {
                Swal.fire(
                    'Error', 
                    getError( body_school_period.detail, getSchoolPeriodErrorMessage ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_school_period}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            ); 
        }

    }
}

export const startDeleteSchoolPeriod = ( school_period_id, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_school_period = await fetchWithToken(
                `school/api/school-period/${school_period_id}/`, 
                {}, 
                'DELETE' );
            const body_school_period = await resp_school_period.json();

            if ( body_school_period.ok ) {
                
                dispatch( deleteSchoolPeriod( school_period_id ) );
            
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_school_period.message, 
                    life: 4000 });

            } else if (body_school_period.detail) {
                Swal.fire(
                    'Error', body_school_period.detail, 'error'
                );  
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            ); 
        }

    }
}

export const startDeleteSchoolPeriods = ( school_periods_keys, toast ) => {
    return async (dispatch) => {

        try {
            
            const resp_school_period = await fetchWithToken(
                'school/api/school-period/destroys-periods/', 
                {
                    school_periods: school_periods_keys
                }, 
                'DELETE' 
            );
            const body_school_period = await resp_school_period.json();

            if ( body_school_period.ok ) {
                
                dispatch( deleteSchoolPeriods(school_periods_keys) );

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_school_period.message, 
                    life: 4000 });

            } else {
                Swal.fire(
                    'Error', body_school_period.detail, 'error'
                ); 
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            ); 
        }

    }
}

const setSchoolPeriods = ( schoolPeriods ) => ({
    type: types.schoolPeriodsList,
    payload: schoolPeriods
});

export const startRemoveSchoolPeriods = () => ({
    type: types.schoolPeriodsRemove
});

const startLoadingSchoolPeriod = () => ({
    type: types.schoolPeriodLoad
});

const endLoadingSchoolPeriod = () => ({
    type: types.schoolPeriodStop
});

const addNewSchoolPeriod = ( schoolPeriod ) => ({
    type: types.schoolPeriodNew,
    payload: schoolPeriod
});

const updateSchoolPeriod = ( schoolPeriod ) => ({
    type: types.schoolPeriodUpdate,
    payload: schoolPeriod
});

const deleteSchoolPeriod = ( school_period_id ) => ({
    type: types.schoolPeriodDelete,
    payload: school_period_id
});

const deleteSchoolPeriods = ( school_periods ) => ({
    type: types.schoolPeriodsDelete,
    payload: school_periods
});