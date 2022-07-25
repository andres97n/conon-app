import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { AutoComplete } from 'primereact/autocomplete';

import { startLoadTeachers, startRemoveTeachers } from '../../../actions/admin/teacher';


export const OwnerSearchApp = React.memo(({
  person,
  setFieldValue,
  errors
}) => {

  const dispatch = useDispatch();
  const { teachers } = useSelector( state => state.dashboard.teacher );
  const [filteredItems, setFilteredItems] = useState(null);

  const handleLoadTeachers = useCallback(
    () => {
      dispatch( startLoadTeachers(true) );
    }, [dispatch],
  );

  const searchItems = (event) => {
    let query = event.query;
    let _filteredItems = [];

    _filteredItems = teachers.filter((teacher) => {
      return teacher.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredItems(_filteredItems);
  }

  useEffect(() => {
    handleLoadTeachers();
  
    return () => {
      startRemoveTeachers();
    }
  }, [handleLoadTeachers]);

  return (
    <>
      <div className='col-12 mt-5 mb-3'>
        <span className="p-float-label">
          <AutoComplete
            id='person'
            name='person'
            value={person} 
            dropdown
            forceSelection
            field="name"
            dropdownMode='current'
            suggestions={filteredItems} 
            completeMethod={searchItems} 
            onChange={(e) => setFieldValue('person', e.value)} 
          />
          <label 
            htmlFor='person'
            className={classNames({ 'p-error': errors['person'] })}
          >Busque un docente registrado*</label>
        </span>
        {
          !errors['person']
            ? (
              <small 
                id="person-help" 
                className="p-d-block"
              >Puede buscar por el nombre.</small>
            )
            : (
              <small className="p-error">{errors['person']}</small>
            )
        }
      </div>
    </>
  )
});
