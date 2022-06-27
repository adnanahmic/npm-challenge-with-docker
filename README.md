# Test Node.Js Task With Docker

Require the node version to be v12+
Install the ts version of node by using the command `npm install -g ts-node`
Install all the dependencies using the command `npm install` in the root directory

Create a .env file in the root of folder and put the following variables in the .env file

`CONNECTION_STRING`
`port`
`NODE_ENV`
`JWT_SECRET`

After configuring the .env and installing all the dependencies 
Run the command `npm run dev` and this command will execute your project

# Running with docker
- install docker desktop or cli
- start docker doemon
- run build command "`docker-compose --build`"
- run up command to run the containers "`docker-composer up`"
- to keep containers running please use "`docker-composer up -d`"

Note: When you will be running the app using docker please check the following URL's. For further details & port mapping please check .yml file

URL's:
- http://localhost (Node APP)
- http://localhost:27017 (To connect MongoCompas)