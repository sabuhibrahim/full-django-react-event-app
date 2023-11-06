import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Clubs from "./pages/clubs";
import { useTheme } from "./store/theme-context";
import useUser from "./hooks/use-user";


function App() {
  const { theme } = useTheme();
  useUser();
  return (
    <div 
      className={
        theme + " " +
        "text-primary bg-primary relative mx-auto flex w-full flex-col px-[10vw] md:px-[5vw] pb-20"
      }
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Clubs/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
