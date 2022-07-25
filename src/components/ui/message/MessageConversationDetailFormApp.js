import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import { 
  startSaveConversation, 
  startSaveConversationDetail 
} from '../../../actions/admin/conversation';


export const MessageConversationDetailFormApp = React.memo(({
  ownerId,
  user,
  conversation,
  toast,
  handleClearSearch
}) => {

  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');

  const handleSaveMessage = ( message ) => {
    const secondUser = { id: user.id, name: user.name };
    const newMessage = {
      owner: ownerId,
      detail: message,
      state: 0,
      blocked: false
    }
    if (Object.keys(conversation).length === 0) {
      if (user.id) {
        const newConversation = {
          first_user: ownerId,
          second_user: secondUser.id,
          blocked: false,
          state: 0,
        };
        dispatch( startSaveConversation( newConversation, newMessage, secondUser ) );
        handleClearSearch();
      }
    } else {
      dispatch( startSaveConversationDetail( conversation.id, newMessage, toast ) );
    }
    setMessageInput('');
  }

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-11'>
            <InputTextarea
              value={messageInput} 
              rows={2} 
              autoResize
              placeholder='Escriba algo...'
              onChange={(e) => setMessageInput(e.target.value)} 
              />
          </div>
          <div className='col-1'>
            <div className='center-vertically'>
              <Button
                icon='fas fa-paper-plane'
                type='submit'
                className='p-button-raised'
                tooltip='Enviar Mensaje'
                tooltipOptions={{position:'bottom'}}
                disabled={!messageInput}
                onClick={() => handleSaveMessage(messageInput)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
