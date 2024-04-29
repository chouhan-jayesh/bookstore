import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

const bookModel = mongoose.model("Book", Book);


app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome sir");
});

//Save Book route
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    //create a new book
    const Book = await bookModel.create(newBook);
    return res.status(201).send(Book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App started at port ${PORT}`);
    });
  })
  .catch(console.error());
