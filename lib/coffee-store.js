import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY_UPSPLASH,
});

const getUrlCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee-shop",
    page: 1,
    perPage: 10,
    orientation: "landscape",
  });

  const unsplashResults = photos.response.results;

  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStoresPhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlCoffeeStores("11.9363763%2C79.7723281", "coffee", 6),
    options
  );

  const data = await response.json();
  return data.results.map((result, idx) => {
    return {
      ...result,
      id: result.fsq_id,
      name: result.name,
      address: result.location.address != null ? result.location.address : "",
      locality:
        result.location.locality != null ? result.location.locality : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};
