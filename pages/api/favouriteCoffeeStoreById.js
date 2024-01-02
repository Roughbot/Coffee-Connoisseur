import {
  findRecordByFilter,
  table,
  getMinifiedRecords,
} from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.votes) + parseInt(1);

          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                votes: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          }
        } else {
          res.json({ message: "coffee store doesn't exist ", id });
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Error occured while voting", error });
    }
  }
};

export default favouriteCoffeeStoreById;
