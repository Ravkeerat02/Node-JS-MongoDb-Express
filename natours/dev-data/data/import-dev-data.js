const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel')
const User = require('./../../models/userModel')

dotenv.config({ path: './config.env' });
// SETTING UP DATABASE
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

// read json file 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8')); 
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8')); 
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,'utf-8')); 

// importing data in db 
const importData = async () =>{
  try{
    await Tour.create(tours);
    await User.create(users,{
      validateBeforeSave : false
    });
    await Review.create(reviews);
    console.log('Data loaded properly');
  }catch(err){
    console.log(err);
  }
}
// deleting all data from db
const deleteData = async() =>{
  try{
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data deleted properly');
  }catch(err){
    console.log(err);
  }
  process.exit()
} 

if(process.argv[2] === '--import'){
  importData()
}else if(process.argv[2] === '--delete'){
  deleteData()
}

