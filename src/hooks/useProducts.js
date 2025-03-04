import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";
const PAGE_SIZE = 10; // Number of products per page

export const useProducts = () => {
	const [allProducts, setAllProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);
	const [visibleProducts, setVisibleProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Load cached data on mount
	useEffect(() => {
		if (allProducts.length > 0) {
			setVisibleProducts(allProducts.slice(0, PAGE_SIZE));
			setFilteredProducts(allProducts.slice(0, PAGE_SIZE));
		} else {
			fetchProducts();
		}
	}, []);

	// Fetch all products and cache them
	const fetchProducts = async () => {
		if (loading || allProducts.length > 0) return;

		setLoading(true);
		try {
			console.log("Fetching products from API...");
			const response = await axios.get(API_URL);
			const products = response.data;
			console.log("🚀 -> fetchProducts -> products:", products);

			setAllProducts(products);
			setVisibleProducts(products.slice(0, PAGE_SIZE));
			setFilteredProducts(products.slice(0, PAGE_SIZE));
			localStorage.setItem("products", JSON.stringify(products));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	// Load more products (pagination)
	const loadMore = () => {
		if (loading) return;

		const nextPage = page + 1;
		const startIndex = (nextPage - 1) * PAGE_SIZE;
		const endIndex = startIndex + PAGE_SIZE;
		const newProducts = allProducts.slice(0, endIndex);

		setPage(nextPage);
		setVisibleProducts(newProducts);
		setFilteredProducts(newProducts);
	};

	// Search function (client-side filtering)
	useEffect(() => {
		if (!searchQuery) {
			setFilteredProducts(visibleProducts);
		} else {
			const lowerCaseQuery = searchQuery.toLowerCase();
			const filtered = allProducts.filter((product) => product.title.toLowerCase().includes(lowerCaseQuery) || product.category.toLowerCase().includes(lowerCaseQuery));
			setFilteredProducts(filtered);
		}
	}, [allProducts, searchQuery, visibleProducts]);

	return { filteredProducts, loading, error, fetchProducts, loadMore, setSearchQuery };
};
