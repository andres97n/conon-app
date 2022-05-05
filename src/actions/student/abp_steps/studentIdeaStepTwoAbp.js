import Swal from "sweetalert2";

import { abpStepsTypes } from "../../../types/abpStepsTypes";
import { fetchWithToken } from "../../../helpers/fetch";
import { changeDate, getError } from "../../../helpers/admin";
import { getRateStudentIdeaAbpDataErrorMessage, getStudentIdeaAbpDataErrorMessage, getStudentIdeaAbpDataManyErrorMessage, getStudentIdeaStepTwoAbpData } from "../../../helpers/abp-steps";

export const startLoadIdeaStepTwoAbpList = ( teamDetailId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingStudentIdeaStepTwoAbp() );
            const resp_student_idea_abp = await fetchWithToken( 
                `abp-steps/api/path/step-two/student-idea/team-detail/${teamDetailId}/` 
            );
            const body_student_idea_abp = await resp_student_idea_abp.json();
    
            if (body_student_idea_abp.ok) {
                dispatch( setStudentIdeaStepTwoAbpList( changeDate(
                    body_student_idea_abp.conon_data
                )));
                dispatch( endLoadingStudentIdeaStepTwoAbp() );
            } else {
                Swal.fire('Error', body_student_idea_abp.detail, 'error');
                dispatch( endLoadingStudentIdeaStepTwoAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingStudentIdeaStepTwoAbp() );
        }
    }
}

export const startLoadRateIdeaStepTwoAbpTeamList = ( teamId, userId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRateStudentIdeaStepTwoAbp() );
            const resp_rate_student_idea_abp = await fetchWithToken( 
                `abp-steps/api/path/step-two/student-idea/team-student-ideas-rates/${teamId}/${userId}/` 
            );
            const body_rate_student_idea_abp = await resp_rate_student_idea_abp.json();
    
            if (body_rate_student_idea_abp.ok) {
                dispatch( setRateStudentIdeaStepTwoAbp( 
                    body_rate_student_idea_abp.conon_data
                ));
                dispatch( endLoadingRateStudentIdeaStepTwoAbp() );
            } else {
                Swal.fire('Error', body_rate_student_idea_abp.detail, 'error');
                dispatch( endLoadingRateStudentIdeaStepTwoAbp() );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
            dispatch( endLoadingRateStudentIdeaStepTwoAbp() );
        }
    }
}

