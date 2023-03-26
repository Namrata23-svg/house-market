import React, { useState, useEffect } from "react";
import {ImLocation2} from "react-icons/im";
import { db } from "../firebase. config";
import "../styles/slider.css";
import {
  collection,
  getDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import Spinner from "./Spinner";

//config
SwipeCore.use([EffectCoverflow, Pagination]);


const Slider = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigat = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
          const listingRef = collection(db, "listings");
          const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
          const querySnap = await getDocs(q);
          let listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setLoading(false);
          setListings(listings);
        };
        fetchListings();
        console.log(listings === null ? "loading" : listings);
    },[]);

    if (loading) {
      return <Spinner />;
    }

    return (
    <>
           <div style={{ width: "100%" }}>
           <img
                  src={"https://media.istockphoto.com/id/1368300770/photo/contemporary-modern-home-in-montana.jpg?s=2048x2048&w=is&k=20&c=GDfbr95Loz7zCvdEEbDacWLSy1o8_tIF8sQQS2hPBq8="}
                  
                  className="slider-img"
                />
                <h4 className=" text-light p-4 m-0 ">
                  {/* <img alt="user pic" src={userPic} height={35} width={35} /> */}
                  <ImLocation2 size={20} className="ms-2" /> Recently Added :{" "}
                  <br /></h4>

           </div>
    </>
    );    
  };
          

export default Slider
