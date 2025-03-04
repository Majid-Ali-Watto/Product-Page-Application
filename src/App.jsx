import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./store/CartContext";

function App() {
	return (
		<>
			<h1 style={{textAlign:'center'}}>Product Page Application</h1>
			<CartProvider>
				<div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
					<ProductList />
					<Cart />
				</div>
			</CartProvider>
		</>
	);
}

export default App;
