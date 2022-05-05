import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';

import { startLoadTeachers, startRemoveTeachers } from '../../../actions/admin/teacher';
import { getGenderValue, getIdentificationTypeValue } from '../../../helpers/admin';
import { LeftToolbarTemplate } from '../LeftToolbarTemplate';
import { ActionBodyTemplate } from '../ActionBodyTemplate';
import { HeaderTemplate } from '../HeaderTemplate';
import { FormDialogFooterTemplate } from '../FormDialogFooterTemplate';
import { DeleteDialogFooterTemplate } from '../DeleteDialogFooterTemplate';
import { RowTeacherExpasionTemplate } from './RowTeacherExpasionTemplate';
import { TeacherDialogTemplate } from './TeacherDialogTemplate';
import { DeleteDialogTemplate } from '../DeleteDialogTemplate';
import { TeacherDataTable } from './TeacherDataTable';

export const TeacherTestScreen = () => {

    // useMemo(() => function, input)
    
    let emptyTeacher = null

    const initEmptyTeacher = ( empty ) => {
        empty = {
            id: null,
            username: '',
            email: '',
            person: {
                identification_type: null,
                identification: '',
                name: '',
                last_name: '',
                gender: null,
                age: null,
                phone: '',
            },
            title: '',
            objective: '',
        }

        return empty
    }

    const getEmptyTeacher = useMemo(() => initEmptyTeacher(emptyTeacher), [emptyTeacher]);

    const dispatch = useDispatch();
    const { teachers, loading } = useSelector(state => state.dashboard.teacher)
    const [teacher, setTeacher] = useState(getEmptyTeacher);
    const [teacherUpdate, setTeacherUpdate] = useState(null);
    const [teacherDialog, setTeacherDialog] = useState(false);
    const [deleteTeacherDialog, setDeleteTeacherDialog] = useState(false);
    const [deleteTeachersDialog, setDeleteTeachersDialog] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            identification_type: teacher.person.identification_type,
            identification: teacher.person.identification,
            name: teacher.person.name,
            last_name: teacher.person.last_name,
            gender: teacher.person.gender,
            age: teacher.person.age,
            phone: teacher.person.phone,
            username: teacher.username,
            email: teacher.email,
            title: teacher.title,
            objective: teacher.objective
        },
        validate: (data) => {
            let errors = {}

            if (data.identification_type < 0 && data.identification_type > 1) {
                errors.identification_type = 'El tipo de identificación es requerido.';
            }

            if (!data.identification) {
                errors.identification = 'La identificación es requerida.';
            } else if (data.identification_type === 0 && data.identification.length !== 10) {
                errors.identification = 'La identificación debe tener 10 números.';
            }

            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }

            if (!data.last_name) {
                errors.last_name = 'El apellido es requerido.';
            }

            if (data.gender < 0 && data.gender > 2) {
                errors.gender = 'El género es requerido.';
            }

            if (!data.age) {
                errors.age = 'La edad es requerida.';
            }

            if (!data.phone) {
                errors.phone = 'El número de contacto es requerido.';
            } else if (data.phone.length > 10) {
                errors.phone = 'El número de contacto no puede contener más de 10 números.'
            }

            if (!data.username) {
                errors.username = 'El nombre de usuario es requerido.';
            }

            if (!data.email) {
                errors.email = 'El email es requerido.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Correo inválido. Ej: ejemplo@email.com.';
            }

            if (!data.title) {
                errors.title = 'El título del Docente es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {

            if (showUpdate) {
                handleTeacherUpdate(data)
            } else {
                handleTeacherSubmit(data);
            }

            formik.resetForm();
        }
    });
    
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const selectTeachers = useCallback(
        ( teachers ) => {
            setSelectedTeachers(t => t = teachers)
        }, [setSelectedTeachers]);

    const expandRows = useCallback(
        ( data ) => {
            setExpandedRows( d => d = data )
        }, [setExpandedRows])

    const handleLoadTeachers = useCallback( () => {
        dispatch( startLoadTeachers() );
    }, [dispatch]);

    const handleTeacherSubmit = ( teacher ) => {

    }

    const handleTeacherUpdate = ( teacher ) => {

    }

    const handleTeacherDelete = useCallback(
        ( ) => {
            // Process
            setDeleteTeacherDialog(false);
            setTeacher(getEmptyTeacher());
        }, [setDeleteTeacherDialog, getEmptyTeacher] );

    const handleTeachersDelete = () => {

    }

    // const openNew = () => {
    //     setTeacher(emptyTeacher);
    //     setTeacherDialog(true);
    // }

    const openNew = useCallback(
        () => {
            setTeacher(getEmptyTeacher());
            setTeacherDialog(true);
        }, [setTeacher, setTeacherDialog, getEmptyTeacher])

    // const openUpdate = ( teacher ) => {
    //     setTeacherUpdate({...teacher});
    //     formik.setValues({
    //         identification_type: getIdentificationTypeValue(teacher.person.identification_type),
    //         identification: teacher.person.identification || '',
    //         name: teacher.person.name || '',
    //         last_name: teacher.person.last_name || '',
    //         gender: getGenderValue(teacher.person.gender),
    //         age: teacher.person.age || '',
    //         phone: teacher.person.phone || '',
    //         username: teacher.user.username || '',
    //         email: teacher.user.email || '',
    //         title: teacher.title,
    //         objective: teacher.objective
    //     });
    //     setTeacherDialog(true);
    //     setShowUpdate(true);
    // }

    const openUpdate = useCallback(
        ( teacher ) => {
            setTeacherUpdate({...teacher});
            formik.setValues({
                identification_type: getIdentificationTypeValue(teacher.person.identification_type),
                identification: teacher.person.identification || '',
                name: teacher.person.name || '',
                last_name: teacher.person.last_name || '',
                gender: getGenderValue(teacher.person.gender),
                age: teacher.person.age || '',
                phone: teacher.person.phone || '',
                username: teacher.user.username || '',
                email: teacher.user.email || '',
                title: teacher.title,
                objective: teacher.objective
            });
            setTeacherDialog(true);
            setShowUpdate(true);
        }, [setTeacherUpdate, setTeacherDialog, setShowUpdate, formik] )

    const hideDialog = () => {
        setTeacherDialog(false);
        setShowUpdate(false);
        formik.resetForm();
    }

    // const hideDeleteTeacherDialog = () => {
    //     setDeleteTeacherDialog(false);
    // }

    const hideDeleteTeacherDialog = useCallback(
        () => {
            setDeleteTeacherDialog(false);
        }, [setDeleteTeacherDialog])

    // const hideDeleteTeachersDialog = () => {
    //     setDeleteTeachersDialog(false);
    // }

    const hideDeleteTeachersDialog = useCallback(
        () => {
            setDeleteTeachersDialog(false);
        }, [setDeleteTeachersDialog])

    // const confirmDeleteTeacher = ( teacher ) => {
    //     setTeacher(teacher);
    //     setDeleteTeacherDialog(true);
    // }

    const confirmDeleteTeacher = useCallback(
        ( teacher ) => {
            setTeacher({ ...teacher });
            setDeleteTeacherDialog(true);
        }, [setTeacher, setDeleteTeacherDialog])

    // const confirmDeleteSelected = () => {
    //     setDeleteTeachersDialog(true);
    // }

    const confirmDeleteSelected = useCallback(
        () => {
            setDeleteTeacherDialog(true);
        }, [setDeleteTeacherDialog])

    const leftToolbar = (
        <LeftToolbarTemplate 
            openNew ={openNew}
            labels = {{
                new: 'Nuevo Docente',
                delete: 'Eliminar Docente/s'
            }}
            selectedTeachers = {selectedTeachers}
            confirmDeleteSelected = {confirmDeleteSelected}
        />
    );

    // const actionBodyTemplate = (rowData) => {
    //     return (
    //         <ActionBodyTemplate 
    //             rowData = {rowData}
    //             openUpdate = {openUpdate}
    //             confirmDelete = {confirmDeleteTeacher}
    //         />
    //     );
    // }

    const actionBodyTemplate = useCallback(
        ( rowData ) => {
            return (
                <ActionBodyTemplate 
                    rowData = {rowData}
                    openUpdate = {openUpdate}
                    confirmDelete = {confirmDeleteTeacher}
                />
            );
        }, [openUpdate, confirmDeleteTeacher] );

    const header = (
        <HeaderTemplate
            title = {'ADMINISTRAR DOCENTES'} 
            setGlobalFilter = {setGlobalFilter}
        />
    );

    const teacherDialogFooter = (
        <FormDialogFooterTemplate 
            hideDialog = {hideDialog}
            handleSubmit = {formik.handleSubmit}
        />
    );

    const deleteTeacherDialogFooter = (
        <DeleteDialogFooterTemplate 
            handleDelete = {handleTeacherDelete}
            hideDeleteDialog = {hideDeleteTeacherDialog}
        />
    );

    // const deleteTeacherDialogFooter = useCallback(
    //     () => {
    //         return (
    //             <DeleteDialogFooterTemplate 
    //                 handleDelete = {handleTeacherDelete}
    //                 hideDeleteDialog = {hideDeleteTeacherDialog}
    //             />
    //         )
    //     }, [handleTeacherDelete, hideDeleteTeacherDialog])

    const deleteTeachersDialogFooter = (
        <DeleteDialogFooterTemplate 
            handleDelete = {handleTeachersDelete}
            hideDeleteDialog = {hideDeleteTeachersDialog}
        />
    );

    const rowExpansionTemplate = (data) => {
        return(
            <RowTeacherExpasionTemplate  
                teacher = {data}
            />
        );
    }

    useEffect(() => {
        handleLoadTeachers();
        return () => {
            dispatch( startRemoveTeachers() );
        }
    }, [handleLoadTeachers, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbar}>
                    </Toolbar>

                    <TeacherDataTable 
                        dataTable = {dataTable}
                        teachers = {teachers}
                        selectedTeachers = {selectedTeachers}
                        globalFilter = {globalFilter}
                        header = {header}
                        loading = {loading}
                        expandedRows = {expandedRows}
                        rowExpansionTemplate = {rowExpansionTemplate}
                        setSelectedTeachers = {selectTeachers}
                        setExpandedRows = {expandRows}
                        actionBodyTemplate = {actionBodyTemplate}
                    />

                    <TeacherDialogTemplate 
                        formik = {formik}
                        showUpdate = {showUpdate}
                        hideDialog = {hideDialog}
                        teacherDialog = {teacherDialog}
                        isFormFieldValid = {isFormFieldValid}
                        teacherDialogFooter = {teacherDialogFooter}
                        getFormErrorMessage = {getFormErrorMessage}
                    />

                    <DeleteDialogTemplate 
                        data = {teacher}
                        message = '¿Está seguro que desea eliminar a'
                        deleteDialog = {deleteTeacherDialog}
                        hideDeleteDialog = {hideDeleteTeacherDialog}
                        deleteDialogFooter = {deleteTeacherDialogFooter}
                    />

                    <DeleteDialogTemplate 
                        data = {teacher}
                        selectedData = {selectedTeachers}
                        deleteDialog = {deleteTeachersDialog}
                        hideDeleteDialog = {hideDeleteTeachersDialog}
                        deleteDialogFooter = {deleteTeachersDialogFooter}
                    />

                </div>
            </div>
        </div>
    )
}
