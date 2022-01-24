const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const router = require("./router");

const PORT = process.env.PORT || 3000;
const SECRET = "nkA$SD89&&282hd";

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.user;
    if (token) {
      const user = jwt.verify(token, SECRET);
      req.user = user;
    }
    next();
  });

app.use(express.static("public"));
app.use(router)
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});





