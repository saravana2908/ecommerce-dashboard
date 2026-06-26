import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items ?? []);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  return { cartItems, totalItems, totalPrice,
    addToCart: (p) => dispatch(addToCart(p)),
    removeFromCart: (id) => dispatch(removeFromCart(id))
  };
};