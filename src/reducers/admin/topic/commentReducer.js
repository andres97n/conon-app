import { types } from "../../../types/types";

const inititalState = {
  comments: [],
  replies: [],
  loadingComment: false,
  loadingReply: false
};

export const commentReducer = ( state = inititalState, action ) => {
  switch (action.type) {
    case types.commentLoad:          
      return {
        ...state,
        loadingComment: true
      };

    case types.commentStop:          
      return {
        ...state,
        loadingComment: false
      };

    case types.commentList:          
      return {
        ...state,
        comments: [ ...action.payload ]
      };

    case types.commentRemove:
      return {
        ...state,
        comments: []
      };

    case types.commentNew:       
      return {
        ...state,
        comments: [ action.payload, ...state.comments ]
      };

    case types.commentBlock:          
      return {
        ...state,
        comments: state.comments.map(
          comment => comment.id === action.payload.id
            ? (action.payload)
            : (comment)
        )
      };
    
    case types.commentDelete:          
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        )
      };

    case types.replyLoad:          
      return {
        ...state,
        loadingReply: true
      };

    case types.replyStop:          
      return {
        ...state,
        loadingReply: false
      };

    case types.replyList:          
      return {
        ...state,
        replies: [ ...action.payload ]
      };

    case types.replyRemove:          
      return {
        ...state,
        replies: []
      };

    case types.replyNew:          
      return {
        ...state,
        replies: [ ...state.replies, action.payload ]
      };

    case types.replyBlock:          
      return {
        ...state,
        replies: state.replies.map(
          reply => reply.id === action.payload.id
            ? (action.payload)
            : (reply)
        )
      };
    
    case types.replyDelete:          
      return {
        ...state,
        replies: state.replies.filter(
          reply => reply.id !== action.payload
        )
      };

    default:
      return state;
  }
}