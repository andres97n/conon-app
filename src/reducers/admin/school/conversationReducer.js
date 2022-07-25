import { types } from "../../../types/types";

const initialState = {
  conversations: [],
  conversationDetail: [],
  searchUsersList: [],
  currentConversation: {},
  loadingConversations: false,
  loadingMessages: false
}

export const conversationReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.conversationLoad:
      return {
        ...state,
        loadingConversations: true
      }

    case types.conversationStop:
      return {
        ...state,
        loadingConversations: false
      }

    case types.conversationsList:
      return {
        ...state,
        conversations: [ ...action.payload ]
      }

    case types.conversationsRemove:
      return {
        ...state,
        conversations: []
      }

    case types.conversationNew:
      return {
        ...state,
        conversations: [ action.payload, ...state.conversations ]
      }

    case types.conversationBlock:
      return {
        ...state,
        conversations: state.conversations.filter( 
          conversation => conversation.id !== action.payload
        )
      }

    case types.conversationDetailLoad:
      return {
        ...state,
        loadingMessages: true 
      }

    case types.conversationDetailStop:
      return {
        ...state,
        loadingMessages: false
      }

    case types.conversationDetailList:
      return {
        ...state,
        conversationDetail: [ ...action.payload ]
      }

    case types.conversationDetailRemove:
      return {
        ...state,
        conversationDetail: []
      }

    case types.conversationDetailNew:
      return {
        ...state,
        conversationDetail: [ ...state.conversationDetail, action.payload ]
      }

    case types.conversationDetailBlock:
      return {
        ...state,
        conversationDetail: state.conversationDetail.filter(
          message => message.id !== action.payload 
        )
      }

    case types.conversationUsersList:
      return {
        ...state,
        searchUsersList: [ ...action.payload ]
      }

    case types.conversationUsersRemove:
      return {
        ...state,
        searchUsersList: []
      }

    case types.currentConversationGet:
      return {
        ...state,
        currentConversation: { ...action.payload }
      }

    case types.currentConversationRemove:
      return {
        ...state,
        currentConversation: {}
      }
    
    default:
      return state;
  }
}