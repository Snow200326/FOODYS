import React, { useState } from "react";

export const Address = ({ onSave }) => {
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onSave) onSave(form);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-screen">
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={form.street}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={form.zip}
            onChange={handleChange}
            className="w-1/2 border rounded-lg p-2"
          />
        </div>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Save Address
      </button>
    </div>
  );
};
