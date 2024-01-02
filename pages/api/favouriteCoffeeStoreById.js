const favouriteCoffeeStoreById = (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;
    res.json({ "this works": id });
  }
};

export default favouriteCoffeeStoreById;
