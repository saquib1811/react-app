import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import Head from "./components/head";
import Footer from "./components/footer";
import Body from "./components/body";

const AppLayout = () => (
  <>
    <Head />
    <Body />
    <Footer />
  </>
);
const root = createRoot(document.getElementById("root"));

root.render(<AppLayout />);
