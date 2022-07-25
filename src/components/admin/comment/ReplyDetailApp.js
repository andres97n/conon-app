import React from 'react';
import { useDispatch } from 'react-redux';

import { ScrollPanel } from 'primereact/scrollpanel';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { InputTextarea } from 'primereact/inputtextarea';

import { getUsernameLetter } from '../../../helpers/profile';
import { changeObjectDate } from '../../../helpers/abp-steps';
import { confirmDialog } from 'primereact/confirmdialog';
import { startDeleteReply } from '../../../actions/admin/comment';


export const ReplyDetailApp = React.memo(({
  replies,
  userId,
  userType,
  toast
}) => {

  const dispatch = useDispatch();

  if (replies.length === 0) {
    return (
      <div className='col-12'>
        <small>No existen comentarios subidos.</small>
      </div>
    );
  }

  const handleDeleteReply = ( replyId ) => {
    dispatch( startDeleteReply( replyId, toast ));
  }

  const handleConfirmDeleteReply = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar el siguiente Comentario?',
      header: 'Confirmación de Eliminado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-danger',
      accept: () => handleDeleteReply( data ),
    });
  }

  return (
    <ScrollPanel
      className="custombar1"
      style={{
        width: '100%',
        height: '450px'
      }}
    >
      {
        replies.length > 0 && replies.map((reply, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-2'>
                    <Avatar 
                      label={getUsernameLetter( reply.owner.name )}
                      shape='circle'
                      size='large'
                      className='button-start'
                    />
                </div>
                <div className='col-8'>
                  <h6>{reply.owner.name}</h6>
                </div>
                <div className='col-2'>
                  {
                    (userId === reply.owner.id || userType === 1) && (
                      <div className='center-inside'>
                        <Button
                          icon="fas fa-times" 
                          tooltip='Eliminar Comentario'
                          tooltipOptions={{position:'bottom'}}
                          className="p-button-rounded p-button-danger mr-2" 
                          onClick={() => handleConfirmDeleteReply(reply.id)} 
                        />
                      </div>
                    )
                  }
                </div>
                <div className='col-2'></div>
                <div className='col-10'>
                  <InputTextarea 
                    name='comment'
                    value={reply.detail}
                    rows={5}
                    autoResize={true}
                    disabled={true}
                  />
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Badge
                      value={changeObjectDate( reply.created_at )}
                      severity='info'
                    ></Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </ScrollPanel>
  )
});
