import { BACKEND_URL } from '@/lib/constants';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState<any>(null);
    useEffect(() => {
        const newSocket = io(BACKEND_URL);

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
