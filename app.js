import './src/public/style.css';


export default {
    server: {
      host: '0.0.0.0',  // Allow external access
      port: 5173,       // Ensure the port is the same as your server's port
    }
  };

// export default defineConfig({
//   root: "src/",
//   build: {
//     outDir: "../dist",
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, "src/index.html"),
//         cart: resolve(__dirname, "src/cart/index.html"),
//         checkout: resolve(__dirname, "src/checkout/index.html"),`
//         product: resolve(__dirname, "src/product_pages/index.html"),
//         listing: resolve(__dirname, "src/product_listing/index.html"),
//       },
//     },
//   },
// });
