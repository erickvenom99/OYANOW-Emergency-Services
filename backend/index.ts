import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Provider from "./ServiceProvider";
import User from "./User";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/oyanow")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/service-providers/sign-up", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const provider = new Provider({ ...req.body, passwordHash });
    await provider.save();
    res.status(201).send(provider);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/service-providers/login", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const provider = await Provider.findOne({ $or: [{ username }, { email }] });
    if (!provider) {
      return res.status(400).send("invalid username/email");
    }

    const isMatch = await bcrypt.compare(password, provider.passwordHash);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // If password is correct
    res.status(200).send({
      id: provider._id,
      username: provider.username,
      name: provider.name,
      email: provider.email,
      coordinates: provider.location?.coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users/sign-up", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ ...req.body, passwordHash });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
