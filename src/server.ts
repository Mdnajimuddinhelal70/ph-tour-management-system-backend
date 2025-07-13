/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connect to DB!");
    server = app.listen(5000, () => {
      console.log(`Server is listening on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();

//unhandle rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandle rejection detected... server shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//signal termination error
process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//siging termination error
process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception detected... server shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**some error handling
 * unhandle rejection error
 * uncaught rejection error
 * signal termination error
 */
