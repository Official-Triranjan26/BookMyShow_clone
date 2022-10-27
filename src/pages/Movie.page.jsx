import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/Movie.context";
import MovieLayoutHoc from "../layout/Movie.layout";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
import MovieHero from "../components/MovieHero/MovieHero.Component";
import { FaCcVisa, FaCcApplePay } from "react-icons/fa";
import Slider from "react-slick";
import Cast from "../components/cast/Cast.Component";
import PaymentModal from "../components/PaymentModal/Payment.Component";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, setMovie } = useContext(MovieContext);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const requestCast = async () => {
      const getCast = await axios.get(`/movie/${id}/credits`);
      setCast(getCast.data.cast);
    };

    requestCast();
  }, [id]);

  useEffect(() => {
    const requestSimilarMovies = async () => {
      const getSimilarMovies = await axios.get(`/movie/${id}/similar`);
      setSimilarMovies(getSimilarMovies.data.results);
    };

    requestSimilarMovies();
  }, [id]);

  useEffect(() => {
    const requestRecommendedMovies = async () => {
      const getRecommendedMovies = await axios.get(
        `/movie/${id}/recommendations`
      );
      setRecommendedMovies(getRecommendedMovies.data.results);
    };

    requestRecommendedMovies();
  }, [id]);

  useEffect(() => {
    const requestMovie = async () => {
      const getMovieData = await axios.get(`/movie/${id}`);
      setMovie(getMovieData.data);
    };

    requestMovie();
  }, [id]);

  //settings
  const settingCast = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 4,
        },
      },
    ],
  };

  return (
    <>
      <MovieHero />

      <div className="my-12 container px-4 lg-ml-20 lg:w-2/3">
        {/* About the movie title */}
        <div className="flex flex-col items-start gap-3">
          <h1 className="font-bold text-gray-800 text-2xl">About the Movie</h1>
          <p>{movie.overview}</p>
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* Applicable Offers */}
        <div className="flex flex-col items-start my-8">
          <h1 className="font-bold text-gray-800 text-2xl">
            Applicable Offers
          </h1>

          <div className="flex flex-col lg:flex-row gap-2 my-4">
            {/* visa offer */}
            <div className="flex gap-2 flex-row bg-yellow-100  border-yellow-400 border-dashed border-2 p-3 rounded-md">
              <div className="w-8 h-8">
                <FaCcVisa className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold">Visa Stream Offer</h3>
                <p>
                  Get 50% off up to INR 150 on all RuPay card* on BookMyShow
                  Stream.
                </p>
              </div>
            </div>

            {/* applePay offer */}
            <div className="flex gap-2 flex-row bg-yellow-100 border-yellow-400 border-dashed border-2 p-2 rounded-md">
              <div className="w-8 h-8">
                <FaCcApplePay className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold">Film Pass</h3>
                <p>
                  Get 50% off up to INR 150 on all RuPay card* on BookMyShow
                  Stream.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* Cast slider */}
        <div className="my-8">
          Cast and Crue
          <h2 className="text-gray-800 font-bold text-2xl mb-2"></h2>
          <Slider {...settingCast}>
           {cast.map((castData)=>(
             <Cast
             image={castData.profile_path}
             castName={castData.original_name}
             role={castData.character}
           />
           ))}
          </Slider>
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* Recommanded Movies slider */}
        <div className="my-8">
          <PosterSlider
            config={settings}
            title="Recommended Movies"
            posters={recommendedMovies}
            isDark={false}
          />
        </div>

        <div className="my-8">
          <hr />
        </div>

        {/* Recommanded Movies slider */}
        <div className="my-8">
          <PosterSlider
            config={settings}
            title="You might also like"
            posters={recommendedMovies}
            isDark={false}
          />
        </div>
      </div>
    </>
  );
};

export default MovieLayoutHoc(MoviePage);
