import React, { useState, useContext } from "react";
import { assets, dummyProducts } from "../../assets/data";
import { CartContext } from "../../Componetn/CartContext";

export const Menu = () => {
  const allTypes = Array.from(new Set(dummyProducts.map((p) => p.type))).sort();
  const allCategories = Array.from(
    new Set(dummyProducts.map((p) => p.category))
  ).sort();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);

  const { addToCart } = useContext(CartContext);

  const pageSize = 16;

  const handleClick = (product, curr) =>
    setActive({ id: product._id, size: curr });

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setSelectedTypes([]);
    setPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const filteredTypes =
    selectedCategories.length > 0
      ? Array.from(
          new Set(
            dummyProducts
              .filter((p) => selectedCategories.includes(p.category))
              .map((p) => p.type)
          )
        ).sort()
      : allTypes;

  const filteredProducts = dummyProducts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);
    const matchType =
      selectedTypes.length === 0 || selectedTypes.includes(p.type);
    return matchSearch && matchCategory && matchType;
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="bg-[#fff4f1] w-full min-h-screen p-3 flex flex-col lg:flex-row gap-4">
      <div className="bg-white w-full lg:w-[20%] p-4 flex flex-col max-lg:hidden space-y-4 rounded-lg order-1 lg:order-1">
        <div className="relative bg-[#fff4f1] rounded-3xl">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full p-3 rounded-3xl border-0 focus:outline-0 text-sm sm:text-base"
          />
          <img
            src={assets.search}
            alt="search"
            className="absolute size-5 top-3 right-3"
          />
        </div>
        <div className="flex flex-col p-3 bg-[#fff4f1] rounded-lg">
          <h1 className="font-bold mb-2">Categories</h1>
          {allCategories.map((cat, index) => (
            <label key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="size-3 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm sm:text-base">{cat}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col p-3 bg-[#fff4f1] rounded-lg">
          <h1 className="font-bold mb-2">Types</h1>
          {filteredTypes.map((type, index) => (
            <label key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                className="size-3 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm sm:text-base">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-white w-full h-full rounded-lg p-4">
        <div className="flex flex-row sm:flex-row sm:text-sm justify-between items-center mb-4 gap-2">
          <span className="font-bold text-lg">
            Products ({filteredProducts.length})
          </span>
          <div className="relative bg-[#fff4f1] rounded-3xl hidden max-lg:block">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full p-3 rounded-3xl border-0 focus:outline-0 text-sm sm:text-base"
            />
            <img
              src={assets.search}
              alt="search"
              className="absolute size-5 top-3 right-3"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 bg-[#fff4f1] rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-2 py-1 rounded ${
                  page === idx + 1 ? "bg-orange-300 font-bold" : "bg-[#fff4f1]"
                }`}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-2 py-1 bg-[#fff4f1] rounded disabled:opacity-50"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {paginatedProducts.map((product) => {
            const selectedSize =
              active?.id === product._id ? active?.size : product.sizes[0];
            const selectedPrice = product.price[selectedSize];
            return (
              <div
                key={product._id}
                className="bg-[#fff4f1] relative rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col h-full"
              >
                <img
                  src={product.images}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="font-bold mt-2 text-sm md:text-base">
                  {product.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((curr, index) => (
                    <button
                      key={index}
                      onClick={() => handleClick(product, curr)}
                      className={`border rounded-sm px-2 py-1 text-sm ${
                        active?.id === product._id && active?.size === curr
                          ? "bg-[#f0e6e5] font-semibold"
                          : "bg-[#fff4f1]"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center text-amber-800 font-bold text-lg">
                    <span>$</span>
                    <h1>{selectedPrice}</h1>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        size: selectedSize,
                        price: selectedPrice,
                      })
                    }
                    className="bg-[#dc593f] p-2 rounded-md hover:bg-[#c84a32] transition"
                  >
                    <img
                      src={assets.cartAdd}
                      alt="cart"
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </button>
                </div>
              </div>
            );
          })}
          {paginatedProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
