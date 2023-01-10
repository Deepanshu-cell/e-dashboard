const mongoose = require("mongoose");
const url =
  "mongodb+srv://deepanshu:<password>@cluster0.cqz501k.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModfiy: false,
  })
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => {
    console.log(`no connection`);
  });
