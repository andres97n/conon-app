import React from 'react';
import { useDispatch } from 'react-redux';

import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';

import { EmptyContentScreen } from '../EmptyContentScreen';
import { MessageConversationHeaderApp } from './MessageConversationHeaderApp';

import { changeObjectDate } from '../../../helpers/abp-steps';
import { getUsernameLetter } from '../../../helpers/profile';
import { getConversationSecondUser } from '../../../helpers/conversation/conversationList';
import { setCurrentConversation } from '../../../actions/admin/conversation';


export const MessageConversationScreen = React.memo(({
  userId,
  showUserSearch,
  conversations,
  loadingConversations,
  setShowUserSearch,
}) => {

  const dispatch = useDispatch();

  const handleSelectConversation = ( conversation ) => {
    dispatch( setCurrentConversation( conversation ));
    setShowUserSearch(false);
  }

  return (
    <>
      <div className='col-12'>
        <MessageConversationHeaderApp
          showUserSearch={showUserSearch}
          setShowUserSearch={setShowUserSearch}
        />
      </div>
      <Divider />
        {
          loadingConversations
          ? (
            <EmptyContentScreen />
          )
          : conversations.length === 0
            ? (
              <div className='col-12'>
                <p className='text-center'>No existe ninguna conversación</p>
              </div>
            )
            : (
              conversations.map( conversation => (
                <div 
                  key={conversation.id} 
                  className='col-12' 
                >
                  <div 
                    className='card' 
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className='grid p-fluid'>
                      <div className='col-1'>
                        <Avatar label={
                          getUsernameLetter(
                            getConversationSecondUser(userId, conversation).name
                          )
                        } />
                      </div>
                      <div className='col-5'>
                        <h6>{getConversationSecondUser(userId, conversation).name}</h6>
                      </div>
                      <div className='col-6'>
                        <div className='parent-rigth'>
                          <Tag
                            value={changeObjectDate(conversation.updated_at)} 
                            icon="fas fa-pen-square"
                          ></Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
        }
    </>
  )
});
