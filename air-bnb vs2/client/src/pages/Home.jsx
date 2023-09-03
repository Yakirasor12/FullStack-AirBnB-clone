import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home({ searchQuery, setSearchQuery }) {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  useEffect(() => {
    const filteredPlaces1 = async() => {
      const placesData = (await axios.get("/places")).data
      if (searchQuery === "") {
        setFilteredPlaces(placesData);
      } else {
        const filtered = places.filter((place) =>
          place.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPlaces(filtered);
      }
    };

    filteredPlaces1();
  }, [searchQuery]);


  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4 HomePage">
      {filteredPlaces.length > 0 ? (
        filteredPlaces.map((place) => (
          <Link to={"/places/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price} per night</span>
            </div>
          </Link>
        ))
      ) : (
        <p>No places match your search query.</p>
      )}
    </div>
  );
}
