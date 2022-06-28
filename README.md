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



#Why I chose MongoDB (NOSQL) over SQL Databases.

- To prevent the database from becoming a system-wide bottleneck, especially in high volume environments, NoSQL databases perform in a way that relational databases cannot.

- Storing large volumes of data without structure: A NoSQL database doesn’t limit storable data types. Plus, you can add new types as business needs change.

-MongoDB — The most popular NoSQL system, especially among startups. A document-oriented database with JSON-like documents in dynamic schemas.

#Using cloud computing and storage: 
Cloud-based storage is a great solution, but it requires data to be easily spread across multiple servers for scaling. Using affordable hardware on-site for testing and then for production in the cloud is what NoSQL databases are designed for.

#Rapid development: 
If you are developing using modern agile methodologies, a relational database will slow you down. A NoSQL database doesn’t require the level of preparation typically needed for relational databases.

#Flexibility: 
You can add new columns or fields on MongoDB without affecting existing rows or application performance.

#Support Integrated Caching: 
NoSQL database support caching in system memory so it increases data output performance and SQL database where this has to be done using separate infrastructure.

#Dynamic schema: 
As mentioned, this gives you flexibility to change your data schema without modifying any of your existing data.

#Scalability: 
MongoDB is horizontally scalable, which helps reduce the workload and scale your business with ease.

#Manageability: 
The database doesn’t require a database administrator. Since it is fairly user-friendly in this way, it can be used by both developers and administrators.

#Speed: 
It is high-performing for simple queries.

#Additional Points: 
- Maintaining NoSQL Servers (MongoDB) is Less Expensive.
- Lesser Server Cost and Open-Source NoSQL databases are cheap and open source.
- MongoDB is used to save unstructured data in JSON format.

#Limitations for SQL database:

#Scalability: 
Users have to scale relational database on powerful servers that are expensive and difficult to handle. To scale relational database, it has to be distributed on to multiple servers. Handling tables across different servers is difficult.

#Complexity: 
In SQL server’s data has to fit into tables anyhow. If your data does not fit into tables, then you need to design your database structure that will be complex and again difficult to handle.

- SQL databases are used to store structured data while NoSQL databases like MongoDB are used to save unstructured data.
