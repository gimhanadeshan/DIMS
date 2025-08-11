const express = require('express')
const cors = require('cors')
require('dotenv').config();
const connectdb =  require('./Config/DB')
const userRouter = require('./Router/userRouter')
const cookieParser  = require('cookie-parser') 
const app = express();

const PORT = process.env.PORT || 4000;
connectdb()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());  
app.use(cookieParser());

app.use('/api/user',userRouter)
app.get("/", (req, res) => res.send("Server is running..."));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


