const connectDb = require('./config/db')
const MandirDb = require('./module/modale')
const express = require('express')
const cors = require('cors')
const app = express()
const jwt_token = require('jsonwebtoken')
require('dotenv').config()
const Port = process.env.PORT || 5400

app.use(express.json())
app.use(cors({origin:'*'}))

app.post('/login',async(req,res)=>{
    try {
        const { name, email } = req.body;
        const getUser = await MandirDb.findOne({ email });

        let user;
        if (!getUser) {
            user = new MandirDb({ name, email });
            await user.save();
            console.log(user);
        } else {
            user = getUser;
        }

        const payload = { email: user.email };
        const token = jwt_token.sign(payload, 'mbstoken');
        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/',async (req,res)=>{
    try {
        const dbUsers = await MandirDb.find({})
        res.status(200).send('Hello mandir'+ dbUsers)
    } catch (error) {
        res.status(401).send(error)
    }
})
connectDb()
app.listen(Port,()=> console.log('Server running at '+Port))