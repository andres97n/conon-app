import { DateTime } from "luxon";

export const getConversationSecondUser = ( userId, conversation ) => {
  let user = {};
  Object.entries(conversation).forEach( ([field, value]) => {
    if (field === 'first_user' || field === 'second_user') {
      if (value.id !== userId) {
        user = value;
      }
    }
  });
  return user;
}

export const getIsMessageValidToDelete = ( date ) => {
  const now = DateTime.now();
  const conversationDate = DateTime.fromISO(date).plus({days: 1});
  return !!(conversationDate > now) ;
}