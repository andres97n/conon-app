import React from 'react';
import { useSelector } from 'react-redux';

import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { TabView,TabPanel } from 'primereact/tabview';

import { LoginFormApp } from './LoginFormApp';
import { PasswordChangeApp } from './PasswordChangeApp';
import { ValidateUsernameApp } from './ValidateUsernameApp';


export const LoginScreen = () => {

    const { isUsernameValid } = useSelector(state => state.auth);

    const headerCardTemplate = () => (
        <React.Fragment>
            <Image 
                src={'Conon.png'}
                alt='Conon Logo'
                width={230}
                className='center-image'
            />
        </React.Fragment>
    );

    const subTitleCardTemplate = () => (
        <React.Fragment>
            <h5 className='text-center'>
                INICIO DE SESIÓN
            </h5>
        </React.Fragment>
    );

    return (
        <>
            <div className='parent color-base'>
                <Card 
                    title={headerCardTemplate}
                    subTitle={subTitleCardTemplate}
                    style={{width: '400px'}}
                >
                    {
                        (!isUsernameValid)
                            ? (
                                <TabView>
                                    <TabPanel 
                                        header="Abrir Sesión"
                                        leftIcon='fas fa-house-user mr-2'
                                    >
                                        <LoginFormApp />
                                    </TabPanel>
                                    <TabPanel 
                                        header="Cambiar Contraseña"
                                        leftIcon='fas fa-exchange-alt mr-2'
                                    >
                                        <ValidateUsernameApp/>
                                    </TabPanel>
                                </TabView>

                            )
                            : (
                                <PasswordChangeApp />
                            )
                    }
                </Card>
            </div>
        </>
    )
}
