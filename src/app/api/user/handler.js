import Client from "src/models/clientModel";
import dbConnect from "src/utils/dbconnect";
const ObjectId = require('mongodb').ObjectId;

export async function getClientData() {
  // Fetch all data from the collection
  await dbConnect();
  const result = await Client.find({});

  return result;
}

export async function createClientData(newData) {
  // Create a new instance of the Data model and save it to the database
  await dbConnect();
  const data = new Client(newData);
  if (await Client.findOne({ userEmail: data.userEmail })) {
    await Client.updateOne(
      { userEmail: data.userEmail },
      { $set: { amount: data.amount, status: data.status } },
    );
  } else {
    await data.save();
  }

  return data;
}

export async function deleteClientData(deldata) {
  await dbConnect();
  const objectId = new ObjectId(deldata);
  if ( await Client.findOne({ _id: objectId })) {
    const data = await Client.deleteOne({ _id: objectId });

    return data;
  }
}
