import Swal from "sweetalert2";
import { DateTime } from "luxon";

import { types } from "../../types/types";
import { fetchWithToken } from "../../helpers/fetch";
import { 
  endLoadingUi, 
  setMessagesCount, 
  startLoadingUi 
} from "../ui";
import {  
  getConversationDetailErrorMessage, 
  getConversationErrorMessage, 
} from "../../helpers/conversation/conversationDb";
import { getError } from "../../helpers/admin";
import { getToastMsg } from "../../helpers/abp";


export const startLoadConversationList = ( userId, search ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingConversation() );
      let resp_conversation; 
      if (search) {
        resp_conversation = await fetchWithToken( 
          `user/api/path/conversation/user-conversations/${userId}/${search}/` 
        );
      } else {
        resp_conversation = await fetchWithToken( 
          `user/api/path/conversation/user-conversations/${userId}/''/` 
        );
      }
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setConversationList(
          body_conversation.conon_data
        ));
        dispatch( endLoadingConversation() );
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadConversationCount = ( userId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingUi() );
      const resp_conversation = await fetchWithToken( 
        `user/api/path/conversation/user-messages-count/${userId}/` 
      );
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setMessagesCount(
          body_conversation.conon_data
        ));
        dispatch( endLoadingUi() );
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadConversationDetailList = ( conversationId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingConversationDetail() );
      const resp_conversation = await fetchWithToken( 
        `user/api/conversation-detail?conversation=${conversationId}&blocked=${false}` 
      );
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setConversationDetailList(
          body_conversation.conon_data
        ));
        dispatch( endLoadingConversationDetail() );
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadConversationUsersListByStudent = ( schoolPeriodId ) => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const { uid } = auth; 
      dispatch( startLoadingConversation() );
      const resp_conversation = await fetchWithToken( 
        `user/api/path/student/student-conversation/${uid}/${schoolPeriodId}/` 
        // `user/api/path/student/student-conversation/27/${schoolPeriodId}/` 
      );
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setConversationUsersList(
          body_conversation.conon_data
        ));
        dispatch( endLoadingConversation() );
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadConversationUsersListByTeacher = ( schoolPeriodId ) => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const { uid } = auth; 
      const resp_conversation = await fetchWithToken( 
        `user/api/path/conversation/available-user-conversation/${uid}/${schoolPeriodId}/` 
        // `user/api/path/teacher/teacher-conversation/${userId}/${schoolPeriodId}/` 
        // `user/api/path/student/student-conversation/27/${schoolPeriodId}/` 
      );
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setConversationUsersList(
          body_conversation.conon_data
        ));
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadCurrentConversationUsersList = () => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const { uid } = auth; 
      dispatch( startLoadingConversation() );
      const resp_conversation = await fetchWithToken( 
        `user/api/path/conversation/user-current-conversation/${uid}/` 
      );
      const body_conversation = await resp_conversation.json();

      if (body_conversation.ok) {
        dispatch( setConversationList(
          body_conversation.conon_data
        ));
        dispatch( endLoadingConversation() );
      } else {
        Swal.fire('Error', body_conversation.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveConversation = ( conversation, conversationDetail, secondUser) => {
  return async ( dispatch, getState ) => {
    try {
      const { auth } = getState();
      const { name } = auth; 
      const resp_conversation = await fetchWithToken( 
        'user/api/conversation/', conversation, 'POST'  
      );
      const body_conversation = await resp_conversation.json();

      if ( body_conversation.ok ) {
        const newConversation = { 
          ...conversation,
          id: body_conversation.id,
          first_user: {
            id: conversation.first_user,
            name
          },
          second_user: secondUser,
          created_at: new DateTime.now(),
          updated_at: new DateTime.now(),
        };  
        dispatch( addNewConversation( newConversation ));
        dispatch( setCurrentConversation( newConversation ) );
        dispatch( startSaveConversationDetail( 
          body_conversation.id, conversationDetail
        ));
      } else if ( body_conversation.detail ) {
        Swal.fire(
          'Error',
          getError( body_conversation.detail, getConversationErrorMessage ),
          'error'
        );
      } else {
        Swal.fire(
          'Error', 
          `${body_conversation}, consulte con el Desarrollador.`, 
          'error'
        );
        }
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockConversation = ( conversationId, toast ) => {
  return async (dispatch) => {
    try {
      const resp_conversation = await fetchWithToken( 
        `user/api/conversation/${conversationId}/block/`, {}, 'DELETE'  
      );
      const body_conversation = await resp_conversation.json();

      if ( body_conversation.ok ) {
        dispatch( blockConversation( conversationId ));
        getToastMsg( toast, 'success', body_conversation.message );                
      } else if ( body_conversation.detail ) {
        Swal.fire( 'Error', body_conversation.detail, 'error' );
      } 
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveConversationDetail = ( conversationId, conversationDetail ) => {
  return async ( dispatch ) => {
    try {
      const newConversationDetail = { ...conversationDetail, conversation: conversationId }
      const resp_conversation = await fetchWithToken( 
        'user/api/conversation-detail/', newConversationDetail, 'POST'  
      );
      const body_conversation = await resp_conversation.json();

      if ( body_conversation.ok ) {
        dispatch( addNewConversationDetail( 
          { 
            id: body_conversation.id, 
            created_at: DateTime.now().toISO(),
            updated_at: DateTime.now().toISO(),
            ...newConversationDetail 
          }
        ));
        // getToastMsg(toast, 'success', body_conversation.message );
      } else if ( body_conversation.detail ) {
        Swal.fire(
          'Error',
          getError( 
            body_conversation.detail, 
            getConversationDetailErrorMessage 
          ),
          'error'
        );
      } else {
        Swal.fire(
          'Error', 
          `${body_conversation}, consulte con el Desarrollador.`, 
          'error'
        );
      }
    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador`, 'error'
      );
    }
  }
}

export const startBlockConversationDetail = ( conversationDetailId, toast ) => {
  return async (dispatch) => {
    try {
      const resp_conversation = await fetchWithToken( 
        `user/api/conversation-detail/${conversationDetailId}/block/`, 
        {}, 
        'DELETE'  
      );
      const body_conversation = await resp_conversation.json();

      if ( body_conversation.ok ) {
        dispatch( blockConversationDetail( conversationDetailId ));
        getToastMsg( toast, 'success', body_conversation.message );                
      } else if ( body_conversation.detail ) {
        Swal.fire(
          'Error', 
          body_conversation.detail, 
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

const startLoadingConversation = () => ({
  type: types.conversationLoad
});

const endLoadingConversation = () => ({
  type: types.conversationStop
});

const setConversationList = ( conversationsList ) => ({
  type: types.conversationsList,
  payload: conversationsList
});

export const startRemoveConversationList = () => ({
  type: types.conversationsRemove
}); 

const addNewConversation = ( conversation ) => ({
  type: types.conversationNew,
  payload: conversation
});

const blockConversation = ( conversationId ) => ({
  type: types.conversationBlock,
  payload: conversationId
});

const startLoadingConversationDetail = () => ({
  type: types.conversationDetailLoad
});

const endLoadingConversationDetail = () => ({
  type: types.conversationDetailStop
});

const setConversationDetailList = ( conversationDetailList ) => ({
  type: types.conversationDetailList,
  payload: conversationDetailList
});

export const startRemoveConversationDetailList = () => ({
  type: types.conversationDetailRemove
}); 

const addNewConversationDetail = ( conversationDetail ) => ({
  type: types.conversationDetailNew,
  payload: conversationDetail
});

const blockConversationDetail = ( conversationDetailId ) => ({
  type: types.conversationDetailBlock,
  payload: conversationDetailId
});

const setConversationUsersList = ( usersList ) => ({
  type: types.conversationUsersList,
  payload: usersList
});

export const startRemoveConversationUsers = () => ({
  type: types.conversationUsersRemove
});

export const setCurrentConversation = ( conversation ) => ({
  type: types.currentConversationGet,
  payload: conversation
});

export const startRemoveCurrentConversation = () => ({
  type: types.currentConversationRemove
});