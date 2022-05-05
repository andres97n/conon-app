import React from 'react';

export const RowTeacherExpasionTemplate = ({ teacher }) => {
    return (
        <div className="orders-subtable">
            <h5>Detalle de {teacher.person.name} {teacher.person.last_name}</h5>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className='card'>
                        <div className="p-d-flex p-flex-wrap">
                            <div className="p-mr-2 p-mb-2">
                                <h6>Tipo de Identificación</h6>
                                {teacher.person.identification_type}
                            </div>
                            <div className='p-mr-2 p-mb-2'>
                                <h6>Identificación</h6>
                                {teacher.person.identification}
                            </div>
                            <div>
                                <h6>Nombres</h6>
                                {teacher.person.name}
                            </div>
                            <div>
                                <h6>Apellidos</h6>
                                {teacher.person.last_name}
                            </div>
                            <div>
                                <h6>Género</h6>
                                {teacher.person.gender}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
