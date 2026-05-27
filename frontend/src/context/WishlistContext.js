import {
  createContext,
  useState,
  useEffect
} from "react";

export const WishlistContext =
  createContext();

function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] =
    useState([]);

  // Load Wishlist
  useEffect(() => {

    const savedWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      );

    if (savedWishlist) {
      setWishlistItems(savedWishlist);
    }

  }, []);

  // Save Wishlist
  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);

  // Add To Wishlist
  const addToWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {

      alert("Already In Wishlist");

      return;
    }

    setWishlistItems([
      ...wishlistItems,
      product
    ]);

    alert("Added To Wishlist");
  };

  // Remove Wishlist
  const removeFromWishlist = (id) => {

    const updatedWishlist =
      wishlistItems.filter(
        (item) => item.id !== id
      );

    setWishlistItems(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;