import MongoDb from "./models/db"
import routes from "./routes/routes";

const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }

MongoDb().then((db) => {

  app.use(cors(corsOptions));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(routes(db))
  
  const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
  
})
