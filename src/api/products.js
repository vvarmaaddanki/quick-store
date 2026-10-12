const BASE_URL = "https://dummyjson.com";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error("Could not load products");
  }

  return response.json();
}

// Get products and apply search and category filters
export async function getProducts({
  search = "",
  category = "",
} = {}) {
  const data = await request("/products?limit=0");

  let products = data.products || [];

  // Search by product title, description, or category
  if (search.trim()) {
    const term = search.trim().toLowerCase();

    products = products.filter((product) =>
      `${product.title} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(term)
    );
  }

  // Apply category filter
  if (category) {
    products = products.filter(
      (product) => product.category === category
    );
  }

  return products;
}

// Get one product by ID
export function getProduct(id) {
  return request(`/products/${id}`);
}

// Get all available categories
export function getCategories() {
  return request("/products/category-list");
}