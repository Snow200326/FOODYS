import React, { useRef, useState } from "react";

export const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    sizes: "",
    price: "",
    inStock: true,
    images: [],
    previewImages: [],
  });
    const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "images") {
      const imgs = Array.from(files);
      const previews = imgs.map((file) => URL.createObjectURL(file));
      setFormData({ ...formData, images: imgs, previewImages: previews });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sizesArray = formData.sizes.split(",").map((s) => s.trim());
    const priceArr = formData.price.split(",").map((p) => parseFloat(p.trim()));
    const priceObj = {};
    sizesArray.forEach((size, idx) => (priceObj[size] = priceArr[idx] || 0));

    const newProduct = {
      _id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      sizes: sizesArray,
      price: priceObj,
      inStock: formData.inStock,
      images: formData.previewImages,
    };

    setProducts([newProduct, ...products]);
    setFormData({
      title: "",
      description: "",
      category: "",
      type: "",
      sizes: "",
      price: "",
      inStock: true,
      images: [],
      previewImages: [],
    });
  };
  const handleRemoveImages = () => {
  setFormData({ ...formData, images: [], previewImages: [] });
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // <-- this clears the file input
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Add New Product</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col gap-6 mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Product Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter type"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Sizes</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="H,F,M etc (comma separated)"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Prices</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="15,20,25..."
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-500"
              />
              <label className="text-gray-700 font-semibold">In Stock</label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Upload Images</label>
            <input
              type="file"
              name="images"
              ref={fileInputRef}   
              onChange={handleChange}
              multiple
              accept="image/*"
              className="border border-gray-300 rounded-lg p-3"
            />
            <div className="flex gap-3 mt-4 flex-wrap">
              {formData.previewImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="preview"
                  className="w-28 h-28 object-cover rounded-2xl shadow-lg"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={
                handleRemoveImages
              }
              className="bg-red-600 text-white w-fit font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-red-700 transition whitespace-nowrap"
            >
              Cancel Upload
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>


      </div>
    </div>
  );
};


