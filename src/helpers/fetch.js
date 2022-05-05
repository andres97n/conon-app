
const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${ baseUrl }/${ endpoint}/`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

const fetchWithToken = async ( endpoint, data, method = 'GET' ) => {
    await verifyTokens();
    const url = `${ baseUrl }/${ endpoint }`;
    const access_token = localStorage.getItem('a_token') || '';

    if ( method === 'GET' ) {
        return fetch(
            url,
            {
                method,
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );
    } else {
        return fetch(
            url,
            {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify( data )
            }
        );
    }

}

const reloadToken = async () => {
    try {
        const refresh_token = localStorage.getItem('r_token') || '';
        const resp = await fetchWithoutToken(
            'token/refresh',
            {
                refresh: refresh_token
            },
            'POST'
        );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem('a_token', body.conon_data.tokens.access);
            localStorage.setItem('r_token', body.conon_data.tokens.refresh);
        }

    } catch (error) {
        console.log(error);
    }
}

const isValidToken = async ( token ) => {
    try {
        const resp = await fetchWithoutToken(
            'token/verify',
            {
                token
            },
            'POST'
        )
        if (resp.status === 200) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

const verifyTokens = async () => {
    try {
        const access_token = localStorage.getItem('a_token') || '';
        const refresh_token = localStorage.getItem('r_token') || '';
        const isRefreshValid = await isValidToken( refresh_token );
        
        if (isRefreshValid) {
            const isAccessValid = await isValidToken( access_token );
            if (!isAccessValid) {
                await reloadToken();
            }
        }else {
            await reloadToken();
        }
        // const dispatch = useDispatch();
        // dispatch( logout() );

    } catch (error) {
        console.log(error);
    }
}

export {
    fetchWithoutToken,
    fetchWithToken,
    reloadToken
}