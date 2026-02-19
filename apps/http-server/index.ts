import express from "express";
import {prismaClient} from "@repo/db/client"

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})


function connetToDB() {
    try{
        const connect = prismaClient.$connect().then(() => {
            console.log("Db connected successfully");
            app.listen(3001, (() => {
                console.log("App is running in port 3000")
            }));
        }).catch((error) => {
            console.log("Error while connecting to db")
            process.exit(1);
        });   
    }catch(error){
        console.log(error);
        console.log("server error while connecting to server and db");
    }
}

connetToDB()

