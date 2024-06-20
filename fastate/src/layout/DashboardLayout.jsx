import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { MdDashboard, MdDashboardCustomize } from "react-icons/md"
import { FaEdit, FaPlusCircle, FaRegUser, FaShoppingBag, FaUser, FaLocationArrow, FaQuestionCircle, FaShoppingCart } from "react-icons/fa"
import logo from "/logo.png";
import Signup from "../components/Signup";
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const sharedLinks = (
    <>
        <li className='mt-3'><Link to="/"><MdDashboard />Home</Link></li>
        <li><Link to="/menu"><FaShoppingCart />Menu</Link></li>
        <li><Link to="/menu"><FaLocationArrow />Orders Tracking</Link></li>
        <li><Link to="/menu"><FaQuestionCircle />Customer Support</Link></li>
    </>
)
const DashboardLayout = () => {
    const {loading}=useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    return (
        <div>
            {
                isAdmin ? <div className="drawer sm:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                        {/* Page content here */}
                        <div className='flex items-center justify-between mx-4'>
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg: sm:hidden"><MdDashboardCustomize /></label>
                            <button className='btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden'><FaRegUser />Logout</button>
                        </div>
                        <div className='mt-5 md:mt-2 mx-4'>
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li><Link to="/" className='flex justify-start mb-3'><img src={logo} alt="" className='w-20' /><span className="badge badge-primary">Admin</span></Link></li>
                            <hr />
                            <li className='mt-3'><Link to="/dashboard"><MdDashboard />Dashboard</Link></li>
                            <li><Link to="/dashboard/users"><FaUser />All Users</Link></li>
                            <li><Link to="/dashboard"><FaShoppingBag />Manage Bookings</Link></li>
                            <li><Link to="/dashboard/add-menu"><FaPlusCircle />Add Menu</Link></li>
                            <li className='mb-3'><Link to="/dashboard/manage-items"><FaEdit />Manage Items</Link></li>
                            <hr />
                            {
                                sharedLinks
                            }
                        </ul>

                    </div>
                </div> : <Signup />
            }
        </div>
    )
}

export default DashboardLayout