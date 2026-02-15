const express = require("express");
const app = express();
const port = 5500;
const authRouter = require("./routers/authRouter.js");
const authMiddleware  = require("./middlewares/authMiddleware.js");
const profileController  = require("./controllers/profileController.js");


app.use(express.json());
app.use("/auth", authRouter);


app.listen(port, ()=>{
    console.log(`listening at port: ${port}`);
});

app.get("/profile", authMiddleware, profileController);


app.get("/", (req, res)=>{
    res.send("Login auth");
})



