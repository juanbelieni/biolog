import Airtable from 'airtable';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  'app1bscmwX7ro02c1'
);

export default airtable;
