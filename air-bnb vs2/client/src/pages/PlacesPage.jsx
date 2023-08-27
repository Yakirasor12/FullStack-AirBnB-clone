import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";


export default function PlacesPage() {
  const [places,setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places/user-places').then(({data}) =>{
      setPlaces(data);
    })
  },[])

async function removeForm(event, placeLink) {
  event.preventDefault();
  console.log(placeLink);

  try {
    await axios.delete(`/places/updateForm/${placeLink}`);
    setPlaces((prevPlaces) =>
      prevPlaces.filter((form) => form._id !== placeLink)
    );
  } catch (error) {
    console.error("Error deleting form:", error);
  }
}

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <div className="flex" key={place.owner + place._id + place.id}>
              <div>
                <Link
                  key={place._id}
                  to={"/account/places/" + place._id}
                  className=" flex cursor-pointer mt-2 gap-4 bg-gray-100 p-4 rounded-2xl grow shrink-0"
                >
                  <div className="flex bg-gray-300">
                    <PlaceImg place={place} className={"images-places"} />
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              </div>
              <div>
                <button
                  onClick={(event) => removeForm(event, place._id)}
                  className="cursor-pointer absolute
          right-8 mt-5  text-white bg-black bg-opacity-50 rounded-2xl p-1 py-3 px-3
          "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-4 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
