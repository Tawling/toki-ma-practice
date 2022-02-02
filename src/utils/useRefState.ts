import React, { useRef, useState } from 'react';
export const useRefState = <T>(initialValue: T): [T, React.MutableRefObject<T>, React.Dispatch<T>] => {
    const [state, setState] = useState<T>(initialValue);
    const ref = useRef<T>(state);
    const setRefState = (value: T) => {
        ref.current = value;
        setState(value);
    }

    return [state, ref, setRefState];
}