import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Pencil,
  Trash2,
  Plus,
  X,
  Save,
} from "lucide-react";
import {
  addProduct,
  deleteProduct,
  getStoredProducts,
  onProductsUpdated,
  updateProduct,
} from "../utils/productStorage";

const categoryOptions = [
  "Perfumes",
  "Skincare",
  "Hair Care",
  "Face Creams",
  "Makeup",
  "Lipsticks",
];

const initialForm = {
  name: "",
  category: "Perfumes",
  image: "",
  price: "",
  oldPrice: "",
  stock: "In Stock",
  badge: "",
  shortDescription: "",
  description: "",
  tags: "",
  featured: false,
  newArrival: false,
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read selected image."));
    reader.readAsDataURL(file);
  });

const ManageProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    setProducts(getStoredProducts());

    const unsubscribe = onProductsUpdated((updatedProducts) => {
      setProducts(updatedProducts);
    });

    return unsubscribe;
  }, []);

  const isEditing = editingId !== null;

  const totalProducts = useMemo(() => products.length, [products]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    try {
      setIsUploadingImage(true);
      setError("");
      const dataUrl = await readFileAsDataUrl(file);

      setForm((prev) => ({
        ...prev,
        image: dataUrl,
      }));
    } catch (uploadError) {
      setError(uploadError.message || "Failed to process selected image.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const validateForm = () => {
    const name = String(form.name ?? "").trim();
    const category = String(form.category ?? "").trim();
    const image = String(form.image ?? "").trim();
    const price = String(form.price ?? "").trim();
    const oldPrice = String(form.oldPrice ?? "").trim();
    const shortDescription = String(form.shortDescription ?? "").trim();
    const description = String(form.description ?? "").trim();

    if (!name) return "Product name is required.";
    if (!category) return "Category is required.";
    if (!image) return "Product image is required.";
    if (!price) return "Price is required.";
    if (!oldPrice) return "Old price is required.";
    if (!shortDescription)
      return "Short description is required.";
    if (!description) return "Full description is required.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    setError(validationError);

    if (validationError) return;

    const payload = {
      name: String(form.name ?? "").trim(),
      category: form.category,
      image: String(form.image ?? "").trim(),
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      stock: form.stock,
      badge: String(form.badge ?? "").trim(),
      shortDescription: String(form.shortDescription ?? "").trim(),
      description: String(form.description ?? "").trim(),
      featured: form.featured,
      newArrival: form.newArrival,
      tags: String(form.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (isEditing) {
      const updatedProduct = updateProduct(editingId, payload);

      if (!updatedProduct) {
        setError("Unable to update product. Please refresh and try again.");
        return;
      }

      window.alert("Product updated successfully.");
    } else {
      addProduct(payload);
      window.alert("New product posted successfully.");
    }

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setError("");

    setForm({
      name: product.name || "",
      category: product.category || "Perfumes",
      image: product.image || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      stock: product.stock || "In Stock",
      badge: product.badge || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
      featured: Boolean(product.featured),
      newArrival: Boolean(product.newArrival),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (productId, productName) => {
    const confirmed = window.confirm(
      `Delete "${productName}" from the product list?`
    );

    if (!confirmed) return;

    deleteProduct(productId);

    if (editingId === productId) {
      resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top */}
        <div className="rounded-[2rem] border border-cyan-900/30 bg-gradient-to-br from-[#08111f] via-[#0b1628] to-[#10223d] p-6 shadow-xl sm:p-8">
          <button
            onClick={() => navigate("/admin")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-lime-300"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">
                Admin Products
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Manage Products
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Add, edit, and delete products here. Changes made on this page
                will reflect on the public products pages.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-900/30 bg-[#09111d] px-5 py-4">
              <p className="text-sm text-slate-400">Total Products</p>
              <p className="text-3xl font-bold text-lime-300">
                {totalProducts}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-900/25 p-3 text-lime-300">
                {isEditing ? <Pencil size={22} /> : <Plus size={22} />}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Product" : "Post New Product"}
                </h2>
                <p className="text-slate-400">
                  Fill in the details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition focus:border-lime-300"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Upload from your device (phone/laptop files).
                    {isUploadingImage ? " Processing image..." : ""}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Old Price
                  </label>
                  <input
                    type="number"
                    name="oldPrice"
                    value={form.oldPrice}
                    onChange={handleChange}
                    placeholder="Enter old price"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Stock
                  </label>
                  <select
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition focus:border-lime-300"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Badge
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={form.badge}
                    onChange={handleChange}
                    placeholder="e.g. New, Featured, Best Seller"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    rows="3"
                    value={form.shortDescription}
                    onChange={handleChange}
                    placeholder="Brief description for product cards"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Full Description
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Full product description"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="Comma-separated tags"
                    className="w-full rounded-2xl border border-cyan-800/40 bg-[#09111d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-lime-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-cyan-700 bg-[#09111d]"
                  />
                  Featured Product
                </label>

                <label className="inline-flex items-center gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="newArrival"
                    checked={form.newArrival}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-cyan-700 bg-[#09111d]"
                  />
                  New Arrival
                </label>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-lime-200"
                >
                  {isEditing ? <Save size={18} /> : <Plus size={18} />}
                  {isEditing ? "Update Product" : "Add Product"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
                  >
                    <X size={18} />
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-900/25 p-3 text-lime-300">
                <Package size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Live Preview</h2>
                <p className="text-slate-400">
                  Quick look at the product card feel
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-cyan-900/30 bg-[#09111d]">
              <div className="h-72 overflow-hidden bg-[#050b16]">
                {form.image ? (
                  <img
                    src={form.image}
                    alt={form.name || "Product preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-500">
                    Image preview
                  </div>
                )}
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    {form.name || "Product name"}
                  </h3>

                  <span className="rounded-full bg-cyan-400/15 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                    {form.stock || "In Stock"}
                  </span>
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {form.shortDescription || "Short description preview"}
                </p>

                <div className="flex items-center gap-3 text-base">
                  <span className="font-bold text-lime-300">
                    GHS {form.price || "0"}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    GHS {form.oldPrice || "0"}
                  </span>
                </div>

                {form.badge && (
                  <span className="inline-flex rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">
                    {form.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="rounded-[2rem] border border-cyan-900/30 bg-[#0b1628] p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Current Products</h2>
              <p className="mt-1 text-slate-400">
                Manage existing products from here.
              </p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d]"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row">
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-[#050b16] sm:w-32">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-cyan-300">
                            {product.category}
                          </p>
                        </div>

                        {product.badge && (
                          <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-bold text-slate-950">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {product.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <span className="font-bold text-lime-300">
                          GHS {product.price}
                        </span>
                        <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-300">
                          {product.stock}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900/30 hover:text-white"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product.id, product.name)
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-cyan-900/30 bg-[#09111d] px-6 py-12 text-center">
              <h3 className="text-xl font-bold text-white">No products yet</h3>
              <p className="mt-2 text-slate-400">
                Add your first product using the form above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;