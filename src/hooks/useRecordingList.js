import { useEffect, useState } from "react";

import { deleteAudio, generateKey } from "../helpers/topic";

export const useRecordingList = (audio, initialState) => {
    const [recordings, setRecordings] = useState(initialState);

    useEffect(() => {
        if (audio) {
            setRecordings( prevState => {
                return [
                    ...prevState,
                    {
                        key: generateKey(),
                        audio
                    }
                ];
            })
        }
    }, [audio]);

    return {
        recordings,
        deleteAudio: audioKey => deleteAudio(audioKey, setRecordings),
    };
}