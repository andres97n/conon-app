import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import { EmptyContentScreen } from '../EmptyContentScreen';
import { MessageConversationHeaderApp } from './MessageConversationHeaderApp';

import { changeObjectDate } from '../../../helpers/abp-steps';
import { getUsernameLetter } from '../../../helpers/profile';
import { 
  getConversationSecondUser 
} from '../../../helpers/conversation/conversationList';
import { 
  setCurrentConversation, 
  startBlockConversation 
} from '../../../actions/admin/conversation';


export const MessageConversationScreen = React.memo(({
  userId,
  toast,
  showUserSearch,
  setShowUserSearch,
  setShowMessageDetail
}) => {

  const dispatch = useDispatch();
  const { conversations, loadingConversations } = useSelector(
    state => state.dashboard.conversation
  );
  const [filteredUsers, setFilteredUsers] = useState(conversations);

  const handleBlockConversation = ( conversationId ) => {
    dispatch( startBlockConversation( conversationId, toast ));
  };

  const handleSelectConversation = ( conversation ) => {
    dispatch( setCurrentConversation( conversation ));
    setShowUserSearch(false);
  }

  const handleSetFilteredUser = useCallback(
    ( value ) => {
      setFilteredUsers( value );
    }, [],
  );

  const handleConfirmBlockConversation = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear la siguiente conversación?',
      header: 'Confirmación de Bloqueo',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-button-secondary',
      accept: () => handleBlockConversation( data ),
    });
  }

  if (loadingConversations) {
    return (
      <EmptyContentScreen />
    );
  }

  return (
    <>
      <div className='col-12'>
        <MessageConversationHeaderApp
          userId={userId}
          conversations={conversations}
          showUserSearch={showUserSearch}
          setFilteredUsers={handleSetFilteredUser}
          setShowUserSearch={setShowUserSearch}
          setShowMessageDetail={setShowMessageDetail}
        />
      </div>
      <Divider />
      <ScrollPanel
        className="custombar1" 
        style={{ 
          width: '100%', 
          height: conversations.length === 0
            ? '150px'
            : '450px'
        }}
      >
        {
          conversations.length === 0
            ? (
              <div className='col-12'>
                <p className='text-center'>No existe ninguna conversación</p>
              </div>
            )
            : (
              filteredUsers.map( conversation => (
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
                            getConversationSecondUser(userId, conversation)?.name
                          )
                        } />
                      </div>
                      <div className='col-5'>
                        <h6>{getConversationSecondUser(userId, conversation)?.name}</h6>
                      </div>
                      <div className='col-3'></div>
                      <div className='col-3'>
                        <Tag
                          value={changeObjectDate(conversation.updated_at)} 
                          icon="fas fa-pen-square"
                        ></Tag>
                      </div>
                      <div className='col-12'>
                        <Button 
                          icon='fas fa-ban'
                          tooltip='Bloquear Conversación'
                          tooltipOptions={{position: 'bottom'}}
                          className='p-button-rounded p-button-secondary p-button-text'
                          onClick={() => handleConfirmBlockConversation(conversation.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))  
            )
        }
      </ScrollPanel>
    </>
  )
});
