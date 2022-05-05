import { useState } from 'react';
import { 
  ref, 
  uploadBytesResumable, 
  uploadString,
  getDownloadURL, 
  deleteObject,
  getMetadata,
  listAll
} from 'firebase/storage';

import { storage } from "../firebase/config";
import { getToastMsg } from '../helpers/abp';

export const useImage = ( schoolData = {}, toast = {current: null} ) => {

  const [uploadResume, setUploadResume] = useState(0);
  const [singleImage, setSingleImage] = useState({});

  const saveSingleImage = async ( image ) => {
    if (Object.keys(schoolData).length > 0 && image) {
      // const snapshot = await uploadBytes(storageRef, image);
      // const { metadata } = snapshot;
      setSingleImage({});
      const storageRef = ref(
        storage,
        schoolData.isStudent
        ? `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Estudiante/${image.name}`
        : `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Docente/${image.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);
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
            setSingleImage({
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

  const saveSingleImageBase64 = ( url, name) => {
    if (Object.keys(schoolData).length > 0 && url) {
      setSingleImage({});
      const storageRef = ref(
        storage,
        schoolData.isStudent
        ? `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Estudiante/${name}.png`
        : `CONON_DATA/${schoolData.schoolPeriod}/${schoolData.classroom}/${schoolData.asignature}/${schoolData.type}/${schoolData.title}/Docente/${name}.png`
      );
      uploadString(storageRef, url, 'data_url').then(data => {
        getDownloadURL(data.ref).then(url => {
          setSingleImage({
            name: data.metadata.name,
            size: data.metadata.size,
            path: url
          });
        }).catch( err => {
          getToastMsg(
            toast, 
            'error', 
            `Ocurrió el siguiente error: ${err}`
          ); 
        });
      }).catch(err => {
        getToastMsg(
          toast, 
          'error', 
          `Ocurrió el siguiente error: ${err}`
        );
      });
    } else {
      getToastMsg(
        toast, 
        'error', 
        'No se mandaron los datos correspondientes para crear el enlace de las imágenes.'
      );
    }
  }

  const deleteSingleImage = async ( path ) => {
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

  const getImageMetadata = ( path ) => {
    const storageRef = ref( storage, path );
    return getMetadata( storageRef );
  }

  const deleteFolderFiles = ( path, toast ) => {
    const listRef = ref( storage, path );
    listAll(listRef).then( (res) => {      
      res.items.forEach( async (item) => {
        const wasDeleted = await deleteSingleImage( item.fullPath );
        if (!wasDeleted) {
          getToastMsg(
            toast, 'error', `Archivo no elminado.` 
          );
        }
      })
    }).catch( error => {
      getToastMsg(
        toast, 'error', `Ocurrió el siguiente error: ${error}` 
      );
    });
  }

  const handleClearSingleImage = () => {
    setSingleImage({});
  }

  return { 
    handleClearSingleImage, 
    saveSingleImage, 
    saveSingleImageBase64,
    deleteSingleImage, 
    singleImage, 
    uploadResume,
    setSingleImage,
    getImageMetadata,
    deleteFolderFiles
  }; 

}