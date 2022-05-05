import React from 'react';
import { Tooltip } from 'primereact/tooltip'

export const StudentAbpTeamHeaderApp = React.memo(({
    currentTeam
}) => {
  return (
    <>
        <div className='col-12'>
            <h5 className='text-center'>Los integrantes del grupo son ...</h5>
        </div>
        <div className='col-12'>
            <div className='grid p-fluid' >
                {
                    currentTeam && currentTeam.map((student, index) => (
                        <div className='col-3' key={index}>
                            <div className='col-12'>
                                <div className='card'>
                                    {
                                        (student.is_moderator)
                                            ? (
                                                <div className='center-inside'>
                                                    <div className='col-2'>
                                                        <Tooltip target=".moderator" />
                                                        <i 
                                                            className="text-center moderator fas fa-pencil-ruler fa-lg"
                                                            data-pr-tooltip="Moderador" 
                                                            data-pr-position="right"
                                                        ></i>
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <i 
                                                    className="text-center fas fa-book-reader fa-lg"
                                                    data-pr-tooltip="Moderador" 
                                                    data-pr-position="right"
                                                ></i>
                                            )
                                    }
                                    <h6 className='text-center'>
                                        {student.user.name}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>   
    </>
  )
});
