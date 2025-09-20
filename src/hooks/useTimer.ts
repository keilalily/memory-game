import { useState, useRef, useEffect, useCallback } from 'react';

export function useTimer() {
    const [time, setTime] = useState(0); // seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const start = useCallback(() => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = window.setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
    }, [isRunning]);

    const stop = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        setTime(0);
    }, [stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return { time, isRunning, start, stop, reset };
}