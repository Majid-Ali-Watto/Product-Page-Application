import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

	useEffect(() => {
		try {
			localStorage.setItem("cart", JSON.stringify(cart));
		} catch (error) {
			console.error("Failed to save cart to localStorage:", error);
		}
	}, [cart]);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id);
			if (existingItem) {
				return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
			}
			return [...prevCart, { ...product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
	};

	const updateQuantity = (productId, quantity) => {
		setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)));
	};

	const clearCart = () => {
		setCart([]);
	};

	const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 0), 0);

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>{children}</CartContext.Provider>;
};
