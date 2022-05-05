import React from 'react';

import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { getToastMsg } from '../../../helpers/abp';
import { useImage } from '../../../hooks/useImage';


export const TopicUploadViewLocalImageApp = React.memo(({
  field,
  value,
  schoolData,
  setFieldValue,
  handleChangeTabPanel,
  toast
}) => {

  const { deleteSingleImage } = useImage( schoolData, toast );

  const handleDeleteLocalImage = async () => {
    if (value.size > 0) {
      const isDeleted = await deleteSingleImage( value.path );
      if (isDeleted) {
        localStorage.removeItem(`${field}Path`);
        handleClearImageTabs();
      }
    } else {
      handleClearImageTabs();
    }
  }

  const handleClearImageTabs = () => {
    setFieldValue( field, {} );
    handleChangeTabPanel( false );
    getToastMsg(toast, 'success', 'Imagen eliminada correctamente.');
  }

  const handleConfirmDeleteLocalImage = () => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar la siguiente imagen?',
      header: 'Confirmación de eliminado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-raised p-button-danger',
      accept: () => handleDeleteLocalImage(),
    });
  }

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center icon-success'>
          <i className="fas fa-archive mr-2" />
          {
            value.size === 0
              ? ('Url guardado con éxito')
              : ('Imagen Guardada con Éxito')
          }
        </h5>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='p-col-8'>
            <Image
              preview 
              src={value.path} 
              alt="Imagen descriptiva"
              width={350} 
            />
          </div> 
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              icon='fas fa-trash-alt'
              label='Eliminar Imagen'
              className='p-button-raised p-button-danger'
              onClick={handleConfirmDeleteLocalImage}
            />
          </div>
        </div>
      </div>
    </>
  )
});
