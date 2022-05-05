import { 
  clearLocalStorageEditorImage, 
  clearLocalStorageTabImage, 
  getClearLocalStorageAudio, 
  getLocalAudio, 
  getLocalImages 
} from "./header";

export const getAbpFormFields = ({
  problem: '',
  oral_explication: [],
  descriptive_image: {},
  reference_url: '',
});

export const getAbpFormFieldsErrors = ( data, errors ) => {
  if (!data.problem) {
    errors.problem = 
    'El problema es requerido.';
  }
  if (data.oral_explication.length === 0) {
    errors.oral_explication = 'La explicación oral es requerida.';
  }
  if (Object.keys(data.descriptive_image).length === 0) {
    errors.descriptive_image = 'La imagen descriptiva es obligatoria.';
  }

  return errors;
}

export const getAbpMethodologyImages = () => {
  let abpImages = [];
  const writeImages = getLocalImages( 'problem' );
  const firstImage = getLocalImages( 'descriptive_image', true );
  Object.values(writeImages).forEach( 
    value => value && (abpImages = [ ...abpImages, value ])
  );
  Object.values(firstImage).forEach( 
    value => value && (abpImages = [ ...abpImages, value ])
  );
  return abpImages;
}

export const getAbpMethodologyAudios = () => {
  let abpAudios = [];
  const firstAudio = getLocalAudio( 'oral_explication', 1 );
  const secondAudio = getLocalAudio( 'oral_explication', 2 );
  if (firstAudio) {
    abpAudios.push(firstAudio);
  }
  if (secondAudio) {
    abpAudios.push(secondAudio);
  }
  return abpAudios;
}

export const getAbpMethodologyData = ( data ) => ({
  problem: data.problem,
  oral_explication: data.oral_explication,
  descriptive_image: data.descriptive_image,
  reference_url: data.reference_url,
  state: 1
});

export const clearAllAbpLocalStorageFiles = () => {
  clearLocalStorageEditorImage( 'problem' );
  clearLocalStorageTabImage( 'descriptive_image' );
  getClearLocalStorageAudio( 'oral_explication' );
} 