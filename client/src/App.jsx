import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BlogListProvider from "./store/blog-app-store";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <BlogListProvider>
        <AppRoutes />
      </BlogListProvider>
    </BrowserRouter>
  );
}

export default App;
