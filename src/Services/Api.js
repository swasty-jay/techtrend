import { supabase } from "./../../supabase";

export async function fetchAppleProducts() {
  const { data, error } = await supabase.from("apple_products").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
