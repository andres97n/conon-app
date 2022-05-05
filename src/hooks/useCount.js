import { useCallback, useState } from "react";

export const useCount = ( initialState = 0 ) => {

    const [count, setCount] = useState(0);

    const increment = useCallback(
      () => {
        setCount( oldState => oldState + 1 );
      },
      [setCount],
    );
    
    const decrement = useCallback(
        () => {
          setCount( oldState => oldState - 1 );
        },
        [setCount],
    );

    const reset = () => {
        setCount( initialState );
    }

    const setInitialCount = useCallback(
      ( count ) => {
        setCount( count );
      },
      [setCount],
    );
    
    return [ count, increment, decrement, setInitialCount, reset ];

}