import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';

import { existsModeratorInGroup } from '../../../../../../../helpers/topic';
import { getStudentsTeamAbp } from '../../../../../../../helpers/topic/headerRight';
import { startSaveTeamAbp } from '../../../../../../../actions/teacher/teamAbp';


export const TopicAssignAbpModeratorGroup = React.memo(({
  currentAbp,
  moderatorSwitch,
  selectedStudents,
  toast,
  showConfirmModeratorDialog,
  setModeratorSwitch,
  setShowConfirmModeratorDialog,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleSaveStudentsToTopic,
  handleHideAssignDialog
}) => {

  const dispatch = useDispatch();
  
  const handleSaveAbpGroup = () => {
    const newTeamAbp = {
      abp: currentAbp.id,
      step: 1,
      observations: '',
      state: 1
    };
    const newTeamDetails = getStudentsTeamAbp( moderatorSwitch );
    dispatch( startSaveTeamAbp( newTeamAbp, newTeamDetails, toast ) );
    setShowConfirmModeratorDialog(false);
    handleHideAssignDialog();
    handleSetShowBackMessage(true);
    handleSetBackMessage(
      'Está seguro que desea regresar sin antes haber creado la rúbrica para los estudiantes.'
    );
    handleSaveStudentsToTopic( selectedStudents );
  }

  const handleConfirmSaveGroup = () => {
    confirmDialog({
      message: 'Está seguro que desea asignar el siguiente grupo??',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveAbpGroup(),
    });
  }

  const headerModeratorDialog = (
    <div className="p-grid p-justify-end">
      <h5 className='p-col-6'>Seleccionar Moderador de Grupo</h5>
    </div>
  );

  const moderatorDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancelar" 
        icon="fas fa-times-circle" 
        className="p-button-text p-button-danger" 
        onClick={() => setShowConfirmModeratorDialog(false)}
      />
      <Button 
        label="Guardar" 
        icon="fas fa-check-circle" 
        className="p-button-text p-button-success" 
        type='submit'
        disabled={
          (existsModeratorInGroup(moderatorSwitch))
            ? (false)
            : (true)
        }
        onClick={handleConfirmSaveGroup}
      />
    </React.Fragment>
  );

  const handleChangeModeratorSwitch = (id, state) => {
    setModeratorSwitch(olderState => {
      return olderState.map(student => {
        if (state === true) {
          if (student.id === id) {
            return {
              id: student.id,
              studentSwitch: state,
              disabled: false
            }
          } else {
            return {
              id: student.id,
              studentSwitch: false,
              disabled: true
            }
          }
        } else {
          return {
            id: student.id,
            studentSwitch: false,
            disabled: false
          }
        }
      });
    });
  }

  return (
    <>
      <Dialog
        modal 
        visible={showConfirmModeratorDialog} 
        style={{ width: '400px' }} 
        header={headerModeratorDialog}
        className="p-fluid" 
        footer={moderatorDialogFooter} 
        onHide={() => setShowConfirmModeratorDialog(false)}
      >
        <div className='grid p-fluid'>
          {
            selectedStudents && selectedStudents.map((student, index) => (
              <div key={student.identification}>
                <div className='col-12' >
                  <h6 className='text-center'>{student.name}</h6>
                  <InputSwitch
                    checked={moderatorSwitch[index]?.studentSwitch} 
                    disabled={moderatorSwitch[index]?.disabled} 
                    tooltip={
                      (moderatorSwitch[index]?.studentSwitch)
                        ? ('Seleccione para desasignar')
                        : ('Seleccione para asignar')
                    }
                    tooltipOptions={{position: 'bottom'}}
                    onChange={(e) => handleChangeModeratorSwitch(
                      student.user, e.value
                    )} 
                  />
                </div>
              </div>
            ))
          }
        </div>
      </Dialog>
    </>
  )
});
