import React from 'react';

import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { useImage } from '../../../hooks/useImage';
import { getToastMsg } from '../../../helpers/abp';

// TODO: Eliminar componente


export const TopicBlockUploadApp = React.memo(({
  schoolData,
  item,
  toast,
  handleBlockImageUploadButtons
}) => {
  
  const { deleteSingleImage } = useImage( schoolData, toast );

  const handleUnlockImageUpload = async () => {
    const imageUrl = localStorage.getItem(item);
    if (imageUrl) {
      const imageDeleted = await deleteSingleImage( imageUrl );
      if (imageDeleted) {
        localStorage.removeItem(item);
        getToastMsg(toast, 'success', 'Imagen eliminada correctamente.');
      } else {
        getToastMsg(toast, 'error', 'No se pudo eliminar la imagen.');
      }
    } else {
      getToastMsg(toast, 'error', 'No se encontró el link de la imagen.');
    }
    handleBlockImageUploadButtons(item, true);
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <Message severity="error" text="La imagen ya fue subida." />
      </div>
      <div className='col-6'>
        <Button
          icon="fas fa-times"
          label='Eliminar Imagen'
          tooltip='La presente imagen ya fue subida, puede subir otra eliminando la subida.'
          tooltipOptions={{position: 'bottom'}}
          type='submit'
          className='p-button-raised p-button-danger'
          onClick={handleUnlockImageUpload}
        />
      </div>
    </div>
  )
});
