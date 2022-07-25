import { DateTime } from "luxon";
import Swal from "sweetalert2";
import { getToastMsg } from "../../helpers/abp";

import { 
  getCommentErrorMessage, 
  getError, 
  getReplyErrorMessage
} from "../../helpers/admin";
import { fetchWithToken } from "../../helpers/fetch";
import { types } from "../../types/types";


export const startLoadGlossaries = () => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingComments() );
      const respComment = await fetchWithToken( 'topic/api/comment/' );
      const bodyComment = await respComment.json();

      if (bodyComment.ok) {
        dispatch( setComments( bodyComment.conon_data ));
        dispatch( endLoadingComments() );
      } else {
        Swal.fire('Error', bodyComment.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
} 

export const startLoadGlossariesByTopic = ( topicId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingComments() );
      const respComment = await fetchWithToken( `topic/api/comment/${topicId}/topic/` );
      const bodyComment = await respComment.json();

      if (bodyComment.ok) {
        dispatch( setComments( bodyComment.conon_data ));
        dispatch( endLoadingComments() );
      } else {
        Swal.fire('Error', bodyComment.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startLoadRepliesByComment = ( commentId ) => {
  return async (dispatch) => {
    try {
      dispatch( startLoadingReplies() );
      const respReply = await fetchWithToken( `topic/api/reply?comment=${commentId}` );
      const bodyReply = await respReply.json();

      if (bodyReply.ok) {
        dispatch( setReplies( bodyReply.conon_data ));
        dispatch( endLoadingReplies() );
      } else {
        Swal.fire('Error', bodyReply.detail, 'error');
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveComment = ( comment, reply, owner, toast ) => {
  return async (dispatch) => {
    try {
      const respComment = await fetchWithToken( 
        'topic/api/comment/', comment, 'POST'  
      );
      const bodyComment = await respComment.json();

      if ( bodyComment.ok ) {
        dispatch( addNewComment({ 
          ...comment, 
          id: bodyComment.id,
          owner: owner,
          created_at: new DateTime.now()
        }));
        dispatch( startSaveReply( 
          bodyComment.id, reply, owner, toast
        ));
      } else if ( bodyComment.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyComment.detail, getCommentErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', 
          getError( bodyComment.detail, getCommentErrorMessage ),  
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

export const startBlockComment = ( comment, toast ) => {
  return async (dispatch) => {
    try {
      const respComment = await fetchWithToken(
        `topic/api/comment/${comment.id}/block/`, {}, 'DELETE' 
      );
      const bodyComment = await respComment.json();

      if ( bodyComment.ok ) {
        dispatch( blockComment( comment ) );
        getToastMsg( toast, 'success', bodyComment.message );
      } else {
        Swal.fire(
          'Error', bodyComment.detail, 'error'
        );  
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startDeleteComment = ( commentId, toast ) => {
  return async (dispatch) => {
    try {
      const respComment = await fetchWithToken(
        `topic/api/comment/${commentId}/`, {}, 'DELETE' 
      );
      const bodyComment = await respComment.json();

      if ( bodyComment.ok ) {
        dispatch( deleteComment( commentId ) );
        getToastMsg( toast, 'success', bodyComment.message );
      } else {
        Swal.fire(
          'Error', bodyComment.detail, 'error'
        );  
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startSaveReply = ( commentId, reply, owner, toast ) => {
  return async (dispatch) => {
    try {
      const newReply = { ...reply, comment: commentId };
      const respReply = await fetchWithToken( 
        'topic/api/reply/', newReply, 'POST'  
      );
      const bodyReply = await respReply.json();

      if ( bodyReply.ok ) {
        dispatch( addNewReply({ 
          ...reply, 
          id: bodyReply.id,
          owner: owner,
          created_at: new DateTime.now()
        }));
        getToastMsg( toast, 'success', bodyReply.message );
      } else if ( bodyReply.detail ) {
        Swal.fire(
          'Error', 
          getError( bodyReply.detail, getReplyErrorMessage ), 
          'error'
        );
      } else {
        Swal.fire(
          'Error', 
          getError( bodyReply.detail, getReplyErrorMessage ),  
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

export const startBlockReply = ( reply, toast ) => {
  return async (dispatch) => {
    try {
      const respReply = await fetchWithToken(
        `topic/api/reply/${reply.id}/block/`, {}, 'DELETE' 
      );
      const bodyReply = await respReply.json();

      if ( bodyReply.ok ) {
        dispatch( blockReply( reply ) );
        getToastMsg( toast, 'success', bodyReply.message );
      } else {
        Swal.fire(
          'Error', bodyReply.detail, 'error'
        );  
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

export const startDeleteReply = ( replyId, toast ) => {
  return async (dispatch) => {
    try {
      const respReply = await fetchWithToken(
        `topic/api/reply/${replyId}/`, {}, 'DELETE' 
      );
      const bodyReply = await respReply.json();

      if ( bodyReply.ok ) {
        dispatch( deleteReply( replyId ) );
        getToastMsg( toast, 'success', bodyReply.message );
      } else {
        Swal.fire(
          'Error', bodyReply.detail, 'error'
        );  
      }

    } catch (error) {
      Swal.fire(
        'Error', `${error}, consulte con el Desarrollador.`, 'error'
      );
    }
  }
}

const startLoadingComments = () => ({
  type: types.commentLoad
}); 

const endLoadingComments = () => ({
  type: types.commentStop
});

const setComments = ( comments ) => ({
  type: types.commentList,
  payload: comments
});

export const startRemoveComments = () => ({
  type: types.commentRemove
});

const addNewComment = ( comment ) => ({
  type: types.commentNew,
  payload: comment
});

const blockComment = ( comment ) => ({
  type: types.commentBlock,
  payload: comment
});

const deleteComment = ( commentId ) => ({
  type: types.commentDelete,
  payload: commentId
});

const startLoadingReplies = () => ({
  type: types.replyLoad
}); 

const endLoadingReplies = () => ({
  type: types.replyStop
});

const setReplies = ( replies ) => ({
  type: types.replyList,
  payload: replies
});

export const startRemoveReplies = () => ({
  type: types.replyRemove
});

const addNewReply = ( reply ) => ({
  type: types.replyNew,
  payload: reply
});

const blockReply = ( reply ) => ({
  type: types.replyBlock,
  payload: reply
});

const deleteReply = ( replyId ) => ({
  type: types.replyDelete,
  payload: replyId
});
