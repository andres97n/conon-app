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

  const handleSaveMessage = () => {
    const newMessage = {
      owner: ownerId,
      detail: messageInput,
      state: 0,
      blocked: false
    }
    if (Object.keys(conversation).length === 0) {
      if (user) {
        const newConversation = {
          first_user: ownerId,
          second_user: user,
          blocked: false,
          state: 0,
        };
        // dispatch( startSaveConversation( newConversation, newMessage, toast ) );
        console.log(newConversation);
        console.log(newMessage);
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
                onClick={() => handleSaveMessage()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
