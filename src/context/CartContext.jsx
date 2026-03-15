import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal state for global use (Menu and Cart)
  const [modalState, setModalState] = useState({
    isOpen: false,
    product: null,
    mode: "add", // 'add' or 'edit'
    editingItemId: null,
  });

  //*********************** */
  const openModal = (product, mode = "add", editingItemId = null) => {
    setModalState({ isOpen: true, product, mode, editingItemId });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  const generateItemId = (product, options) => {
    const toppingsStr = (options.toppings || [])
      .map((t) => t.id)
      .sort()
      .join(",");
    const saucesStr = (options.sauces || [])
      .map((s) => s.id)
      .sort()
      .join(",");
    const flavorsStr = (options.flavors || [])
      .map((f) => `${f.id}:${f.quantity}`)
      .sort()
      .join(",");

    return `${product.id}-${options.size || "default"}-${toppingsStr}-${saucesStr}-${flavorsStr}`;
  };

  const addToCart = (product, options = {}) => {
    const cartItemId = generateItemId(product, options);

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      }

      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          quantity: 1,
          selectedSize: options.size,
          selectedToppings: options.toppings || [],
          selectedSauces: options.sauces || [],
          selectedFlavors: options.flavors || [], // Now includes quantity
          extraScoopsCount: options.extraScoopsCount || 0,
          finalPrice: options.totalPrice || product.price,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartItem = (oldItemId, product, options = {}) => {
    const newItemId = generateItemId(product, options);

    setCart((prevCart) => {
      // Find the old item and keep its quantity
      const oldItem = prevCart.find((item) => item.cartItemId === oldItemId);
      const quantity = oldItem ? oldItem.quantity : 1;

      // Filter out the old item
      const filteredCart = prevCart.filter(
        (item) => item.cartItemId !== oldItemId,
      );

      // Check if newItemId already exists in the rest of the cart
      const existingIndex = filteredCart.findIndex(
        (item) => item.cartItemId === newItemId,
      );

      if (existingIndex > -1) {
        const newCart = [...filteredCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [
        ...filteredCart,
        {
          ...product,
          cartItemId: newItemId,
          quantity: quantity,
          selectedSize: options.size,
          selectedToppings: options.toppings || [],
          selectedSauces: options.sauces || [],
          selectedFlavors: options.flavors || [],
          extraScoopsCount: options.extraScoopsCount || 0,
          finalPrice: options.totalPrice || product.price,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => {
    const price =
      typeof item.finalPrice === "string"
        ? parseInt(item.finalPrice.replace(/[^0-9]/g, ""))
        : 0;
    return acc + price * item.quantity;
  }, 0);

  //*********************** */
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        modalState,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
