const express = require('express');
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/User');
const adminRoutes = require('./routes/user/adminRoutes');
const adminDataRoutes = require('./routes/data/adminRoutes');
const orderRoutes = require('./routes/user/orderRoutes');
const orderDataRoutes = require('./routes/data/orderRoutes');

const productRoutes = require('./routes/user/productRoutes');
const productDataRoutes = require('./routes/data/productRoutes');
const cartRoutes = require('./routes/user/cartRoutes');
const cartDataRoutes = require('./routes/data/cartRoutes');
const authRoutes = require('./routes/user/authRoutes');
const authDataRoutes = require('./routes/data/authRoutes');
const isAuth = require('./middlewares/isAuth');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const sendGridKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const MONGODB_URI =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portfolio.oaldo.mongodb.net/test?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true`;

const app = express();
const port = 3000;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }
)

app.use(helmet())
app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false,store:store })
)


app.use((req,res,next) => {
  if(!req.session.user) {
      return next();
  }
  User.findById(req.session.user._id)
      .then(user => {
          if(!user) {
              return next();
          }
          req.session.user = user;
          req.session.isLoggedIn = true;
          next();
      })
      .catch(err => { 
          next(new Error(err))     
})
});



app.use(authRoutes);
app.use(authDataRoutes);


app.use(adminRoutes);
app.use(adminDataRoutes);

app.use(orderRoutes);
app.use(orderDataRoutes);


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', productRoutes);
app.use(productDataRoutes);

app.use(cartRoutes);
app.use(cartDataRoutes);



mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
