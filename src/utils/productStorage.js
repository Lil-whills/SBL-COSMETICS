import seededProducts from "../data/products";

const PRODUCT_STORAGE_KEY = "sbl_products";

const normalizeId = (id) => String(id);

const emitProductsUpdated = (products) => {
  window.dispatchEvent(
    new CustomEvent("productsUpdated", {
      detail: products,
    })
  );
};

export const getStoredProducts = () => {
  const existing = localStorage.getItem(PRODUCT_STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(seededProducts));
    return seededProducts;
  }

  try {
    return JSON.parse(existing);
  } catch (error) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(seededProducts));
    return seededProducts;
  }
};

export const saveProducts = (products) => {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
  emitProductsUpdated(products);
  return products;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const generateProductId = (products) => {
  if (!products.length) return 1;
  return Math.max(...products.map((item) => Number(item.id) || 0)) + 1;
};

export const addProduct = (productData) => {
  const products = getStoredProducts();

  const baseSlug = generateSlug(productData.name);
  let slug = baseSlug;
  let counter = 1;

  while (products.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const newProduct = {
    id: generateProductId(products),
    slug,
    brand: "SBL Cosmetics",
    currency: "GHS",
    rating: Number(productData.rating) || 4.5,
    reviews: Number(productData.reviews) || 0,
    images: productData.image ? [productData.image] : [],
    featured: Boolean(productData.featured),
    newArrival: Boolean(productData.newArrival),
    tags: productData.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...productData,
  };

  const updatedProducts = [newProduct, ...products];
  saveProducts(updatedProducts);
  return newProduct;
};

export const updateProduct = (productId, updates) => {
  const products = getStoredProducts();
  const targetId = normalizeId(productId);

  const updatedProducts = products.map((product) => {
    if (normalizeId(product.id) !== targetId) return product;

    let nextSlug = product.slug;

    if (updates.name && updates.name !== product.name) {
      const baseSlug = generateSlug(updates.name);
      nextSlug = baseSlug;
      let counter = 1;

      while (
        products.some(
          (item) =>
            normalizeId(item.id) !== targetId && item.slug === nextSlug
        )
      ) {
        nextSlug = `${baseSlug}-${counter}`;
        counter += 1;
      }
    }

    return {
      ...product,
      ...updates,
      slug: nextSlug,
      images: updates.image ? [updates.image] : product.images || [],
      updatedAt: new Date().toISOString(),
    };
  });

  saveProducts(updatedProducts);
  return updatedProducts.find((item) => normalizeId(item.id) === targetId);
};

export const deleteProduct = (productId) => {
  const products = getStoredProducts();
  const targetId = normalizeId(productId);
  const updatedProducts = products.filter(
    (item) => normalizeId(item.id) !== targetId
  );
  saveProducts(updatedProducts);
  return updatedProducts;
};

export const getProductBySlug = (slug) => {
  const products = getStoredProducts();
  return products.find((item) => item.slug === slug);
};

export const onProductsUpdated = (callback) => {
  const handler = (event) => {
    callback(event.detail || getStoredProducts());
  };

  window.addEventListener("productsUpdated", handler);
  return () => window.removeEventListener("productsUpdated", handler);
};