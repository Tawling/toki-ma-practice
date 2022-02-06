import React, { useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

export const useRefState = <T>(initialValue: T): [T, React.MutableRefObject<T>, React.Dispatch<T>] => {
    const [state, setState] = useState<T>(initialValue);
    const ref = useRef<T>(state);
    const setRefState = (value: T) => {
        ref.current = value;
        setState(value);
    };

    return [state, ref, setRefState];
};
useLocalStorage;

export const useRefLocalStorage = <T>(
    key: string,
    initialValue?: T | undefined,
    options?:
        | {
              raw: true;
          }
        | {
              raw: false;
              serializer: (value: T) => string;
              deserializer: (value: string) => T;
          }
        | undefined,
): [T | undefined, React.MutableRefObject<T | undefined>, React.Dispatch<T>, () => void] => {
    const [value, setValue, removeValue] = useLocalStorage<T>(key, initialValue, options);
    const ref = useRef<T | undefined>(value);
    const setRefValue = (value: T) => {
        ref.current = value;
        setValue(value);
    };
    const removeRefValue = () => {
        ref.current = undefined;
        removeValue();
    };
    return [value, ref, setRefValue, removeRefValue];
};