export const startLoadTeamIdeasAndRatesStepTwoAbpList = ( teamId ) => {
    return async (dispatch) => {
        try {
            dispatch( startLoadingRateStudentIdeaStepTwoAbp() );
            const resp_rate_student_idea_abp = await fetchWithToken( 
                `abp-steps/api/path/step-two/student-idea/team-ideas-rates/${teamId}/` 
            );
            const body_rate_student_idea_abp = await resp_rate_student_idea_abp.json();
    
            if (body_rate_student_idea_abp.ok) {
                dispatch( setRateStudentIdeaStepTwoAbp( 
                    body_rate_student_idea_abp.conon_data
                ));
                dispatch( endLoadingRateStudentIdeaStepTwoAbp() );
            } else {
                Swal.fire('Error', body_rate_student_idea_abp.detail, 'error');
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startSaveStudentIdeaStepTwoAbp = ( studentIdeaAbp, toast ) => {
    return async ( dispatch ) => {
        try {
            const resp_student_idea_abp = await fetchWithToken( 
                'abp-steps/api/step-two/student-idea/', 
                studentIdeaAbp, 
                'POST'  
            );
            const body_student_idea_abp = await resp_student_idea_abp.json();

            if ( body_student_idea_abp.ok ) {
                if (typeof body_student_idea_abp.student_idea === 'number') {
                    dispatch( addNewStudentIdeaStepTwoAbp( 
                        getStudentIdeaStepTwoAbpData(
                            studentIdeaAbp, body_student_idea_abp.student_idea
                        ) 
                    ));
                } else if (Array.isArray(body_student_idea_abp.student_idea)) {
                    body_student_idea_abp.student_idea.forEach( idea => {
                        dispatch( addNewStudentIdeaStepTwoAbp(
                            getStudentIdeaStepTwoAbpData( idea, idea.id )
                        ));
                    });
                }
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_student_idea_abp.message, 
                    life: 4000 });
                
            } else if ( body_student_idea_abp.detail ) {
                Swal.fire(
                    'Error',
                    (Array.isArray(body_student_idea_abp.detail))
                        ? (
                            getStudentIdeaAbpDataManyErrorMessage()
                        )
                        : (
                            getError( 
                                body_student_idea_abp.detail, 
                                getStudentIdeaAbpDataErrorMessage 
                            )

                        ),
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_student_idea_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

export const startBlockStudentIdeaStepTwoAbp = ( studentIdeaId, toast ) => {
    return async (dispatch) => {
        try {
            const resp_student_idea_abp = await fetchWithToken( 
                `abp-steps/api/step-two/student-idea/${studentIdeaId}/block/`, 
                {}, 
                'DELETE'  
            );
            const body_student_idea_abp = await resp_student_idea_abp.json();

            if ( body_student_idea_abp.ok ) {
                dispatch( blockStudentIdeaStepTwoAbp(studentIdeaId));

                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Conon Informa', 
                    detail: body_student_idea_abp.message, 
                    life: 4000 });
                
            } else if ( body_student_idea_abp.detail ) {
                Swal.fire(
                    'Error', 
                    body_student_idea_abp.detail, 
                    'error'
                );
            } 
        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador.`, 'error'
            );
        }
    }
}

export const startUpdateRateStudentIdeaStepTwoAbp = ( 
    rateStudentIdeaAbp, studentIdeaAbp 
) => {
    return async ( dispatch ) => {
        try {
            const resp_rate_student_idea_abp = await fetchWithToken( 
                `abp-steps/api/step-two/rate-student-idea/${rateStudentIdeaAbp.id}/`, 
                {
                    user: rateStudentIdeaAbp.user,
                    student_idea_step_two_abp: rateStudentIdeaAbp.student_idea_step_two_abp,
                    rate_student_idea: rateStudentIdeaAbp.rate_student_idea
                }, 
                'PUT'  
            );
            const body_rate_student_idea_abp = await resp_rate_student_idea_abp.json();

            if ( body_rate_student_idea_abp.ok ) {
                dispatch( updateRateStudentIdeaStepTwoAbp(studentIdeaAbp) );
            } else if ( body_rate_student_idea_abp.detail ) {
                Swal.fire(
                    'Error', 
                    getError( 
                        body_rate_student_idea_abp.detail, 
                        getRateStudentIdeaAbpDataErrorMessage 
                    ), 
                    'error'
                );
            } else {
                Swal.fire(
                    'Error', `${body_rate_student_idea_abp}, consulte con el Desarrollador.`, 'error'
                );
            }

        } catch (error) {
            Swal.fire(
                'Error', `${error}, consulte con el Desarrollador`, 'error'
            );
        }
    }
}

const setStudentIdeaStepTwoAbpList = ( studentIdeaList ) => ({
    type: abpStepsTypes.studentIdeaStepTwoList,
    payload: studentIdeaList
});

export const startRemoveStudentIdeaStepTwoAbpList = () => ({
    type: abpStepsTypes.studentIdeaStepTwoRemove
});

const startLoadingStudentIdeaStepTwoAbp = () => ({
    type: abpStepsTypes.studentIdeaStepTwoLoad
});

const endLoadingStudentIdeaStepTwoAbp = () => ({
    type: abpStepsTypes.studentIdeaStepTwoStop
});

const addNewStudentIdeaStepTwoAbp = ( studentIdeaAbp ) => ({
    type: abpStepsTypes.studentIdeaStepTwoNew,
    payload: studentIdeaAbp
});

const blockStudentIdeaStepTwoAbp = ( studentIdeaAbpId ) => ({
    type: abpStepsTypes.studentIdeaStepTwoBlock,
    payload: studentIdeaAbpId
});

const setRateStudentIdeaStepTwoAbp = ( rateStudentIdeaAbpList ) => ({
    type: abpStepsTypes.rateStudentIdeaStepTwoList,
    payload: rateStudentIdeaAbpList
});

export const startRemoveRateStudentIdeaStepTwoAbpList = () => ({
    type: abpStepsTypes.rateStudentIdeaStepTwoRemove
});

const startLoadingRateStudentIdeaStepTwoAbp = () => ({
    type: abpStepsTypes.rateStudentIdeaStepTwoLoad,
});

const endLoadingRateStudentIdeaStepTwoAbp = () => ({
    type: abpStepsTypes.rateStudentIdeaStepTwoStop
});

const updateRateStudentIdeaStepTwoAbp = ( rateStudentIdeaStepTwoAbp ) => ({
    type: abpStepsTypes.rateStudentIdeaStepTwoUpdate,
    payload: rateStudentIdeaStepTwoAbp
});
