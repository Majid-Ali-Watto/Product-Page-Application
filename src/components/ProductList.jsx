import { useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";

const ProductList = () => {
	const { filteredProducts, loading, error, loadMore, fetchProducts, setSearchQuery } = useProducts();
	const observerRef = useRef(null);

	useEffect(() => {
		fetchProducts(); // Fetch initial products if not cached
	}, []);

	useEffect(() => {
		if (!observerRef.current || loading) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					loadMore(); // Load more when the last item is visible
				}
			},
			{ threshold: 1.0 }
		);

		observer.observe(observerRef.current);

		return () => {
			observer.disconnect(); // Disconnect observer on cleanup
		};
	}, [loading, filteredProducts]);

	if (error) return <p style={{ color: "red" }}>Failed to load products.</p>;

	return (
		<div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
			<SearchBar onSearch={setSearchQuery} />
			{filteredProducts.length === 0 && !loading ? <p>No products found.</p> : null}

			<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
				{filteredProducts.map((product, index) => {
					const isLastItem = index === filteredProducts.length - 1;
					return <ProductItem key={product.id} product={product} ref={isLastItem ? observerRef : null} />;
				})}
			</div>

			{loading && <p style={{ textAlign: "center" }}>Loading more products...</p>}
		</div>
	);
};

export default ProductList;
