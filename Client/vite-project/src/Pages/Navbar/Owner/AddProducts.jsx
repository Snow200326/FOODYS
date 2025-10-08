import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../../Componetn/CartContext";

export const AddProducts = () => {
  const {  getToken } = useContext(CartContext)
  const [loading,setloading]=useState(true)
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    sizes: [],
    prices: {},
    inStock: true,
    images: [],
    previewImages: [],
  });
  const fileInputRef = useRef(null);

  const categoryOptions = ["Curry", "Deserts", "Drinks", "Fruits", "Pizza", "Rice"];
  const sizeOptions = ["S", "M", "L", "XL", "H", "F"];

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

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let newSizes = [...formData.sizes];
    let newPrices = { ...formData.prices };
    if (checked) {
      newSizes.push(value);
      newPrices[value] = "";
    } else {
      newSizes = newSizes.filter((s) => s !== value);
      delete newPrices[value];
    }
    setFormData({ ...formData, sizes: newSizes, prices: newPrices });
  };

  const handlePriceChange = (size, value) => {
    setFormData({ ...formData, prices: { ...formData.prices, [size]: value } });
  };

  const handleRemoveImages = () => {
    setFormData({ ...formData, images: [], previewImages: [] });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const priceObj = {};
      Object.keys(formData.prices).forEach((size) => {
        priceObj[size] = parseFloat(formData.prices[size]) || 0;
      });
      const newProduct = {
        _id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        sizes: formData.sizes,
        price: priceObj,
        inStock: formData.inStock,
        images: formData.previewImages,
      };
      setProducts([newProduct, ...products]);
      const { data } = await axios.get("/api/products", { headers: { Authorization: `Bearer ${await getToken()}` } })
      console.log(data)
      if(data.success)
      {
        toast.success(data.message)
        setFormData({
          title: "",
          description: "",
          category: "",
          type: "",
          sizes: [],
          prices: {},
          inStock: true,
          images: [],
          previewImages: [],
        });
      }

    } catch (error) {
      console.log(error.message)
      toast.success(error.message)

    }
    finally{
      setloading(false)
    }

  };
  console.log(products)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Add New Product</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col gap-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Product Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product title" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 font-semibold">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Enter type" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Select Sizes (Optional)</label>
            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <label key={size} className="flex items-center gap-1">
                  <input type="checkbox" value={size} checked={formData.sizes.includes(size)} onChange={handleSizeChange} className="w-5 h-5 accent-blue-500" />
                  {size}
                </label>
              ))}
            </div>
          </div>
          {formData.sizes.length > 0 && (
            <div className="flex flex-col gap-3">
              <label className="mb-2 text-gray-700 font-semibold">Set Price for Selected Sizes</label>
              {formData.sizes.map((size) => (
                <div key={size} className="flex items-center gap-3">
                  <span className="font-semibold">{size}:</span>
                  <input type="number" value={formData.prices[size]} onChange={(e) => handlePriceChange(size, e.target.value)} placeholder={`Price for ${size}`} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32" required />
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-3 mt-2">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="w-5 h-5 accent-blue-500" />
            <label className="text-gray-700 font-semibold">In Stock</label>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-semibold">Upload Images</label>
            <input type="file" name="images" ref={fileInputRef} onChange={handleChange} multiple accept="image/*" className="border border-gray-300 rounded-lg p-3" />
            <div className="flex gap-3 mt-4 flex-wrap">
              {formData.previewImages.map((img, idx) => (<img key={idx} src={img} alt="preview" className="w-28 h-28 object-cover rounded-2xl shadow-lg" />))}
            </div>
            <button type="button" onClick={handleRemoveImages} className="bg-red-600 text-white w-fit font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-red-700 transition whitespace-nowrap mt-2">Cancel Upload</button>
          </div>
          <button type="submit"  className="bg-blue-600 text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition">{ loading ?'Adding':'Add Product'}</button>
        </form>
      </div>
    </div>
  );
};
