import { useContext } from "react";
import { CartContext } from "../store/CartContext";

const Cart = () => {
	const { cart, removeFromCart, updateQuantity, totalPrice } = useContext(CartContext);

	return (
		<div style={{ width: "300px", padding: "20px", borderLeft: "1px solid #ddd" }}>
			<h2>Shopping Cart</h2>
			{cart.length === 0 ? <p>Cart is empty</p> : null}

			{cart.map((item) => (
				<div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
					<img src={item.image} alt={item.title} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
					<div>
						<p style={{ margin: 0, fontSize: "14px" }}>{item.title}</p>
						<p style={{ margin: 0, fontSize: "14px" }}>
							${item.price} x {item.quantity||0}
						</p>
					</div>
					<input
						type="number"
						value={item.quantity}
						onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
						style={{
							width: "50px",
							marginLeft: "10px",
							padding: "5px",
							border: "1px solid #ddd",
							borderRadius: "5px"
						}}
						min="1"
					/>
					<button
						onClick={() => removeFromCart(item.id)}
						style={{
							background: "red",
							color: "white",
							border: "none",
							padding: "5px 8px",
							marginLeft: "10px",
							cursor: "pointer",
							borderRadius: "5px"
						}}
					>
						Remove
					</button>
				</div>
			))}

			{cart.length > 0 && (
				<div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
					<p style={{ fontWeight: "bold", fontSize: "16px" }}>Total: ${totalPrice.toFixed(2)}</p>
				</div>
			)}
		</div>
	);
};

export default Cart;
