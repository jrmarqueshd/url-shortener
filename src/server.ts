import server from "./config";
import { createTable } from "./db";
import shortnerRoutes from "./routes/shortner";

server.register(shortnerRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  createTable();

  console.log(`Server listening at ${address}`)
})