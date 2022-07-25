import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';

import { 
    startLoadStudentsByClassroom, 
    startSaveStudentsByClassroom 
} from '../../../actions/admin/classroom';
import { 
    getDataIdsForModel, 
    setRangeNumberInput 
} from '../../../helpers/admin';


export const AssingClassroomTable = React.memo(({
    classroom,
    toast
}) => {

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.classroom);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [age, setAge] = useState(15);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dataTable = useRef(null);

    const handlePutStudents = ( selectedStudents ) => {
        dispatch( startSaveStudentsByClassroom(
            getDataIdsForModel(selectedStudents),
            classroom.id,
            toast
        ));
        setSelectedStudents([]);
    }

    const setChangeAge = (event) => {
        setAge(event.value);
        if (classroom) {
            dispatch( startLoadStudentsByClassroom( classroom.id, event.value ) );
        }
    }
    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const handleConfirmAssignStudents = ( data ) => {
        confirmDialog({
          message: 
            selectedStudents.length === 1
                ? ('¿Está seguro que desea asignar el siguiente Estudiante?')
                : ('¿Está seguro que desea asignar los siguiente Estudiantes?'),
          header: 'Confirmación de Asignado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, asignar',
          rejectLabel: 'No asignar',
          accept: () => handlePutStudents( data ),
        });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label={
                        selectedStudents.length < 2
                            ? "Asignar Estudiante"
                            : "Asignar Estudiantes"
                    } 
                    icon="fas fa-check"  
                    className="p-button-primary mr-4" 
                    disabled={selectedStudents.length === 0}
                    onClick={() => handleConfirmAssignStudents(selectedStudents)}
                />
                <InputNumber
                    id='age'
                    name= 'age'
                    value={setRangeNumberInput(age, 20, 5)} 
                    min={5} max={20}
                    size={1}
                    tooltip='Filtar estudiantes por edad'
                    tooltipOptions={{className: 
                        'purple-tooltip', position: 'bottom'
                    }}
                    showButtons buttonLayout="horizontal"
                    decrementButtonClassName="p-button-danger" 
                    incrementButtonClassName="p-button-success" 
                    incrementButtonIcon="fas fa-plus" 
                    decrementButtonIcon="fas fa-minus" 
                    onValueChange={setChangeAge} 
                />
            </React.Fragment>
        );
    }

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <Toolbar 
                    className="mb-4" 
                    left={leftToolbarTemplate}
                ></Toolbar>
            </div>
            <div className="col-12">
                <DataTable
                    ref={dataTable} 
                    value={students} 
                    selection={selectedStudents} 
                    globalFilter={globalFilter}
                    header={
                        <OwnerHeaderApp
                          title={'Estudiantes No Asignados'}
                          icon={'fas fa-hand-pointer mr-2 icon-primary'}
                          placeholder={'Buscar Estudiantes...'}
                          withActive={false}
                          setGlobalFilter={handleSetGlobalFilter}
                          handleNewData={() => {}}
                        />
                    }
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Estudiantes para Agregar.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                    LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} estudiantes"
                    resizableColumns 
                    columnResizeMode="expand"
                    className="datatable-responsive"
                    showGridlines
                    onSelectionChange={(e) => setSelectedStudents(e.value)}
                >
                    <Column 
                        selectionMode="multiple" 
                        headerStyle={{ width: '3rem' }}
                    ></Column>
                    <Column
                        className='text-center'
                        field="identification" 
                        header="Identificación" 
                        sortable
                    ></Column>
                    <Column
                        className='text-center'
                        field="name" 
                        header="Nombres" 
                        sortable
                    ></Column>
                    <Column
                        className='text-center'
                        field="age" 
                        header="Edad" 
                        sortable
                    ></Column>
                </DataTable>
            </div>
        </div>
    )
})
