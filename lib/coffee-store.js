const getUrlCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
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
  // .catch((err) => console.error(err));
  return data.results;
};
