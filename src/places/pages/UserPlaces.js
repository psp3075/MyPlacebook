import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Gol Gumbaz",
    description:
      "Striking, 17th-century tomb of Mohammed Adil Shah with a huge dome and a notable whispering gallery.",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipNuC_asCHXPk0mhSvw128CV7WBt8hbe8rQ8qRB0=w408-h408-k-no",
    address: "Jadar Galli, Vijayapura, Karnataka 586104",
    location: {
      lat: 16.8302623,
      lng: 75.7361152,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Gol Gumbaz",
    description:
      "Striking, 17th-century tomb of Mohammed Adil Shah with a huge dome and a notable whispering gallery.",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipNuC_asCHXPk0mhSvw128CV7WBt8hbe8rQ8qRB0=w408-h408-k-no",
    address: "Jadar Galli, Vijayapura, Karnataka 586104",
    location: {
      lat: 16.8302623,
      lng: 75.7361152,
    },
    creator: "u2",
  },
];

function UserPlaces(props) {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
