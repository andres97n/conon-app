import React, { useState } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';


export const StudentAcCoordinatorAssignDetailApp = React.memo(({
  student
}) => {

  const [studentRate, setStudentRate] = useState(0);
  const [showSaved, setShowSaved] = useState(false);

  const handleSubmitStudentCalification = () => {
    console.log(studentRate);
    setShowSaved(true);
  }

  const handleConfirmSaveStudentCalification = () => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente calificación?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitStudentCalification(),
    });
  };

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className={`${getIconRole(student.role_type)} icon-primary`} />
          {student.owner.name}
        </h5>
      </div>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className="fas fa-handshake fa-lg mr-2 icon-primary" />
        </h4>
        <h3 className='text-center'>
          {studentRate} / 10
        </h3>
      </div>
      {
        !showSaved
          ? (
            <>
              <div className='col-12'>
                <div className='center-inside'>
                  <Rating 
                    stars={10} 
                    value={studentRate}
                    tooltip='Seleccione una estrella para asignar, caso contrario 
                    seleccione el ícono de cancelar para limpiar'
                    tooltipOptions={{position:'bottom'}}
                    onChange={(e) => e.value ? setStudentRate(e.value) : setStudentRate(0)}
                  />
                </div>
              </div>
              <div className='col-12'>
                <div className='center-inside'>
                  <div className='col-6'>
                    <Button 
                      label='Calificar Integrante'
                      icon='fas fa-user-check'
                      className='p-button-raised'
                      disabled={studentRate === 0}
                      onClick={handleConfirmSaveStudentCalification}
                    />
                  </div>
                </div>
              </div>
            </>
          )
          : (
            <div className='col-12'>
              <div className='center-inside'>
                <Rating 
                  stars={10} 
                  value={studentRate}
                  readOnly={true}
                  cancel={false}
                />
              </div>
            </div>
          )
      }
    </div>
  )
});
