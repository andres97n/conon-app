import Swal from "sweetalert2";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { getToastMsg } from "../../helpers/abp";
import { getError } from "../../helpers/admin";
import { getUserErrorMessage } from "../../helpers/user";


export const startLoadAdminsList = () => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingAdmin() );
      const respAdmin = await fetchWithToken( 
        'user/api/users/admins/' 
      );
      const bodyAdmin = await respAdmin.json();

      if (bodyAdmin.ok) {
        dispatch( setAdmins( bodyAdmin.conon_data ));
        dispatch( endLoadingAdmin() );
      } else {
        Swal.fire('Error', bodyAdmin.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveAdmin = ( user, name, toast ) => {
  return async ( dispatch ) => {
    try {
      const respUser = await fetchWithToken( 
        'user/api/users/', user, 'POST'  
      );
      const bodyUser = await respUser.json();

      if ( bodyUser.ok ) {
        dispatch( addNewAdmin(
          { ...user, id: bodyUser.id, person: {id: user.person, name} }
        ));
        getToastMsg(toast, 'success', bodyUser.message );
      } else if ( bodyUser.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyUser.detail, 
            getUserErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire( 'Error', getError( bodyUser, getUserErrorMessage ), 'error' );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startUpdateAdmin = ( userToFetch, user, toast ) => {
  return async ( dispatch ) => {
    try {
      const respUser = await fetchWithToken( 
        `user/api/users/${user.id}/`, userToFetch, 'PUT'  
      );
      const bodyUser = await respUser.json();

      if ( bodyUser.ok ) {
        dispatch( updateAdmin( user ));
        getToastMsg(toast, 'success', 'Usuario Editado Correctamente' );
      } else if ( bodyUser.detail ) {
        Swal.fire(
          'Error', 
          getError( 
            bodyUser.detail, 
            getUserErrorMessage 
          ), 
          'error'
        );
      } else {
        Swal.fire( 'Error', getError( bodyUser, getUserErrorMessage ), 'error' );
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startDeleteStudent = ( adminId, toast ) => {
  return async ( dispatch ) => {
    try {
      const respAdmin = await fetchWithToken(
        `user/api/users/${adminId}/`, {}, 'DELETE' 
      );
      const bodyAdmin = await respAdmin.json();

      if (bodyAdmin.ok) {
        dispatch( deleteAdmin( adminId ) );
        getToastMsg(toast, 'success', bodyAdmin.message );
      } else {
        Swal.fire(
          'Error', bodyAdmin.detail, 'error'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const setAdmins = ( admins ) => ({
  type: types.adminList,
  payload: admins
});

export const startRemoveAdmins = () => ({
  type: types.adminRemove
});

const startLoadingAdmin = () => ({
  type: types.adminLoad
});

const endLoadingAdmin = () => ({
  type: types.adminStop
});

const addNewAdmin = ( admin ) => ({
  type: types.adminNew,
  payload: admin
});

const updateAdmin = ( admin ) => ({
  type: types.adminUpdate,
  payload: admin
});

const deleteAdmin = ( adminId ) => ({
  type: types.adminDelete,
  payload: adminId
});
