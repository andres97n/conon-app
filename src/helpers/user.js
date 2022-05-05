import { fetchWithToken } from "./fetch";

export const getUserErrorMessage = ( detail ) => {
    console.log(detail);
    if ( detail.username ) {
        return detail.username[0]
    } else if ( detail.email ) {
        return detail.email[0]
    } else if ( detail.type ) {
        return detail.type[0]
    } else if ( detail.is_staff ) {
        return detail.is_staff[0]
    } else if ( detail.person ) {
        return detail.person[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }

}

export const saveUser = async ( data, person_id, type ) => {

    const user = {
        person: person_id,
        username: data.username,
        email: data.email,
        password: Math.random().toString(36).substr(2, 8),
        type: type
    }

    try {
        
        const resp_user = await fetchWithToken( 
            'user/api/users/', user, 'POST'  
        );
        return await resp_user.json();

    } catch (error) {
        return error;
    }

}

export const updateUser = async ( data, teacher_keys ) => {
    
    const user = {
        person: teacher_keys.person_id,
        username: data.username,
        email: data.email,
    }

    try {
        
        const resp_user = await fetchWithToken( 
            `user/api/users/${teacher_keys.user_id}/`, user, 'PUT'  
        );
        return await resp_user.json();

    } catch (error) {
        return error;
    }

}

export const deleteUser = async ( user_id ) => {

    try {
        
        const resp_user = await fetchWithToken(
            `user/api/users/${user_id}/`, 
            {}, 
            'DELETE' 
        );
        return await resp_user.json();

    } catch (error) {
        return error;
    }

}

export const deleteUsers = async ( users ) => {

    try {
        
        const resp_user = await fetchWithToken(
            'user/api/users/destroy-users/', 
            {
                users
            }, 
            'DELETE' 
        );
        return await resp_user.json();

    } catch (error) {
        return error;
    }

}
