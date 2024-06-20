import React from 'react';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF6868",
            cancelButtonColor: "#39DB4A",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                refetch();
                Swal.fire({
                    title: `${item.name} removed from Fastate!`,
                    text: "",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    confirmButtonColor: "#39DB4A",
                    cancelButtonColor: "#39DB4A",
                    confirmButtonText: "OK",
                    timer: 3000
                });
            }
        });
    };
    return (
        <div className='w-full md:w-[870px] px-4 mx-auto'>
            <h2 className='text-2xl font-semibold my-4'>Manage All <span className='text-green'>Menu Items</span></h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>₹ {item.price.toFixed(2)}</td>
                                        <td><Link to={`/dashboard/update-menu/${item._id}`}><button className="btn btn-ghost btn-xs bg-green text-white"><FaEdit /></button></Link></td>
                                        <td><button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs text-red"><FaTrashAlt /></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageItems