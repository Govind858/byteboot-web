const BASE_URL = "http://localhost:3000";

// adminApi.js or wherever your API functions are
export const createProduct = async (formData: FormData) => {
  try {
    const response = await fetch(`${BASE_URL}/product`, {
      method: "POST",
      body: formData,
      // IMPORTANT: Do NOT set Content-Type header manually
      // browser will set it to multipart/form-data with boundary automatically
    });

    if (!response.ok) {
      let errorMsg = `Server error: ${response.status}`;
      try {
        const errData = await response.json();
        errorMsg = errData.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error("Create product failed:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response metadata:", {
      status: response.status,
      ok: response.ok,
      url: response.url,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Actual JSON data:", data);          // ← this is what you want

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    // Pass the 'id' directly into the URL string
    const response = await fetch(`${BASE_URL}/product/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response metadata:", {
      status: response.status,
      ok: response.ok,
      url: response.url,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Actual JSON data:", data);          

    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};