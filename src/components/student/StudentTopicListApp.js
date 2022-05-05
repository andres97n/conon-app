import React from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';

import { getMethodologyAbrevNameType } from '../../helpers/topic';
import { changeObjectFullDate } from '../../helpers/topic/student/ac/acCoordinator';


export const StudentTopicListApp = React.memo(({
    activeTopics,
    handleSelectTopic,
}) => {
    
    const titleCardTemplate = ( title, type ) => (
        <React.Fragment>
            <div className='center-inside'>
                <Badge 
                    value={getMethodologyAbrevNameType(type)} 
                    severity="success"
                ></Badge>
            </div>
          <h5 
            className='text-center' 
            style={{textAlign:'justify'}}
        >
            {title}
        </h5>
        </React.Fragment>
    );
    
    const subTitleCardTemplate = ( topic ) => (
        <React.Fragment>
            <div className='grid p-fluid'>
                <div className='col-12'>
                    <div className='center-inside mt-2'>
                        <Tag 
                            value={changeObjectFullDate(topic.start_at)} 
                            icon="fas fa-door-open"
                            className='mr-2'
                        ></Tag>
                        <Tag 
                            value={changeObjectFullDate(topic.end_at)} 
                            icon="fas fa-door-closed"
                            severity='warning'
                        ></Tag>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

  return (
    <>
        {
            activeTopics.map((topic, index) => (
                <div className='col-4' key={index}>
                    <div className='grid p-fluid'>
                        <div className='col-12' >
                            <Card
                                title={() => titleCardTemplate(topic.title, topic.type)} 
                                subTitle={() => subTitleCardTemplate(topic)}
                            >
                                <Button
                                label="Realizar Tópico" 
                                icon="fas fa-book-reader fa-lg"
                                iconPos='top'
                                className="p-button-raised"
                                onClick={() => handleSelectTopic(topic)}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            ))
        }
    </>
  );
});
