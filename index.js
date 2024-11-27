
const express = require('express'); 
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path  =require('path');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comments');



app.use(cors())
const corsOptions = {
    origin: '*',
    credential:true
}

app.use(cors(corsOptions));

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database connection established");
        
    }
    catch(err) {
        console.log(err);
    }
}// middleware
dotenv.config()
app.use(express.json())

app.use("/images",express.static(path.join(__dirname , "/images")))
console.log(cors());

app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)

// Upload img
const storage = multer.diskStorage({
    destination: (req,file,fn) =>{
        fn(null, "images")
    },
    filename:(req,file,fn) =>{
        fn(null,req.body.img)
    }

})
const upload = multer({storage:storage})
app.post("api/upload", upload.single("file"), (req,res) =>{
    res.status(200).json("image upload sucessu]fully")
})


app.listen(process.env.PORT, () =>{
    connectDB(),
    console.log("app is running on port" + process.env.PORT);
})