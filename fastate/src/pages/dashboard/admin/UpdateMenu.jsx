import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';

const UpdateMenu = () => {
  const item = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    if (!(imageFile.image)) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: item.image
      };
      const patchMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if ((await patchMenuItem).status === 200) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} successfully updated on Fastate!`,
          showConfirmButton: false,
          timer: 3000
        });
        navigate("/dashboard/manage-items");
      }
    }
    else {
      const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (hostingImage.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: hostingImage.data.data.display_url
        };
        const patchMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
        if ((await patchMenuItem).status === 200) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} successfully updated on Fastate!`,
            showConfirmButton: false,
            timer: 3000
          });
          navigate("/dashboard/manage-items");
        }
      }
    }
  }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
      <h2 className='text-2xl font-semibold my-4'>Update This <span className='text-green'>Menu Item</span></h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control w-full my-9'>
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input type="text" defaultValue={item.name} {...register("name", { required: true })} placeholder="Recipe Name" className="input input-bordered w-full" />
          </div>
          <div className='flex items-center gap-4'>
            <div className="form-control w-full mb-9">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select {...register("category", { required: true })} className="select select-bordered" defaultValue={item.category}>
                <option value="Indian">Indian</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            <div className='form-control w-full mb-9'>
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input type="number" defaultValue={item.price.toFixed(2)} step=".01" {...register("price", { required: true })} placeholder="Price (in INR)" className="input input-bordered w-full" />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Description</span>
            </label>
            <textarea defaultValue={item.recipe} {...register("recipe")} className="textarea textarea-bordered h-24" placeholder="Tell the world about your recipe"></textarea>
          </div>
          <div className="form-control w-full my-9">
            <label className="label">
              <span className="label-text">Pick Item Image</span>
            </label>
            <input {...register("image")} type="file" className="file-input w-full max-w-xs" />
          </div>
          <button className='btn bg-green text-white px-6'>Update Item <FaUtensils /></button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMenu