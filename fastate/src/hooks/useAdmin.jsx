// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useAdmin = () => {
//     const {user}=useAuth();
//     const axiosSecure=useAxiosSecure();
//     const { refetch, data: isAdmin, isPending: isAdminLoading } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//             return res.data?.admin;
//         }
//     });
//   return [isAdmin, isAdminLoading];
// }

// export default useAdmin

import useAuth from './useAuth';
import React, { useContext, useState, useEffect } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [token, setToken] = useState(null);
    const [loadingToken, setLoadingToken] = useState(true);

    // Fetch token when component mounts
    useEffect(() => {
        const tokenFromStorage = localStorage.getItem('access-token');
        setToken(tokenFromStorage);
        setLoadingToken(false);
    }, []);

    const { refetch, data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (loadingToken) return false; // Wait until token is loaded
            const res = await axiosSecure.get(`/users/admin/${user?.email}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            return res.data?.admin;
        }
    });

    return [refetch, isAdmin, isAdminLoading];
}

export default useAdmin;
