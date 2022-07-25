import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';


export const ToolGlossaryTeacherMainApp = React.memo(({
  classrooms,
  viewClassroom,
  classroomSelected,
  setClassroomSelected,
  setViewClassroom
}) => {

  const [filteredClassrooms, setFilteredClassrooms] = useState([]);

  const handleSearchClassroom = (e) => {
    let _filteredClassrooms;
    if (!e.query.trim().length) {
      _filteredClassrooms = [...classrooms];
    }
    else {
      _filteredClassrooms = classrooms.filter((classroom) => {
        return classroom.name.toLowerCase().includes(e.query.toLowerCase());
      });
    }
    setFilteredClassrooms(_filteredClassrooms);
  }

  const handleClearClassroom = () => {
    setClassroomSelected(null);
    setViewClassroom(false);
  }

  return (
    <>
      {
        viewClassroom
          ? (
            <div className='col-12'>
              <div className='card'>
                <div className='col-12'>
                  <h4 className='text-center'>
                    <i className="fas fa-chalkboard icon-primary mr-3" />
                    {classroomSelected.name}
                  </h4>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <Button 
                      icon="fas fa-times"
                      tooltip='Limpiar Selección'
                      tooltipOptions={{position:'bottom'}}
                      className="p-button-rounded p-button-danger"
                      onClick={handleClearClassroom} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className='col-12'>
              <div className='card'>
                <div className='center-inside'>
                  <div className='col-6'>
                    <AutoComplete
                      value={classroomSelected} 
                      field="name" 
                      forceSelection
                      suggestions={filteredClassrooms} 
                      completeMethod={handleSearchClassroom} 
                      placeholder='Busque por el Nombre del Aula'
                      dropdown
                      dropdownMode='current'
                      onChange={(e) => setClassroomSelected(e.value)}
                    />
                  </div>
                  <div className='col-2'>
                    <Button 
                      icon="fas fa-hand-pointer"
                      tooltip='Seleccionar Aula'
                      tooltipOptions={{position:'bottom'}}
                      className="p-button-rounded p-button-primary"
                      disabled={!classroomSelected} 
                      onClick={() => setViewClassroom(true)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </>
  )
});
