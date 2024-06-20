import React, { useContext } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Modal from "./Modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, signUpWithGmail, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password).then((result) => {
            const user = result.user;
            updateUserProfile(data.email, data.photoURL).then(() => {
                const userInformation = {
                    name: data.name,
                    email: data.email
                };
                axiosPublic.post('/users', userInformation);
            });
            alert("Account created successfully!");
            document.getElementById('my_modal_5').close();
            navigate("/", { replace: true });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
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
            document.getElementById('my_modal_5').close()
            navigate("/", { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="max-w-md bg-white shadow w-full mx-auto flex relative items-center justify-center my-20">
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <h3 className="font-bold text-lg">Create An Account!</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" placeholder="Your name" className="input input-bordered" required {...register("name")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    {/* fbjgbfjbjfb */}
                    <div className="form-control mt-6">
                        <input type="submit" value="Sign Up" className="btn bg-green text-white" />
                    </div>
                    <p className="text-centre my-2">Have an account? <button onClick={() => document.getElementById('my_modal_5').showModal()} className="underline text-red ml-1">Login</button> now!</p>
                    <Link to="/" className="btn btn-md text-md btn-circle btn-ghost absolute right-3 top-3">✕</Link>
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
            <Modal />
        </div>
    )
}

export default Signup