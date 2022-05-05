import { DateTime } from "luxon";

export const getConversationsWithExcludeOwner = ( userId, conversations ) => {
  return conversations.map( conversation => {
    const { first_user, second_user, ...fields } = conversation;
    return first_user === userId
      ? { ...fields, ...second_user }
      : { ...fields, ...first_user };
    // if (first_user === userId) {
    //   return { ...fields, ...second_user }
    //   // return Object.fromEntries(Object.entries(conversation).filter(
    //   //   ([field, value]) => field === 'first_user'
    //   // ));
      
    // } else if (second_user === userId) {
    //   return { ...fields, ...first_user };
    // }
  });
}

export const getConversationData = ( data, conversationId ) => ({
  id: conversationId,
  first_user: data.first_user,
  second_user: data.second_user,
  blocked: data.blocked,
  created_at: data.created_at || new DateTime.now(),
  updated_at: data.updated_at || new DateTime.now()
});

export const getConversationErrorMessage = ( detail ) => {
  if ( detail.first_user ) {
    return detail.first_user[0]
  } else if ( detail.second_user ) {
    return detail.second_user[0]
  } else if ( detail.blocked ) {
    return detail.blocked[0]
  } else if ( detail.created_at ) {
    return detail.created_at[0]
  } else if ( detail.updated_at ) {
    return detail.updated_at[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}

export const getConversationDetailData = ( data, conversationDetailId ) => ({
  id: conversationDetailId,
  conversation: data.conversation,
  owner: data.owner,
  detail: data.detail,
  state: data.state,
  blocked: data.blocked,
  created_at: data.created_at || new DateTime.now(),
});

export const getConversationDetailErrorMessage = ( detail ) => {
  if ( detail.conversation ) {
    return detail.conversation[0]
  } else if ( detail.owner ) {
    return detail.owner[0]
  } else if ( detail.detail ) {
    return detail.detail[0]
  } else if ( detail.state ) {
    return detail.state[0]
  } else if ( detail.blocked ) {
    return detail.blocked[0]
  } else {
    return 'Error, consulte con el Administrador.';
  }
}