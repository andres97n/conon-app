import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  StudentAcSpokesmanTeamDescriptionViewApp 
} from './StudentAcSpokesmanTeamDescriptionViewApp';

import { 
  startLoadActivityDescriptionSpokesmanAcByMember, 
  startSaveActivityDescriptionSpokesmanAc, 
  startUpdateActivityDescriptionSpokesmanAc 
} from '../../../../../actions/student/ac_roles/spokesmanAc/activitityDescriptionSpokesmanAc';


export const StudentAcSpokesmanTeamDescriptionDetailApp = React.memo(({
  student,
  teamDetailAc,
  toast
}) => {
  
  const dispatch = useDispatch(); 
  const {
    spokesmanActivitiesDescription,
    loadingSpokesmanActivityDescription
  } = useSelector( state => state.dashboard.spokesmanAc );
  const isMounted = useRef(true);

  const formik = useFormik({
    initialValues: {
      activityDescription: ''
    },
    validate: (data) => {
      let errors = {};
      if (!data.activityDescription) {
        errors.activityDescription = 'La descripción de la actividad es obligatoria';
      }
      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveTeamDescription( data );
    }
  });

  const { values, errors, setFieldValue, handleChange, handleReset, handleSubmit } = formik;

  const handleSubmitSpokesmanTeamDescription = ( data ) => {
    const newActivityDescription = {
      team_detail_ac: teamDetailAc.id,
      member_ac: student.id,
      activity_description: data.activityDescription,
      active: true
    }; 
    if (spokesmanActivitiesDescription.length === 0) {
      dispatch( startSaveActivityDescriptionSpokesmanAc( newActivityDescription, toast ) );
    } else {
      dispatch( startUpdateActivityDescriptionSpokesmanAc( 
        spokesmanActivitiesDescription[0].id,
        newActivityDescription, 
        toast 
      ));
    }
    handleReset();
  }

  const handleConfirmSaveTeamDescription = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente descripción?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitSpokesmanTeamDescription( data ),
    });
  };

  const handleLoadOrganizerAssignActivities = useCallback(
    ( teamDetailId, memberId ) => {
      dispatch( startLoadActivityDescriptionSpokesmanAcByMember( teamDetailId, memberId ));
    }, [dispatch],
  );

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(teamDetailAc).length > 0 &&
      Object.keys(student).length > 0 &&
      isMounted.current
    ) {
      handleLoadOrganizerAssignActivities( teamDetailAc.id, student.id );
    }
  }, [teamDetailAc, student, handleLoadOrganizerAssignActivities]);

  useEffect(() => {
    if (spokesmanActivitiesDescription.length > 0) {
      handleSetFieldValue( 
        'activityDescription', 
        spokesmanActivitiesDescription[0].activity_description 
      );
    }
  }, [spokesmanActivitiesDescription, handleSetFieldValue]);

  if (loadingSpokesmanActivityDescription) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6 mb-2'>
            <Button
              label={"Guardar Descripción"}
              icon='fas fa-envelope-open-text'
              type='submit'
              tooltip='Guardar cambios'
              tooltipOptions={{position: 'bottom'}}
              className="p-button-raised p-button-success"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        <span className="p-float-label">
          <InputTextarea
            id='activityDescription'
            name='activityDescription'
            required rows={3} cols={20} 
            value={values.activityDescription}
            className={classNames({ 'p-invalid': errors.activityDescription })}
            onChange={handleChange}
          />
          <label htmlFor='activityDescription'>
            Descripción de las Actividades realizadas por este Integrante
          </label>
        </span>
      </div>
      {
        student.role_type !== 2 && (
          <div className='col-12'>
            <Accordion>
              <AccordionTab header="Actividades Realizadas por el Integrante">
                <StudentAcSpokesmanTeamDescriptionViewApp 
                  teamDetailId={student.id}
                  teamId={teamDetailAc.team_ac}
                  roleType={student.role_type}
                />
              </AccordionTab>
            </Accordion>
          </div>
        )
      }
    </div>
  )
});
