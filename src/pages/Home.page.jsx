import React, { useState,useEffect } from "react";
import axios from "axios";
import "../index.css";
//Components
import EnterntentmentCardSlider from "../components/Entertentment/EnterntentmentCard.Component";
import HeroCarousal from "../components/HeroCarousal/HeroCarousal.Component";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
//Layout HOC
import DefaultLayoutHoc from "../layout/Default.layout";


const HomePage = () => {
  const [recommandedMovies, setRecommendedMovies] = useState([]);
  const [premierMovies, setPremierMovies] = useState([]);
  const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

  useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=5d4beed8f7bad87e370bd73ef01bb2af");
      setRecommendedMovies(getPopularMovies.data.results);
    };

    requestPopularMovies();
  }, []);

  return (
    <>
      <HeroCarousal />

      <div className="container mx-auto px-4 md:px-12 my-8">
        <h1 className="text-2xl font-bold text-gray-800 sm:ml-3 ml-0 my-3">
          Best of Enterntentment
        </h1>

        <EnterntentmentCardSlider />

      </div>
      
      

      <div className="container mx-auto px-4 md:px-12 my-8">
        <PosterSlider
          title="Recommanded Movies"
          subject="List of Recommanded Movies"
          posters={recommandedMovies}
          isDark={false}
        />
      </div>

      <div className="bg-premier-800 py-12">
        <div className="container mx-auto p-4 md:px-12 my-8 flex flex-col gap-3">
          <div className="hidden md:flex">
            <img
              src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
              alt="Rupay"
              className="w-full h-full"
            />
          </div>
          <PosterSlider
            title="Premiers"
            subject="Brand New Releases Every Friday"
            posters={premierMovies}
            isDark={true}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-12 my-8 ">
        <PosterSlider
          title="Online Streaming Event"
          subtitle=""
          posters={onlineStreamEvents}
          isDark={false}
        />
      </div>
    </>
  );
};

export default DefaultLayoutHoc(HomePage);
