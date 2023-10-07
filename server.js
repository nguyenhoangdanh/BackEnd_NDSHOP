

const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`)
});

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
//   }

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

const PORT = process.env.PORT || 1000;
//create server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    // console.log(`Server is running on http://localhost:${process.env.PORT}`)
});

//unhandled promise rejection
process.on("uncaughtException", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})
