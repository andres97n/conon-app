import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StudentOpinionStepOneAbpApp } from './StudentOpinionStepOneAbpApp';
import { OpinionsSavedStepOneApp } from './OpinionsSavedStepOneApp';
import { TeamOpinionsStepOneApp } from './TeamOpinionsStepOneApp';

import { 
    startLoadOpinionStepOneAbpDetailList, 
    startLoadOpinionStepOneAbpList, 
    startRemoveInteractionStepOneAbpList, 
    startRemoveOpinionStepOneAbpList,
} from '../../../../../actions/student/abp_steps/opinionStepOneAbp';

export const StudentAbpStepOneApp = React.memo(({
    teamDetail,
    toast
}) => {

    const dispatch = useDispatch();
    const { opinionStepOneAbp, opinionsTeamAbp, loadingOpinionStepOneAbp } = 
    useSelector(
        state => state.dashboard.opinionStepOne
    );
    const [opinionCount, setOpinionCount] = useState(0);
    const { 
        team_detail_abp = null, 
        user = null,
    } = teamDetail;

    const handleSetOpinionCount = useCallback(
      ( data, type ) => {
        if (type) {
            if (type === 'more') {
                setOpinionCount( oldState => oldState + 1 );
            } else if (type === 'less') {
                setOpinionCount( oldState => oldState - 1 );
            }
        } else {
            setOpinionCount( data );
        }
      },
      [setOpinionCount],
    );
    
    const handleLoadTeamOpinions = useCallback(
      ( id, team_detail_abp, user ) => {
        dispatch( startLoadOpinionStepOneAbpList( team_detail_abp ) );
        dispatch(startLoadOpinionStepOneAbpDetailList( id, user.id ));
      },
      [dispatch],
    );
    
    const handleRemoveTeamOpinions = useCallback(
        () => {
            dispatch(startRemoveOpinionStepOneAbpList());
            dispatch(startRemoveInteractionStepOneAbpList());
        },
        [dispatch],
    );

    useEffect(() => {
      handleSetOpinionCount(opinionStepOneAbp.length);
    }, [opinionStepOneAbp, handleSetOpinionCount]);
    

    useEffect(() => {
        if (
            teamDetail && 
            Object.keys(teamDetail).length > 0
        ) {
            handleLoadTeamOpinions( 
                teamDetail.id, 
                teamDetail.team_detail_abp, 
                teamDetail.user 
            );
        }
        return () => {
            if (
                teamDetail && 
                Object.keys(teamDetail).length > 0 
            ) {
                handleRemoveTeamOpinions();
            }
        }
    }, [teamDetail, handleLoadTeamOpinions, handleRemoveTeamOpinions]);
    
  return (
    <>
        <div className='col-12'>
            <div className='card'>
                <div className='grid p-fluid'>
                    <div className='col-12'>
                        <h5 className='text-center'>
                            <i className="fas fa-comment-dots mr-2"></i>
                            Analizo lo siguiente...
                        </h5>
                    </div>
                    {
                        <StudentOpinionStepOneAbpApp 
                            opinionCount={opinionCount}
                            handleSetOpinionCount={handleSetOpinionCount}
                            team_detail_abp={team_detail_abp}
                            toast={toast}
                        />
                    }
                    <div className='col-12'>
                        {
                            (opinionStepOneAbp.length > 0)
                                && (
                                    <OpinionsSavedStepOneApp
                                        opinionStepOneAbp={opinionStepOneAbp}
                                        handleSetOpinionCount={handleSetOpinionCount}
                                        toast={toast}
                                    />
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='col-12'>
            {
                <TeamOpinionsStepOneApp
                    loadingOpinionStepOneAbp={loadingOpinionStepOneAbp}
                    opinionsTeamAbp={opinionsTeamAbp}
                    userId={user?.id}
                />
            }
        </div>
    </>
  )
});
