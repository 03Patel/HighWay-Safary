require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const experiencesRoute = require('./routes/experiences');
const bookingsRoute = require('./routes/bookings');
const promoRoute = require('./routes/promo');


const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/experiences', experiencesRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/promo', promoRoute);


const PORT =  5000;

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
mongoose.connect("mongodb+srv://bit21cs51_db_user:nAYJm7YN7K3jDli1@cluster0.vcnchty.mongodb.net/", 
    {
         useNewUrlParser: true,
          useUnifiedTopology: true
         })
.then(()=> {
console.log('MongoDB connected');
app.listen(PORT, ()=> console.log('Server running on', PORT));
})
.catch(err => console.error(err));