import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { forwardRef } from "react";

const ProductItem = forwardRef(({ product }, ref) => {
	const { addToCart } = useContext(CartContext);

	return (
		<div
			ref={ref}
			style={{
				border: "1px solid #ddd",
				padding: "15px",
				borderRadius: "8px",
				textAlign: "center"
			}}
		>
			<img src={product.image} alt={product.title} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
			<h4 style={{ fontSize: "14px", margin: "10px 0" }}>{product.title}</h4>
			<p style={{ color: "green", fontWeight: "bold" }}>${product.price}</p>

			{/* Add to Cart Button */}
			<button
				onClick={() => addToCart(product)}
				style={{
					background: "#28a745",
					color: "white",
					border: "none",
					padding: "8px 12px",
					cursor: "pointer",
					marginTop: "10px",
					borderRadius: "5px"
				}}
			>
				Add to Cart
			</button>
		</div>
	);
});

export default ProductItem;
