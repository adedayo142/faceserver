const express=require('express') 
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt-nodejs')
const cors=require('cors')
const knex= require('knex')


const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1994',
    database : 'face'
  }
});


const app=express();
app.use(cors())
app.use(bodyParser.json())


const database={
	users:[
	{
		id:'123',
		name:'dayo',
		email:'adedayo142@gmail.com',
		password: 'samson',
		entries:0,
		joined:new Date()
	},

	{
		id:'124',
		name:'sayo',
		email:'sayo142@gmail.com',
		password:'samson',
		entries:0,
		joined:new Date()
	}

	],
	login: [
		{
			id: '987',
			hash:'',
			email:'adedayo142@gmail.com'
		}
	]
}


app.get('/',(req,res)=> {
	res.send(database.users)
})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
 
 app.post('/imagurl',(req,res)=>{image.handleApiCall(req,res)})
 
app.listen(3000, ()=>{
	console.log('app is running port 3000');
}) 



// bcrypt.compare("bacon", '$2a$10$Kw0Tark7z38cM3KVhOEL1uGqrWbNMFDDGwGu7dmEafp3S1WAMkspK', function(err, res) {
   
// });
// bcrypt.compare("veggies", hash, function(err, res) {
  
// });

// bcrypt.compare("apples", '$2a$10$jUMLP5PaIF7PDivhc76AIePxmL3J4TUKOiuUp4Ucw6dsWaCnBfcXC',function(err,res) {
//     console.log('first guess', res)
// });
// bcrypt.compare("veggies", '$2a$10$jUMLP5PaIF7PDivhc76AIePxmL3J4TUKOiuUp4Ucw6dsWaCnBfcXC',function(err,res) {
//     console.log('second guess', res)
// });

// db.select('*').from('users').then(data=>{
// 	console.log(data)
// })



// database.users.push({
// 	 	id: '123',
// 	 	name: name,
// 	 	email:email,
// 	 	entries: 0,
// 	 	joined: new Date()

// 	 })

// if (req.body.email===database.users[0].email &&
// 		req.body.password===database.users[0].password) {
// 		res.json('success')
// 	} else{
// 		res.status(400).json('error logging in')
// 	}
