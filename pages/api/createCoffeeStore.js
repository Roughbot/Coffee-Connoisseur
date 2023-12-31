import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, locality, votes, imgUrl } = req.body;
    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  locality,
                  votes,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(422);
            res.send({ message: "Id or Name is required" });
          }
        }
      } else {
        res.status(422);
        res.send({ message: "Id is required" });
      }
    } catch (error) {
      console.error("Error in the request ", error);
      res.status(500);
      res.json({ message: "Error occured ", error });
    }
  }
};

export default createCoffeeStore;
