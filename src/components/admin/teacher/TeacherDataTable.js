import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const TeacherDataTable = React.memo(({
    dataTable,
    teachers,
    selectedTeachers,
    globalFilter,
    header,
    loading,
    expandedRows,
    rowExpansionTemplate,
    setSelectedTeachers,
    setExpandedRows,
    actionBodyTemplate
}) => {
    return (
        <DataTable
            ref={dataTable} 
            value={teachers} 
            selection={selectedTeachers} 
            globalFilter={globalFilter}
            header={header}
            loading={loading}
            expandedRows={expandedRows}
            rowExpansionTemplate={rowExpansionTemplate}
            className="datatable-responsive"
            dataKey="id" paginator rows={10} 
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} de {totalRecords} docentes"
            emptyMessage='No existen Docentes.'
            resizableColumns columnResizeMode="expand"
            onSelectionChange={(e) => setSelectedTeachers(e.value)}
            onRowToggle={(e) => setExpandedRows(e.data)}
            // rowsPerPageOptions={[5, 10, 25]}
        >
            <Column expander style={{ width: '4em' }} />
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="person.identification" header="Identificación" sortable></Column>
            <Column field="person.name" header="Nombres" sortable></Column>
            <Column field="person.last_name" header="Apellidos" sortable></Column>
            {/*USER DATA */}
            <Column field="user.username" header="Nombre de Usuario"sortable></Column>
            <Column field="user.email" header="Email" sortable></Column>
            <Column body={actionBodyTemplate}></Column>
        </DataTable>
    )
})
