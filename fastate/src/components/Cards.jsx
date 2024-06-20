import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2';
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, refetch] = useCart();

    const handleAddtoCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };
            fetch('http://localhost:6001/carts', {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(cartItem)
            }).then(res => {
                console.log(res);
                if (res.ok) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item added to cart!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    const errorMessage = "Item already exists in cart!";
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: `${errorMessage}`,
                        text: "You can increase the quantity of this item from the cart.",
                        showConfirmButton: true,
                        confirmButtonColor: "#39DB4A",
                        confirmButtonText: "OK"
                    });
                }
            }).catch(error => { console.log(error) });
        }
        else {
            Swal.fire({
                title: "Please Sign Up Or Log In!",
                text: "Without an account, items cannot be added to cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39DB4A",
                cancelButtonColor: "#FF6868",
                confirmButtonText: "Sign Up / Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup', { state: { from: location } });
                }
            });
        }
    };

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`} onClick={handleHeartClick}>
                <FaHeart className="h-5 w-5 cursor-pointer" />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure><img src={item.image} alt="" className="hover:scale-105 transition-all duration-200 md:h-72" /></figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}</h2></Link>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold"><span className="text-sm text-red">₹</span> {item.price.toFixed(2)}</h5>
                    <button className="btn bg-green text-white" onClick={() => handleAddtoCart(item)}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Cards 