import dbConnect from "src/utils/dbconnect";

import User from "src/models/userModel";

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
  const checkReg = await User.findOne({ email: data.email });

  if (!checkReg) {
    await data.save();
    return "success";
  } else {
    return "An account with the given email already exists.";
  }
    // await User.updateOne(
    //   { userEmail: data.userEmail },
    //   { $set: { query: data.query } },
    // );
  // } else {
  //   await data.save();
  // }
}

// export async function updateData(newData) {
//   await dbConnect();
//   const data = new User(newData);
//   await User.updateOne(
//     { userEmail: data.userEmail },
//     { $set: { query: data.query } },
//   );
// }
