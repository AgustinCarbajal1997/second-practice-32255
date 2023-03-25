const app = require("./app");

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Se inicio el servidor en puerto ${PORT}`);
});
