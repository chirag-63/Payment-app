const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;
const rootRouter = require("./routes/index");

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, ()=>{
    console.log(`backend is up at port-${port}`)
});