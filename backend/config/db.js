import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);   
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1); // stops the server
  }
};

export default connectDB; // use in another files