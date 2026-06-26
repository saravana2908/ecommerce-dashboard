import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items ?? []);
  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);
  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };
  return { wishlistItems, isWishlisted, toggleWishlist };
};