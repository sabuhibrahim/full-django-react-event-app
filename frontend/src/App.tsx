import React from "react";
import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Clubs from "./pages/clubs";

function App() {
  return (
    <div className="text-primary bg-primary relative mx-auto mb-20 flex w-full max-w-screen-xl flex-col px-[10vw] md:px-[5vw]">
      <Layout>
        <Routes>
          <Route path="/" element={<Clubs/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
