import { supabase } from "./../../supabase";

// Fetch all Sony products
export async function fetchSonyProducts() {
  const { data, error } = await supabase.from("sony_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Fetch a single Sony product by ID
export async function fetchSonyProductById(id) {
  const { data, error } = await supabase
    .from("sony_products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// Fetch related Sony products (excluding the current product)
export async function fetchRelatedSonyProducts(currentProductId) {
  const { data, error } = await supabase
    .from("sony_products")
    .select("*")
    .neq("id", currentProductId)
    .limit(4); // Limit to 4 related products

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// You can keep the other fetch functions as they are
export async function fetchAppleProducts() {
  const { data, error } = await supabase.from("apple_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchSamsungProducts() {
  const { data, error } = await supabase.from("samsung_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
