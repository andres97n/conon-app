import { fetchWithToken } from "./fetch";

export const identification_choices = [
    { label: 'Ci', value: 1 },
    { label: 'Otro', value: 2  }
];

export const gender_choices = [
    { label: 'Femenino', value: 1 },
    { label: 'Masculino', value: 2  },
    { label: 'Otro', value: 3  }
];

export const getIdentificationTypeLabel = ( data ) => {
    let result = null;
    identification_choices.forEach( type => {
        if (type.value === data) {
            result = type.label;
        }
    });
    return result
}

export const getGenderLabel = ( data ) => {
    let result = null;
    gender_choices.forEach( type => {
        if (type.value === data) {
            result = type.label;
        }
    });
    return result
}

export const getIdentificationTypeValue = ( data ) => {
    let result = null;
    identification_choices.forEach( type => {
        if (type.label === data) {
            result = type.value;
        }
    });
    return result
}

export const getGenderValue = ( data ) => {
    let result = null;
    gender_choices.forEach( gender => {
        if (gender.label === data) {
            result = gender.value
        }
    });
    return result;
}

export const getPersonErrorMessage = ( detail ) => {
    
    if ( detail.identification_type ) {
        return detail.identification_type[0]
    } else if ( detail.identification ) {
        return detail.identification[0]
    } else if ( detail.name ) {
        return detail.name[0]
    } else if ( detail.last_name ) {
        return detail.last_name[0]
    } else if ( detail.gender ) {
        return detail.gender[0]
    } else if ( detail.age ) {
        return detail.age[0]
    } else if ( detail.phone ) {
        return detail.phone[0]
    } else {
        return 'Error, consulte con el Administrador.';
    }

}

export const savePerson = async ( data ) => {
    const person = {
        identification_type: data.identification_type,
        identification: data.identification,
        name: data.name,
        last_name: data.last_name,
        gender: data.gender,
        age: data.age,
        phone: data.phone
    }
    try {
        
        const resp_person = await fetchWithToken( 
            'user/api/person/', person, 'POST' 
        );
        return await resp_person.json();
        
    } catch (error) {
        return error;
    }

}

export const updatePerson = async ( data, person_id )  => {

    const person = {
        identification_type: data.identification_type,
        identification: data.identification,
        name: data.name,
        last_name: data.last_name,
        gender: data.gender,
        age: data.age,
        phone: data.phone
    }

    try {

        const resp_person = await fetchWithToken( 
            `user/api/person/${person_id}/`, person, 'PUT' 
        );
        return await resp_person.json();

    } catch (error) {
        return error;
    }

}

export const deletePerson = async ( person_id ) => {

    try {

        const resp_person = await fetchWithToken(
            `user/api/person/${person_id}/`, 
            {}, 
            'DELETE' 
        );
        return await resp_person.json();

    } catch (error) {
        return error;
    }

}

export const deletePersons = async ( persons ) => {

    try {
        
        const resp_person = await fetchWithToken(
            'user/api/person/destroy-persons/', 
            {
                persons
            }, 
            'DELETE' 
        );
        return await resp_person.json();

    } catch (error) {
        return error;
    }

}

export const isPhoneValid = ( phone ) => {

    let valid = true;

    if ( phone.substr(0, 2) === '09' ) {
        if ( phone.length !== 10 ) {
            valid = false;
        }
    } else if ( phone.substr(0, 2) === '07') {
        if ( phone.length !== 9 ) {
            valid = false;
        }
    } else if ( phone.substr(0, 1) === '2') {
        if ( phone.length !== 7 ) {
            valid = false;
        }
    } else {
        valid = false;
    }

    return valid;
} 