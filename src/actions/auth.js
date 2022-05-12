import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken, reloadToken } from "../helpers/fetch"
import { 
    endLoadingUi, 
    removeSchoolPeriod, 
    startLoadingUi, 
    startSetCurrentSchoolPeriod, 
    startSetUiUser
} from "./ui";
import { startLoadTopicsListByStudent, startRemoveTopics } from "./admin/topic";
import { startLoadConversationCount } from "./admin/conversation";
// import { startLoadAdminData, startLoadStudentData, startLoadTeacherData } from "./dashboard";

export const startLogin = ( username, password ) => {
    return async( dispatch ) => {
        try {
            dispatch( startLoadingUi() );
            const resp = await fetchWithoutToken( 
                'login', 
                {
                    username,
                    password
                },
                'POST'
            )
            const body = await resp.json();
    
            if ( !body.detail ) {
                localStorage.setItem('a_token', body.conon_data.tokens.access);
                localStorage.setItem('r_token', body.conon_data.tokens.refresh);
    
                dispatch( login({
                    uid: body.conon_data.uid,
                    name: body.conon_data.name,
                    username: body.conon_data.username,
                    email: body.conon_data.email,
                    type: body.conon_data.type,
                }));
                // if ( body.conon_data.type === 0 ) {
                //     // dispatch( startLoadAdminData() );
                //     localStorage.setItem('dashboardReducer', 'admin');
                // } else if ( body.conon_data.type === 1) {
                // window.location.reload();
                //     // dispatch( startLoadTeacherData() );
                //     localStorage.setItem('dashboardReducer', 'teacher');
                // } else if ( body.conon_data.type === 2 ) {
                //     // dispatch( startLoadStudentData() );
                //     localStorage.setItem('dashboardReducer', 'student');
                // }
    
                dispatch(startSetCurrentSchoolPeriod());
                if (body.conon_data.type === 1 || body.conon_data.type === 2) {
                    dispatch( startLoadConversationCount(body.conon_data.uid) );
                    // if (body.conon_data.type === 2) {
                    //     dispatch(startLoadTopicsListByStudent(body.conon_data.uid));
                    // }
                } 
                
                
            } else{
                Swal.fire(
                    'Aviso de CONON',
                    body.detail,
                    'error'
                );
                dispatch( endLoadingUi() );
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Administrador.`, 'error'
            ); 
            dispatch( endLoadingUi() );
        }
    }

}

export const startLogout = () => {
    return async ( dispatch, getState ) => {

        const { auth } = getState();
        await reloadToken();
        const resp_logout = await fetchWithToken(
            'logout/',
            {
                refresh: localStorage.getItem('r_token') 
            },
            'POST'
        );
        if (resp_logout.status === 204) {
            localStorage.clear();
            if (auth.type === 1 || auth.type === 2) {
                dispatch( removeSchoolPeriod() );
                if (auth.type === 2) {
                    dispatch( startRemoveTopics() );
                }
            }
            dispatch( logout() );
            // window.location.reload();

        } else {
            dispatch( checkingFinish() );
        }
        
    }
}

export const startChecking = () => {
    return async( dispatch ) => {
        try {
            dispatch( startLoadingUi() );
            const refresh_token = localStorage.getItem('r_token') || '';
            const resp = await fetchWithoutToken(
                'token/refresh',
                {
                    refresh: refresh_token
                },
                'POST'
            )
            const body = await resp.json();
    
            if ( body.ok ) {
                localStorage.setItem('a_token', body.conon_data.tokens.access);
                localStorage.setItem('r_token', body.conon_data.tokens.refresh);
                dispatch( login({
                    uid: body.conon_data.uid,
                    name: body.conon_data.name,
                    username: body.conon_data.username,
                    email: body.conon_data.email,
                    type: body.conon_data.type,
                }) );

                // if ( body.conon_data.type === 0 ) {
                //     // dispatch( startLoadAdminData() );
                //     localStorage.setItem('dashboardReducer', 'admin');
                // } else if ( body.conon_data.type === 1) {
                // window.location.reload();
                //     // dispatch( startLoadTeacherData() );
                //     localStorage.setItem('dashboardReducer', 'teacher');
                // } else if ( body.conon_data.type === 2 ) {
                //     // dispatch( startLoadStudentData() );
                //     localStorage.setItem('dashboardReducer', 'student');
                // }
                if (body.conon_data.type === 2) {
                    dispatch(startLoadTopicsListByStudent(body.conon_data.uid));
                }
                
            } else {
                dispatch( checkingFinish() );
                dispatch( endLoadingUi() );
            }
            
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Administrador.`, 'error'
            ); 
            dispatch( endLoadingUi() );
        }
    }

}

export const validateUsername = ( username ) => {
    return async( dispatch ) => {
        try {
            const resp_auth = await fetchWithoutToken( 
                `auth/username/${username}` 
            );
            const body_auth = await resp_auth.json();
    
            if (body_auth.ok) {
                dispatch( startSetIsUsernameValid() );
                dispatch( startSetUiUser( body_auth.conon_data ) );
            } else {
                Swal.fire('Error', body_auth.detail, 'error');
            }
    
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Administrador.`, 'error'
            );
            return false;
        }
    }
}

export const startChangeUserPassword = ( userId, newPasswords ) => {
    return async( dispatch ) => {
        try {
            const resp_auth = await fetchWithoutToken( 
                `auth/password/${userId}`, newPasswords, 'POST' 
            );
            const body_auth = await resp_auth.json();
    
            if (body_auth.ok) {
                Swal.fire('Mensaje', body_auth.message, 'success');
            } else {
                Swal.fire('Error', body_auth.detail, 'error');
            }
    
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Administrador.`, 'error'
            );
            return false;
        }
    }
}

const checkingFinish = () => ({ type: types.checkingFinish });

const login = ( user ) => ({
    type: types.login,
    payload: user
});

export const logout = () => ({ type: types.logout});

const startSetIsUsernameValid = () => ({
    type: types.setIsUsernameValid
});

export const startClearIsUsernameValid = () => ({
    type: types.clearIsUsernameValid
});