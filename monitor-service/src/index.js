const { PORT } = require("./config");
const expressApp = require("./express-app");

const startServer = async () => {
  // Express App
  const app = expressApp();

  app
    .listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
    });
};

startServer();
