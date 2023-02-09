import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectToDB = async (url) => {
  await mongoose.connect(url);
};
