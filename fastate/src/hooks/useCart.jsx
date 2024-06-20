// import React, { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthProvider'
// import { useQuery } from '@tanstack/react-query';

// const useCart = () => {
//     const { user } = useContext(AuthContext);
//     const token = localStorage.getItem('access-token');
//     const { data: cart = [], refetch } = useQuery({
//         queryKey: ['carts', user?.email],
//         queryFn: async () => {
//             const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`, {
//                 headers: {
//                     'authorization': `Bearer ${token}`
//                 }
//             });
//             return res.json()
//         }
//     });
//     return [cart, refetch]
// }

// export default useCart

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [loadingToken, setLoadingToken] = useState(true); // State to track token loading

    // Fetch token when component mounts
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('access-token');
        setToken(tokenFromStorage);
        setLoadingToken(false); // Once token is retrieved, set loadingToken to false
    }, []); // Empty dependency array ensures this runs only once

    const { data: cart = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            // Check if token is still loading
            if (loadingToken) return [];
            const res = await fetch(`http://localhost:6001/carts?email=${user?.email}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            return res.json();
        }
    });

    return [cart, refetch];
};

export default useCart;
