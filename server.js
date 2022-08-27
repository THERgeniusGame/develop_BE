require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () =>{
    console.log('Socket IO server listening on port '+process.env.PORT);
  }
);
