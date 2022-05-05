import { 
  clearLocalStorageEditorImage, 
  getClearLocalStorageAudio, 
  getLocalAudio, 
  getLocalImages 
} from "./header";

export const getAcFormFields = ({
  real_problem: '',
  context_audio: [],
  context_video: '',
  path_reference: '',
});

export const getAcFormFieldsErrors = ( data, errors ) => {
  if (!data.real_problem) {
    errors.real_problem = 
    'El problema es requerido.';
  }
  if (data.context_audio.length === 0) {
    errors.context_audio = 'La explicación oral es requerida.';
  }
  if (!data.context_video) {
    errors.context_video = 'El vídeo es requerido.';
  }

  return errors;
}

export const getAcMethodologyData = ( data ) => ({
  real_problem: data.real_problem,
  context_audio: data.context_audio,
  context_video: data.context_video,
  path_reference: data.path_reference,
  state: 1
});

export const clearAllAcLocalStorageFiles = () => {
  clearLocalStorageEditorImage( 'real_problem' );
  getClearLocalStorageAudio( 'context_audio' );
} 

export const getAcMethodologyImages = () => {
  let acImages = [];
  const writeImages = getLocalImages( 'real_problem' );
  Object.values(writeImages).forEach( 
    value => value && (acImages = [ ...acImages, value ])
  );
  return acImages;
}

export const getAcMethodologyAudios = () => {
  let acAudios = [];
  const firstAudio = getLocalAudio( 'context_audio', 1 );
  const secondAudio = getLocalAudio( 'context_audio', 2 );
  if (firstAudio) {
    acAudios.push(firstAudio);
  }
  if (secondAudio) {
    acAudios.push(secondAudio);
  }
  return acAudios;
}