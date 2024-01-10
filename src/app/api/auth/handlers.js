import User from "src/models/userModel";
import dbConnect from "src/utils/dbconnect";

export async function getData() {
  // Fetch all data from the collection
  await dbConnect();
  const result = await User.find({});

  return result;
}

export async function createData(newData) {
  // Create a new instance of the Data model and save it to the database
  await dbConnect();
  const data = new User(newData);
  if (await User.findOne({ userId: data.userId })) {
  } else {
    await data.save();
  }

  return data;
}

export async function updateData(newData) {
  await dbConnect();
  const data = new User(newData);
  await User.updateOne(
    { userId: data.userId },
    { $set: { query: data.query } },
  );
}
