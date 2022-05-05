import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { startSaveManyOpinionStepOneAbp, startSaveOpinionStepOneAbp } from '../../../../../actions/student/abp_steps/opinionStepOneAbp';

export const StudentOpinionStepOneAbpApp = React.memo(({
    opinionCount,
    handleSetOpinionCount,
    team_detail_abp,
    toast
}) => {

    const dispatch = useDispatch();
    const [opinion, setOpinion] = useState([]);

    const handleSaveOpinions = () => {
        if (opinion.length > 1) {
            const opinionsForSave = opinion.map( data => ({
                team_detail_abp,
                opinion: data,
                active: true
            }));
            dispatch(startSaveManyOpinionStepOneAbp(opinionsForSave, toast));
        } else {
            const opinionForSave = {
                team_detail_abp,
                opinion: opinion[0],
                active: true
              }
            dispatch(startSaveOpinionStepOneAbp(opinionForSave, toast));
        }
        setOpinion('');
    }

    const handleValidateOpinionForm = () => {
        if (opinion.length === 0) {
            toast.current.show({ 
                severity: 'error', 
                summary: 'Conon Informa', 
                detail: 'Para guardar por lo menos ingrese una Opinión', 
                life: 4000 });
        } else {
            confirmOpinionSave();
        }
    }

    const confirmOpinionSave = () => {
        const oneOpinion = 'la siguiente opinión';
        const manyOpinions = 'las siguientes opiniones'
        confirmDialog({
            message: `Está seguro que desea guardar ${
            opinion.length === 1 ? oneOpinion : manyOpinions 
            }?`,
            header: 'Confirmación de guardado',
            icon: 'fas fa-exclamation-triangle',
            acceptLabel: 'Sí, guardar',
            rejectLabel: 'No guardar',
            accept: () => handleSaveOpinions(),
        });
    };

  return (
    <>
        <div className='col-12'>
            <Chips
                id='opinion'
                name='opinion'
                value={opinion}
                max={10} 
                placeholder='Puede ingresar varias opiniones,
                                hasta un máximo de 5.'
                autoComplete='off'
                onChange={(e) => setOpinion(e.value)}
                onAdd={() => handleSetOpinionCount(0, 'more')}
                onRemove={() => handleSetOpinionCount(0, 'less')}
            ></Chips>
            <small 
                id='opinion-help'
                className="p-d-block"
            >Ingrese el comentario pulsando ENTER.</small>
        </div>
        <div className='col-9'></div>
        <div className='col-3'>
            <Button
                label='Guardar Opinion/es'
                icon='fas fa-save'
                disabled={opinionCount > 5}
                className='p-as-center'
                onClick={handleValidateOpinionForm}
            />
        </div>
    </>
  )
});
