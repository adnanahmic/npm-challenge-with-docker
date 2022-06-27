import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { initRoutes } from "./src/routes";
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

initRoutes(app)

module.exports = app;