import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_UPSPLASH,
});

const getUrlCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee-shop",
    perPage: 40,
    orientation: "landscape",
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "11.9363763%2C79.7723281",
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresPhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlCoffeeStores(latLong, "coffee", limit),
    options
  );

  const data = await response.json();

  return data.results.map((result, idx) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address != null ? result.location.address : "",
      locality:
        result.location.locality != null ? result.location.locality : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
