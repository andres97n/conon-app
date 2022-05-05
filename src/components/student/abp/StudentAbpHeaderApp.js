import React from 'react';

import { Panel } from 'primereact/panel';

import { StudentAbpTeamHeaderApp } from './StudentAbpTeamHeaderApp';
import { StudentAbpRubricSectionApp } from './StudentAbpRubricSectionApp';


export const StudentAbpHeaderApp = React.memo(({
    currentTeam,
    rubrics,
    currentRubric
}) => {

    const rubric = rubrics[0] || [];
    
  return (
    <>
        <div className='card'>
            <Panel 
                header="Integrantes del Grupo" 
                toggleable
                collapsed={true}
                expandIcon='fas fa-plus'
                collapseIcon="fas fa-minus"
            >
                <div className='grid p-fluid'>
                    <StudentAbpTeamHeaderApp 
                        currentTeam={currentTeam}
                    />
                </div>
            </Panel>
            <Panel 
                header="Información sobre Rúbrica" 
                toggleable
                collapsed={true}
                expandIcon='fas fa-plus'
                collapseIcon="fas fa-minus"
            >
                <div className='grid p-fluid'>
                    <div className='col-12'>
                        <h5 className='mt-2'>
                            La rúbrica presenta lo siguiente ...
                        </h5>
                    </div>
                    <div className='col-6'>
                        <div className='card'>
                            <h6>
                                <i className="fas fa-align-justify mr-2"></i>
                                Descripción de la Rúbrica
                            </h6>
                            <p className='align-justify'>
                                {rubric && rubric.description_rubric}
                            </p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='card'>
                            <h6>
                                <i className="fas fa-file-signature mr-2"></i>
                                Calificación Total del Tópico
                            </h6>
                            <h3 className='text-end'>
                                <i className="fas fa-users mr-2"></i>
                                {rubric && rubric.abp_final_value}
                            </h3>
                        </div>
                    </div>
                </div>
            </Panel>
            <Panel 
                header="Rúbrica de Calificación" 
                toggleable
                collapsed={true}
                expandIcon='fas fa-plus'
                collapseIcon="fas fa-minus"
            >
                <div className='grid p-fluid'>
                    <StudentAbpRubricSectionApp 
                        currentRubric={currentRubric}
                    />
                </div>
            </Panel>
        </div>
    </>
  )
});
