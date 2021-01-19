const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};



module.exports = connectDb;