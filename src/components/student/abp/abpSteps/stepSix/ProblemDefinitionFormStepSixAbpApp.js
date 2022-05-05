import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  emptyHeaderRender, 
  renderEditorHeaderWithoutImage 
} from '../../../../../helpers/topic';
import { 
  startSaveProblemDefinitionStepSixAbp, startUpdateProblemDefinitionStepSixAbp 
} from '../../../../../actions/student/abp_steps/problemDefinitionStepSixAbp';

export const ProblemDefinitionFormStepSixAbpApp = React.memo(({
  problemDefinition,
  teamId,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      problemDefinition: '',
      observations: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.problemDefinition) {
        errors.problemDefinition = 'La definición del problema es obligatorio.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveProblemDefinition( data );
    }
  });

  const { values, errors, setValues, setFieldValue, handleChange, handleSubmit } = formik;

  const handleSubmitProblemDefinitionAbp = ( data ) => {
    const newDefinition = {
      team_abp: teamId,
      problem_definition: data.problemDefinition,
      observations: data.observations,
      active: true
    };
    if (problemDefinition.id) {
      dispatch( startUpdateProblemDefinitionStepSixAbp( 
        newDefinition, problemDefinition.id, toast 
      ));
    } else {
      dispatch( startSaveProblemDefinitionStepSixAbp( newDefinition, toast ) );
    }
  }

  const handleConfirmSaveProblemDefinition = ( data ) => {
    confirmDialog({
        message: '¿Está seguro que desea guardar la siguiente definición?',
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSubmitProblemDefinitionAbp( data ),
    });
  }

  const handleSetProblemDefinition = useCallback(
    ( problemDefinitionData ) => {
      if (!values.problemDefinition && !values.observations) {
        setValues({
          problemDefinition: problemDefinitionData.problem_definition,
          observations: problemDefinitionData.observations
        });
      }
    },
    [values, setValues],
  );

  useEffect(() => {
    if (problemDefinition && Object.keys(problemDefinition).length > 0) {
      handleSetProblemDefinition( problemDefinition );
    }
  }, [problemDefinition, handleSetProblemDefinition]);

  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        {
          isModerator
            ? (
              <>
                <div className='col-12'>
                  <Editor 
                    id='problemDefinition'
                    style={{ height: '300px' }} 
                    value={values.problemDefinition} 
                    placeholder='Esta es la Definición del Problema...'
                    headerTemplate={renderEditorHeaderWithoutImage}
                    onTextChange={(e) => setFieldValue('problemDefinition', e.htmlValue)} 
                    // modules={modules}
                    // onTextChange={(e) => setProblemDefinition(e.htmlValue)} 
                    // formats={toolbarOptionsWithoutImage}
                  />
                  {
                    errors &&
                      (
                        <small className="p-error mt-1">
                          {errors['problemDefinition']}
                        </small>
                      )
                  }
                </div>
                <div className='col-12 mt-4'>
                  <span className="p-float-label">
                    <InputTextarea
                        id='observations'
                        name='observations'
                        required rows={3} cols={20} 
                        value={values.observations}
                        onChange={handleChange}
                    />
                    <label htmlFor='observations'>
                      Puede ingresar observaciones si así lo desea...
                    </label>
                  </span>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-3'>
                      <Button
                        icon='fas fa-save'
                        label='Guardar Definición del Problema'
                        tooltip='Puede guardar los cambios realizados y que el grupo 
                        lo visualice.'
                        tooltipOptions={{position:'bottom'}}
                        type='submit'
                        className='p-button-raised'
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </div>
              </>
            )
            : (
              <div className='col-12'>
                {
                  !problemDefinition.problem_definition
                    ? (
                      <small>
                        Aún no existe una definición del problema.
                      </small>
                    )
                    : (
                      <>
                        <Editor 
                          style={{ height: '320px' }} 
                          headerTemplate={emptyHeaderRender}
                          value={
                            problemDefinition.problem_definition
                          } 
                          readOnly={true}
                        />
                        <div className='col-12 mt-4'>
                          <h5>Observaciones</h5>
                          <span id='area_wrap'> 
                            <i className="fas fa-asterisk mr-2" />
                            {problemDefinition.observations}
                          </span>
                        </div>
                      </>
                    )
                }
              </div>
            )
        }
      </div>
    </div>
  )
});
