import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { startSaveStudentIdeaStepTwoAbp } from '../../../../../actions/student/abp_steps/studentIdeaStepTwoAbp';
import { getManyStudentIdeaObjects } from '../../../../../helpers/abp-steps';

export const StudentIdeaFormStepTwoAbpApp = React.memo(({
  teamDetailId,  
  studentIdeaCount,
  increment,
  decrement,
  toast
}) => {
  
  const dispatch = useDispatch();
  const [studentIdeas, setStudentIdeas] = useState([]);

  const handleSaveStudentIdeas = () => {
    //Guardar
    let ideasForSave;
    if (studentIdeas.length > 1) {
      ideasForSave = getManyStudentIdeaObjects(studentIdeas, teamDetailId);
    } else {
      ideasForSave = {
        team_detail_abp: teamDetailId,
        student_idea: studentIdeas[0],
        active: true
      }
    }
    dispatch( startSaveStudentIdeaStepTwoAbp( ideasForSave, toast ) );
    setStudentIdeas([]);
  }

  const handleConfirmSaveStudentIdeas = () => {
    const oneIdea = 'la siguiente idea';
    const manyIdeas = 'las siguientes ideas'
    confirmDialog({
        message: `Está seguro que desea guardar ${
        studentIdeas.length === 1 ? oneIdea : manyIdeas 
        }?`,
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSaveStudentIdeas(),
    });
  }

  const handleValidateStudentIdeas = () => {
    if (studentIdeas.length === 0) {
      toast.current.show({ 
        severity: 'error', 
        summary: 'Conon Informa', 
        detail: 'Para guardar, por lo menos ingrese alguna Idea', 
        life: 4000 });
    } else {
      handleConfirmSaveStudentIdeas();
    }
  }

  return (
    <>
      <div className='col-12'>
        <Chips
          id='idea'
          name='idea'
          value={studentIdeas}
          max={10} 
          placeholder='Puede ingresar varias ideas,
                          hasta un máximo de 10.'
          autoComplete='off'
          onChange={(e) => setStudentIdeas(e.value)}
          onAdd={increment}
          onRemove={decrement}
        ></Chips>
        <small 
          id='idea-help'
          className="p-d-block mt-1"
        >Ingrese la idea pulsando ENTER.</small>
      </div>
      <div className='col-10'></div>
      <div className='col-2'>
        <Button 
          label={studentIdeas.length === 1 ? 'Guardar Idea' : 'Guardar Ideas'}
          icon='fas fa-save'
          disabled={studentIdeaCount > 10}
          className='p-as-center'
          onClick={handleValidateStudentIdeas}
        />
      </div>
    </>
  )
});
