import React, { useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";


const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errorMessage, setErrorMessage] = useState("");
    const { signUpWithGmail, login } = useAuth();
    const axiosPublic = useAxiosPublic();


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        login(email, password).then((result) => {
            const user = result.user;
            const userInformation = {
                name: data.name,
                email: data.email
            };
            axiosPublic.post('/users', userInformation);
            alert("Login successful!");
            document.getElementById('my_modal_5').close();
            navigate(from, { replace: true });
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Provide a correct email and password!");
        });
    };

    const handleLogin = () => {
        signUpWithGmail().then((result) => {
            const user = result.user;
            const userInformation = {
                name: result?.user?.displayName,
                email: result?.user?.email,
            }
            axiosPublic.post('/users', userInformation);
            alert("Login successful!");
            document.getElementById('my_modal_5').close();
            navigate(from, { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
                <div className="modal-action flex flex-col justify-center mt-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                        <h3 className="font-bold text-lg">Please Login!</h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {
                            errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
                        }
                        <div className="form-control mt-4">
                            <input type="submit" value="Login" className="btn bg-green text-white" />
                        </div>
                        <p className="text-centre my-2">Don't have an account? <Link to="/signup" className="underline text-red ml-1">Sign up</Link> now!</p>
                        <button htmlFor="my_modal_5" onClick={() => document.getElementById('my_modal_5').close()} className="btn btn-md text-md btn-circle btn-ghost absolute right-3 top-3">✕</button>
                    </form>
                    <div className="text-center space-x-3 mb-5">
                        <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaApple />
                        </button>

                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Modal