const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-store");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return (records = records.map((record) => getMinifiedRecord(record)));
};

export { table, getMinifiedRecords };