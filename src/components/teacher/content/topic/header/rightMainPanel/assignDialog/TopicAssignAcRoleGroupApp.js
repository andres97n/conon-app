import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';

import { 
  getTeamDetailsAc, 
  isRoleFormValid 
} from '../../../../../../../helpers/topic/headerRole';
import { startSaveTeamAc } from '../../../../../../../actions/teacher/teamAc';


export const TopicAssignAcRoleGroupApp = React.memo(({
  currentAc,
  moderatorSwitch,
  selectedStudents,
  toast,
  showConfirmModeratorDialog,
  setShowConfirmModeratorDialog,
  setModeratorSwitch,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleSaveStudentsToTopic,
  handleHideAssignDialog
}) => {

  const dispatch = useDispatch();
  const options = [
    { value: 'coordinator', icon: 'fas fa-user-cog' },
    { value: 'spokeman', icon: 'fas fa-bullhorn' },
    { value: 'organizer', icon: 'fas fa-hand-pointer' },
    { value: 'secretary', icon: 'fas fa-address-book' }
  ];

  const handleSaveRoleGroup = () => {
    const newTeamAc = {
      ac: currentAc.id,
      team_state: 1,
      active: true,
      observations: ''
    };
    console.log(newTeamAc);
    const newTeamDetailsAc = getTeamDetailsAc( moderatorSwitch );
    handleSetShowBackMessage(true);
    handleSetBackMessage(
      'Está seguro de desea regresar sin haber creado la rúbrica correspondiente?'
    );
    handleHideAssignDialog(true);
    handleSaveStudentsToTopic( selectedStudents );
    dispatch( startSaveTeamAc( newTeamAc, newTeamDetailsAc, toast ) );
  }

  const handleConfirmSaveGroup = () => {
    confirmDialog({
      message: 'Está seguro que desea asignar el siguiente grupo?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveRoleGroup(),
    });
  }
  
  const handleChangeRoleSwitch = (id, state) => {
    setModeratorSwitch(olderState => {
      return olderState.map(student => 
        student.id === id
          ? ({
            id: student.id,
            studentSwitch: state
          })
          : student
      );
    });
  }

  const headerModeratorDialog = (
    <div className="p-grid p-justify-end">
      <h5 className='p-col-6'>Seleccionar Moderador de Grupo</h5>
    </div>
  );

  const roleDialogFooter = (
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
          (isRoleFormValid(moderatorSwitch))
            ? (false)
            : (true)
        }
        onClick={handleConfirmSaveGroup}
      />
    </React.Fragment>
  );

  return (
    <>
      <Dialog
        modal 
        visible={showConfirmModeratorDialog} 
        style={{ width: '400px' }} 
        header={headerModeratorDialog}
        className="p-fluid" 
        footer={roleDialogFooter} 
        onHide={() => setShowConfirmModeratorDialog(false)}
      >
        <div className='grid p-fluid'>
          <div className='col-3'>
            <p className='text-center'>
              <i className="fas fa-user-cog mr-2 icon-primary" />Coordinador
            </p>
          </div>
          <div className='col-3'>
            <p className='text-center'>
              <i className="fas fa-bullhorn mr-2 icon-primary" />Portavoz
            </p>
          </div>
          <div className='col-3'>
            <p className='text-center'>
              <i className="fas fa-hand-pointer mr-2 icon-primary" />Organizador
            </p>
          </div>
          <div className='col-3'>
            <p className='text-center'>
              <i className="fas fa-address-book mr-2 icon-primary" />Secretario
            </p>
          </div>
          {
            selectedStudents && selectedStudents.map((student, index) => (
              <div key={student.identification}>
                <div className='col-12 mt-2'>
                  <h6 className='text-center'>{student.name}</h6>
                  <div className='center-inside'>
                    <MultiStateCheckbox 
                      value={moderatorSwitch[index]?.studentSwitch} 
                      options={options} 
                      optionValue="value" 
                      onChange={(e) => handleChangeRoleSwitch(
                        student.user, e.value
                      )} 
                    />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Dialog>
    </>
  )
});
