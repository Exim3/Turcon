import mongoose from "mongoose";

const connecttoMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDb");
  } catch (error) {
    console.log("Error connecting to Mongodb", error.message);
  }
};
export default connecttoMongoDb;
