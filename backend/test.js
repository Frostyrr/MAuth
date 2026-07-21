
import mongoose from "mongoose";

import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dns.promises
  .resolveSrv("_mongodb._tcp.cluster0.lm306co.mongodb.net")
  .then(console.log)
  .catch(console.error);

const uri = "mongodb+srv://marcrebs:marclight@cluster0.lm306co.mongodb.net/?appName=Cluster0";

try {
  await mongoose.connect(uri);
  console.log("Connected!");
  process.exit(0);
} catch (err) {
  console.error(err);
}