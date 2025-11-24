// src/components/Home.jsx
import React from "react";
import Hero from "./hero/Hero";
import Popular from "./popular/Popular";
import Offer from "../Offers/Offer";
import NewCollections from "../NewCollection/NewCollections";
import Newsletter from "../NewLetter/NewLetter";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offer />
      <NewCollections />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
