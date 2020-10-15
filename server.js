import express, { request, response } from 'express';
import connectDatabase from './Config/db';
import { check, validationResult } from "express-validator";
import User from './models/Users';

const app = express();
app.use(express.json({ extended: false }));

//API endpoint
app.get('/', (req, res) =>
res.sendFile(__dirname + '/client/public/index.html')

);

app.post(
  "/api/adduser", (request, respponse) => { 
    const user = new User({
      name: request.body.clientname,
      lastName: request.body.clientlastn,
      email: request.body.clientemail,
      password: request.body.clientpass
    });

    return user.save().then(data => {
        res.send(data);
    });
});

app.get("/api/allusers", (request, response) => {
    db.collection("users")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
      })
      .catch((error) => console.error(error));
});

app.post(
  "/api/users",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("lastName", "Please enter your name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with a 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      return res.send(req.body);
    }
  }
);

connectDatabase();

//Connection
const port = 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
