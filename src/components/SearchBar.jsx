const SearchBar = ({ onSearch }) => {
	return (
		<input
			type="text"
			placeholder="Search products by name or category..."
			onChange={(e) => onSearch(e.target.value)}
			style={{
				padding: "10px",
				width: "100%",
				marginBottom: "15px",
				border: "1px solid #ccc",
				borderRadius: "5px"
			}}
		/>
	);
};

export default SearchBar;
