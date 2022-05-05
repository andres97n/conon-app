import { isPageValid, isYoutubeVideoValid } from "../topic";
import { 
  clearLocalStorageEditorImage, 
  clearLocalStorageTabImage, 
  getClearLocalStorageAudio, 
  getLocalAudio, 
  getLocalImages 
} from "./header";

export const getDuaFormFields = ({
    written_conceptualization: '',
    oral_conceptualization: [],
    example: '',
    first_image: {},
    second_image: {},
    video: '',
    extra_information: ''
  });

export const getDuaFormFieldsErrors = ( data, errors ) => {
  if (!data.written_conceptualization) {
    errors.written_conceptualization = 
    'La conceptualización escrita es requerida.';
  }
  if (!data.example) {
    errors.example = 'El ejemplo descriptivo es requerido.';
  }
  if (data.oral_conceptualization.length === 0) {
    errors.oral_conceptualization = 'La conceptualización oral es requerida.';
  }
  if (Object.keys(data.first_image).length === 0) {
    errors.first_image = 'La primera imagen es obligatoria.';
  }
  if (Object.keys(data.second_image).length === 0) {
    errors.second_image = 'La segunda imagen es obligatoria.';
  } 
  if (!data.video) {
    errors.video = 'El vídeo es obligatorio.';
  }else if (!isYoutubeVideoValid(data.video)) {
    errors.video = 'El enlace del vídeo ingresado no es válido.';
  }
  if (data.extra_information && !isPageValid(data.extra_information)) {
    errors.extra_information = 'El enlace ingresado no es válido.'
  }

  return errors;
}

export const getDuaMethodologyImages = () => {
  let duaImages = [];
  const writeImages = getLocalImages( 'written_conceptualization' );
  const exampleImages = getLocalImages( 'example' );
  const firstImage = getLocalImages( 'first_image', true );
  const secondImage = getLocalImages( 'second_image', true );
  Object.values(writeImages).forEach( 
    value => value && (duaImages = [ ...duaImages, value ])
  );
  Object.values(exampleImages).forEach( 
    value => value && (duaImages = [ ...duaImages, value ])
  );
  Object.values(firstImage).forEach( 
    value => value && (duaImages = [ ...duaImages, value ])
  );
  Object.values(secondImage).forEach( 
    value => value && (duaImages = [ ...duaImages, value ])
  );
  return duaImages;
}

export const getDuaMethodologyAudios = () => {
  let duaAudios = [];
  const firstAudio = getLocalAudio( 'oral_conceptualization', 1 );
  const secondAudio = getLocalAudio( 'oral_conceptualization', 2 );
  const thirdAudio = getLocalAudio( 'oral_conceptualization', 3 );
  const fourthAudio = getLocalAudio( 'oral_conceptualization', 4 );
  if (firstAudio) {
    duaAudios.push(firstAudio);
  }
  if (secondAudio) {
    duaAudios.push(secondAudio);
  } 
  if (thirdAudio) {
    duaAudios.push(thirdAudio);
  } 
  if (fourthAudio) {
    duaAudios.push(fourthAudio);
  }
  return duaAudios;
}

export const getDuaMethodologyData = ( data ) => ({
  written_conceptualization: data.written_conceptualization,
  oral_conceptualization: data.oral_conceptualization,
  example: data.example,
  video: data.video,
  images: [ data.first_image, data.second_image ],
  extra_information: data.extra_information,
  state: 1
});

export const clearAllDuaLocalStorageFiles = () => {
  clearLocalStorageEditorImage( 'written_conceptualization' );
  clearLocalStorageEditorImage( 'example' );
  clearLocalStorageTabImage( 'first_image' );
  clearLocalStorageTabImage( 'second_image' );
  getClearLocalStorageAudio( 'oral_conceptualization' );
} 