import { supabase } from "./../../supabase";

export async function fetchAppleProducts() {
  const { data, error } = await supabase
    .from("apple_products")
    .select("*")
    .eq("brand", "apple"); // Fetch only products of type 'apple'

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

/////////SAMSUNG PRODUCTS///////////
export async function fetchSamsungProducts() {
  const { data, error } = await supabase
    .from("samsung_products")
    .select("*")
    .eq("brand", "samsung");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

///////////////SONY PRODUCTS////////////

export async function fetchPlaystationProducts() {
  const { data, error } = await supabase
    .from("playstation_products")
    .select("*")
    .eq("brand", "Playstation"); // Fetch only products of type 'apple'

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
