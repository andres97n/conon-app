import React, { useEffect, useState } from 'react';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import { ScrollPanel } from 'primereact/scrollpanel';
import { InputText } from 'primereact/inputtext';

import { getMethodologyAbrevNameType } from '../../helpers/topic';
import { changeObjectFullDate } from '../../helpers/topic/student/ac/acCoordinator';


export const StudentTopicListApp = React.memo(({
    activeTopics,
    handleSelectTopic,
}) => {

    const [filteredTopics, setFilteredTopics] = useState([]);

    const searchTopics = (event) => {
        let _filteredTerms;
        if (!event.trim().length) {
        _filteredTerms = [ ...activeTopics ];
        } else {
        _filteredTerms = activeTopics.filter( topic => (
            topic.title.toLowerCase().includes(event.toLowerCase())
        ));
        }
        setFilteredTopics(_filteredTerms);
    }
    
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

    useEffect(() => {
        if (activeTopics.length > 0 && filteredTopics.length === 0) {
          setFilteredTopics(activeTopics);
        }
    }, [activeTopics, filteredTopics]);

  return (
    <ScrollPanel
        className="custombar1" 
        style={{ 
            width: '100%', 
            height: activeTopics.length === 0 ? '50px' : '550px' 
        }}
    >
        <div className='grid p-fluid'>
            <div className='col-12'>
                <div className='center-inside'>
                    <div className='col-6'>
                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                        <i className="fas fa-search" />
                        <InputText
                            type="search" 
                            placeholder='Buscar Tópico'
                            onInput={(e) => searchTopics(e.target.value)} 
                        />
                        </span>
                    </div>
                </div>
            </div>
            {
                filteredTopics.map((topic, index) => (
                    <div className='col-4' key={index}>
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
                ))
            }
        </div>
    </ScrollPanel>
  );
});
