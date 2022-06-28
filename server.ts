import app from "./app";
import setUpDatabase from "./src/helpers/db";

// Configurations
import { config } from 'dotenv'
config()

// DB
setUpDatabase(process.env.CONNECTION_STRING)

// Configuring Port
app.listen(process.env.PORT, () => {
  console.log(`app listening at http://localhost:${process.env.PORT}`)
})