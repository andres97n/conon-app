import React, { useCallback, useState } from 'react';

import { Tooltip } from 'primereact/tooltip';
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog';

import { ToolGlossaryMainApp } from './ToolGlossaryMainApp';
import { ToolChatMainApp } from './ToolChatMainApp';


export const ToolMainScreen = () => {
  
  const [showGlossary, setShowGlossary] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const items = [
    {
      label: 'Glosario',
      icon: 'fas fa-spell-check',
      command: () => setShowGlossary(true)
    },
    {
      label: 'Chat',
      icon: 'fas fa-comment-dots',
      command: () => setShowChat(true)
    },
  ];

  const handleSetShowGlossary = useCallback(
    ( value ) => {
      setShowGlossary( value );
    }, [],
  );

  const handleSetShowChat = useCallback(
    ( value ) => {
      setShowChat( value );
    }, [],
  );

  const headerPanelTemplate = ( type ) => (
    <div className="p-grid p-justify-end">
      <h5 className='p-col-6'>
        {
          type === 1
            ? ('Administrar Glosario')
            : type === 2 && (
              'Chat Grupal'
            )
        }
      </h5>
    </div>
  );

  return (
    <div 
      className="speeddial-mask-demo" 
      style={{ position: 'relative', height: '350px' }}
    >
      <Tooltip
        target=".speeddial-mask-demo .speeddial-right .p-speeddial-action" 
        position='left'
      />
      <SpeedDial
        model={items} 
        className='speeddial-right'
        showIcon='fas fa-tools'
        hideIcon='fas fa-times'
        direction="up"
        buttonClassName='p-button-raised p-button-warning'
      />
      <Dialog
        modal 
        visible={showGlossary} 
        style={{ width: '700px' }} 
        header={headerPanelTemplate(1)}
        className="p-fluid" 
        onHide={() => setShowGlossary(false)}
      >
        <ToolGlossaryMainApp 
          setShowGlossary={handleSetShowGlossary}
        />
      </Dialog>
      <Dialog
        modal 
        visible={showChat} 
        style={{ width: '700px' }} 
        header={headerPanelTemplate(2)}
        className="p-fluid" 
        onHide={() => setShowChat(false)}
      >
        <ToolChatMainApp 
          setShowChat={handleSetShowChat}
        />
      </Dialog> 
    </div>
  )
}
