import React, { useState } from 'react'; 

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';

import { 
  checkboxInitialState, 
  getCheckboxOption, 
  getCheckboxStateEvaluation,
} from '../../../helpers/school';


export const TopicStudentEvaluationTableApp = React.memo(({
  evaluationSaved,
  values,
  evaluationQuestions,
  columns,
  width,
  setFieldValue
}) => {

  const [evaluationDisabled, setEvaluationDisabled] = useState(getCheckboxStateEvaluation);

  const handleGetColumnField = ( index, field ) => {
    const fullField = 
      index === 2
        ? `${field}.firstOption`
        : index === 3
        ? `${field}.secondOption`
        : index === 4
          ? `${field}.thirdOption`
          : index === 5 &&
            `${field}.fourOption`

    return fullField;
  }

  const getOptions = ( option, clear ) => {
    let newOptions = {};
    if (clear) {
      newOptions = Object.fromEntries(Object.entries(checkboxInitialState).map(
        ([ key ]) => {
          return [ key, false ];
        }
      ));
    } else {
      newOptions = Object.fromEntries(Object.entries(checkboxInitialState).map(
        ([ key ]) => key !== option 
          ? [ key, true ]
          : [ key, false ]
      ));
    }
    return newOptions;
  }

  const handleColumnCheckbox = ( field, option, clear ) => {
    if (clear) {
      setEvaluationDisabled( oldState => ({
        ...oldState,
        [`${field}`]: getOptions( option, clear )
      }));
    } else {
      setEvaluationDisabled( oldState => ({
        ...oldState,
        [`${field}`]: getOptions( option )
      }));
    }
  }

  const getAutoEvaluationColumns = columns.map( column => {
    if (column.field) {
      return <Column 
        key={column.field} 
        field={column.field} 
        header={column.header}
        style={
          column.header === '#'
            ? {width: '50px', fontWeight: 'bold'}
            : {}
        }
        className={ column.header === '#' && 'text-center' }
        headerClassName='text-center'
      />;
    }
    return (
      <Column
        key={column.header}
        header={column.header}
        body={ (rowData, column) => {
          return (
            <Checkbox
              name={
                column.index === 2
                 ? `${rowData.field}.firstOption`
                 : column.index === 3
                  ? `${rowData.field}.secondOption`
                  : column.index === 4
                    ? `${rowData.field}.thirdOption`
                    : column.index === 5 &&
                      `${rowData.field}.fourOption`
              }
              checked={
                column.index === 2
                 ? values[`${rowData.field}`]['firstOption']
                 : column.index === 3
                  ? values[`${rowData.field}`]['secondOption']
                  : column.index === 4
                    ? values[`${rowData.field}`]['thirdOption']
                    : column.index === 5 &&
                    values[`${rowData.field}`]['fourOption']
              }
              disabled={
                evaluationSaved > 0
                  ? true
                  : column.index === 2
                    ? evaluationDisabled[`${rowData.field}`]['firstOption']
                    : column.index === 3
                      ? evaluationDisabled[`${rowData.field}`]['secondOption']
                      : column.index === 4
                        ? evaluationDisabled[`${rowData.field}`]['thirdOption']
                        : column.index === 5 &&
                          evaluationDisabled[`${rowData.field}`]['fourOption']
              }
              onChange={ (e) => {
                setFieldValue(
                  handleGetColumnField( column.index, rowData.field),
                  e.checked
                )
                if (e.checked === false) {
                  handleColumnCheckbox( 
                    rowData.field, getCheckboxOption(column.index), true
                  );
                } else {
                  handleColumnCheckbox( rowData.field, getCheckboxOption(column.index));
                }
              }}
            ></Checkbox>
          )
        }}
        style={{width}}
        className='text-center'
      ></Column>
    )
  });

  return (
    <>
      <DataTable
        value={evaluationQuestions} 
        resizableColumns 
        columnResizeMode="fit"
        stripedRows
        showGridlines
      >
        {getAutoEvaluationColumns}
      </DataTable>
    </>
  )
});
