import React, { useContext, useState, useEffect } from 'react'
import useCart from '../../hooks/useCart'
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const [cart, refetch] = useCart();
    const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    //     // Set the default value of cartItems to the initial value of cart
    //     setCartItems(cart);
    // }, [cart]);

    const calculatePrice = (item) => {
        return item.quantity * item.price;
    }
    const cartTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item);
    }, 0);
    // const orderTotal = cartSubTotal;

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`http://localhost:6001/carts/${item._id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            }).then(res => res.json()).then(data => {
                // const updatedCart = cartItems.map((cartItem) => {
                //     if (cartItem.id === item.id) {
                //         return {
                //             ...cartItem,
                //             quantity: cartItem.quantity - 1
                //         }
                //     }
                //     return cartItem;
                // });
                refetch();
                // setCartItems(updatedCart);
            });
            refetch();
        }
        else {
            alert("Item cannot be zero.");
        }
    };
    const handleIncrease = (item) => {
        fetch(`http://localhost:6001/carts/${item._id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        }).then(res => res.json()).then(data => {
            // const updatedCart = cartItems.map((cartItem) => {
            //     if (cartItem.id === item.id) {
            //         return {
            //             ...cartItem,
            //             quantity: cartItem.quantity + 1
            //         }
            //     }
            //     return cartItem;
            // });
            refetch();
            // setCartItems(updatedCart);
        });
        refetch();
    };

    // const handleDelete = (item) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#FF6868",
    //         cancelButtonColor: "#39DB4A",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`http://localhost:6001/carts/${item._id}`, {
    //                 method: "DELETE"
    //             }).then(res => res.json()).then(data => {
    //                 if (data.deletedCount > 0) {
    //                     refetch();
    //                     Swal.fire({
    //                         title: "Deleted!",
    //                         text: "Your item has been deleted.",
    //                         icon: "success"
    //                     });
    //                 }
    //             });
    //             refetch();
    //         }
    //     });
    //     refetch();
    // }
    useEffect(() => {
        const interval = setInterval(() => {
            // Call refetchAdmin every 60 seconds to fetch latest admin status
            refetch();
        }, 1000); 

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [refetch]);

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF6868",
            cancelButtonColor: "#39DB4A",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:6001/carts/${item._id}`, {
                    method: "DELETE"
                }).then(res => {
                    if (res) {
                        refetch();
                        Swal.fire({
                            title: "Item deleted!",
                            text: "",
                            icon: "success",
                            showCancelButton: false,
                            showConfirmButton: false,
                            confirmButtonColor: "#39DB4A",
                            cancelButtonColor: "#39DB4A",
                            confirmButtonText: "OK",
                            timer: 1500
                        });
                    }
                }).catch(error => { console.log(error) });
            }
        });
    };

    return (
        <div className='section-container'>
            <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
                <div className="py-36 flex flex-col justify-center items-center gap-8">
                    <div className="space-y-7 px-4">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading snug">Items Added To The <span className="text-green">Cart</span></h2>
                    </div>

                </div>
            </div>
            {
                (cart.length > 0) ? <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-green text-white rounded-sm'>
                                <tr>
                                    <th>#</th>
                                    <th>Food</th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.image} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='font-medium'>{item.name}</td>
                                            <td>
                                                <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                                                <input type="number" value={item.quantity} onChange={() => console.log(item.quantity)} className='w-10 mx-2 text-center overflow-hidden appearance-none' />
                                                <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                                            </td>
                                            <td>₹{calculatePrice(item).toFixed(2)}</td>
                                            <th>
                                                <button className="btn btn-ghost text-red btn-xs" onClick={() => handleDelete(item)}><FaTrash /></button>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>
                    </div>
                    <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
                        <div className='md:w-1/2 space-y-3'>
                            <h3 className='font-medium'>Customer Details</h3>
                            <p>Name: {user?.displayName ? user.displayName : ""}</p>
                            <p>Email: {user?.email ? user.email : ""}</p>
                            <p>User ID: {user?.uid ? user.uid : ""}</p>
                        </div>
                        <div className='md:w-1/2 space-y-3'>
                            <h3 className='font-medium'>Food Details</h3>
                            <p>Total Items: {cart.length}</p>
                            <p>Total Price: ₹{cartTotal.toFixed(2)}</p>
                            <button className='btn bg-green text-white'>Proceed to Checkout</button>
                        </div>
                    </div>
                </div> : <div className='text-center mt-20'><p>Cart is empty. Please add food items.</p><Link to="/menu"><button className='btn bg-green text-white mt-3'>Back to Menu</button></Link></div>
            }

        </div>
    )
}

export default CartPage