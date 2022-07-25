import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toolbar } from 'primereact/toolbar';

import { OwnerHeaderApp } from '../../admin/owner/OwnerHeaderApp';

import { startUpdateClassroomWithStudents } from '../../../actions/admin/classroom';
import { 
    getDataIdsForModel, 
    getExcludeStudentsToClassroom
} from '../../../helpers/admin';


export const DTBlockClassroomTable = React.memo(({
    classroom,
    toast
}) => {

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.classroom);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const dataTable = useRef(null);

    const handlePutStudents = ( selectedStudents ) => {
        const studentsKeys = getDataIdsForModel( selectedStudents ); 
        const newClassroom = (({id, created_at, ...newClassroom}) => ({
            ...newClassroom,
            school_period: classroom.school_period.id,
            students: getExcludeStudentsToClassroom( students, studentsKeys ) 
        }))(classroom);
        dispatch( 
            startUpdateClassroomWithStudents(
                newClassroom, 
                classroom, 
                studentsKeys, 
                toast
            ) 
        );
        setSelectedStudents([]);
    }

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const handleConfirmDenyStudents = ( data ) => {
        confirmDialog({
          message: data.length === 1
            ? '¿Está seguro que desea denegar el siguiente Estudiante?'
            : '¿Está seguro que desea denegar los siguientes Estudiantes?',
          header: 'Confirmación de Denegación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, denegar',
          rejectLabel: 'No denegar',
          acceptClassName: 'p-button-secondary',
          accept: () => handlePutStudents( data ),
        });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label={
                        selectedStudents.length < 2
                            ? "Denegar Estudiante"
                            : "Denegar Estudiantes"
                    } 
                    icon="fas fa-ban"  
                    className="p-button-secondary" 
                    disabled={selectedStudents.length === 0}
                    onClick={() => handleConfirmDenyStudents(selectedStudents)} 
                />
            </React.Fragment>
        );
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <Toolbar
                    className="mb-4" 
                    left={leftToolbarTemplate}
                ></Toolbar>
                <DataTable
                    ref={dataTable} 
                    value={students} 
                    selection={selectedStudents} 
                    globalFilter={globalFilter}
                    header={
                        <OwnerHeaderApp
                          title={'Estudiantes Asignados'}
                          icon={'fas fa-user-graduate mr-2 icon-primary'}
                          placeholder={'Buscar Estudiantes...'}
                          withActive={false}
                          setGlobalFilter={handleSetGlobalFilter}
                          handleNewData={() => {}}
                        />
                    }
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Estudiantes para Denegar.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                    LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} 
                    estudiantes"
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
                    <Column 
                        className='text-center'
                        field="email" 
                        header="Correo" 
                        sortable
                    ></Column>
                </DataTable>
            </div>
        </div>
    )
});
