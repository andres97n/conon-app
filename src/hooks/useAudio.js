import { useState } from "react";
import { 
  deleteObject, 
  getDownloadURL, 
  getMetadata, 
  ref, 
  uploadBytesResumable 
} from "firebase/storage";

import { storage } from "../firebase/config";
import { getToastMsg } from "../helpers/abp";


export const useAudio = ( schoolData = {}, toast = {current: null} ) => {

  const [uploadResume, setUploadResume] = useState(0);
  const [singleAudio, setSingleAudio] = useState({});

  const saveSingleAudio = async ( audio ) => {
    if (Object.keys(schoolData).length > 0 && audio) {
      setSingleAudio({});
      const storageRef = ref(
        storage,
        schoolData.isStudent
          ? `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Estudiante/${audio.name}`
          : `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Docente/${audio.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, audio);
      uploadTask.on(
        "state_changed",
        ( snapshot ) => {
          const resume = Math.round(
            snapshot.bytesTransferred / snapshot.totalBytes * 100
          );
          setUploadResume(resume);
        },
        ( error ) => {
          getToastMsg(
            toast, 
            'error', 
            `Ocurrió el siguiente error: ${error}`
          ); 
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            setSingleAudio({
              name: uploadTask.snapshot.metadata.name,
              size: uploadTask.snapshot.metadata.size,
              path: url
            });
            setUploadResume(0);
          }).catch( err => {
            getToastMsg(
              toast, 
              'error', 
              `Ocurrió el siguiente error: ${err}`
            ); 
          });
        }
      );
    } else {
      getToastMsg(
        toast, 
        'error', 
        'No se mandaron los datos correspondientes para crear el enlace de las imágenes.'
      );
    }
  }

  const deleteSingleAudio = async ( path ) => {
    const storageRef = ref( storage, path );
    return deleteObject( storageRef ).then(() => {
      return true;
    }).catch(error => {
      getToastMsg(
        toast, 
        'error', 
        `Ocurrió el siguiente error: ${error}` 
      );
      return;
    });
  }

  const getAudioMetadata = ( path ) => {
    const storageRef = ref( storage, path );
    return getMetadata( storageRef );
  }
  const handleClearSingleAudio = () => {
    setSingleAudio({});
  }

  return {  
    saveSingleAudio, 
    deleteSingleAudio, 
    singleAudio, 
    uploadResume,
    getAudioMetadata,
    handleClearSingleAudio
  }; 

}