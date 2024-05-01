const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const { connectDB } = require("./utils/db");
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config()
const port = process.env.PORT || 5000;
const empRouter = require('./routers/employeeRouter'); 
const loginRouter = require('./routers/loginRouter'); 
const { errorHandler } = require("./utils/errorHandler");


app.use("/api/emp",empRouter)
app.use("/api/admin",loginRouter)

app.use(errorHandler)



app.listen(port, () => {
  console.log(`listening at ${port}`);
  connectDB()
});