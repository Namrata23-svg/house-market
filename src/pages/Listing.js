import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase. config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/listing.css";
import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();//eslint-disable-line
  const params = useParams();
  const auth = getAuth();//eslint-disable-line

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
            <img  src="https://firebasestorage.googleapis.com/v0/b/house-market-37fa4.appspot.com/o/images%2FV84CKcQ8CpNN98EsdxdPqG7Gy6G3-istockphoto-1436217023-2048x2048.jpg-7852b6b6-af3a-4d1c-89a0-039ad1abf4a9?alt=media&token=2afcf7b9-0a0c-4401-b66b-f1fd2b4ddb80" />
            </div>
            <div className="col-md-4 listing-container-col2">
            <h3>{listing.name}</h3>
            <h6>
              Price :{" "}
              {listing.offer ? listing.discountedPrice : listing.regularPrice} /
              RS
            </h6>
            <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
            <p>
              {listing.offer && (
                <span>
                  {listing.regularPrice - listing.discountedPrice} Discount
                </span>
              )}
            </p>
             

            <p>
            <FaBed size={20} /> &nbsp;
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <p>
            <FaBath size={20} /> &nbsp;
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 Bathroom"}
            </p>
            <p>
            <FaParking size={20} /> &nbsp;
              {listing.parking ? `Parking spot` : "no spot for parking"}</p>
            <p>
            <FaHouseDamage size={20} /> &nbsp;
              {listing.furnished ? `furnished house` : "not furnished"}</p>
            <Link
              className="btn btn-success"
              to={`/contact/${listing.useRef}?listingName=${listing.name}`}
            >
              Contact Landlord <FaArrowCircleRight size={20} />
            </Link>
          </div>
        </div>
      
    </Layout>
  );
};

export default Listing;