const cors = require("cors");
const express = require("express");

const create = require("./routes/create.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (_, res) => {
  res.json({ message: "I live ...again!" });
});

app.post("/create", create.routes);

app.use((err, _, res, _1) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
