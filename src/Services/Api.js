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

// // pages/_app.js
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// function MyApp({ Component, pageProps }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Component {...pageProps} />
//       {process.env.NODE_ENV === "development" && (
//         <ReactQueryDevtools initialIsOpen={false} />
//       )}
//     </QueryClientProvider>
//   );
// }

// export default MyApp;
