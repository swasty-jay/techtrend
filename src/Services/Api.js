import { supabase } from "./../../supabase";

export async function fetchAppleProducts() {
  const { data, error } = await supabase.from("apple_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/////////SAMSUNG PRODUCTS///////////
export async function fetchSamsungProducts() {
  const { data, error } = await supabase.from("samsung_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

///////////////SONY PRODUCTS////////////

export async function fetchSonyProducts() {
  const { data, error } = await supabase.from("sony_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
