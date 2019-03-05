const bcrypt = require('bcryptjs') 

module.exports ={
    register: async (req,res)=>{
        console.log(req.body);
        const {username,password} = req.body; //this is being pulled off of your request.
        // let salt = bcrypt.genSaltSync(10);
        // let hash = bcrypt.hashSync(password,salt);
        //these two lines of code above were moved down
        // console.log({hash})
        //this means that we successfully hashed our password
        const {session} = req;
        //good practice to destructure and name variables at the top
        
        const db = req.app.get('db'); //brings in the db
        
        //************ LOGIC TO CHECK IF USERNAME ALREADY EXISTS*********//////////////////
        let takenUsername = await db.auth.check_username({username}); //logic right here is to take in the destructured username and compare it to the usernames in the db 
        //the second of the username:username would be coming off of req.body
        takenUsername=+takenUsername[0].count;
        //this will turn that into a number, by putting the [0] it won't return the full thing: { takenUsername: [ { count: '0' } ] } but would just be { takenUsername: 0 } 
    
        //the .count is referencing the count property that is in the object.  
        if (takenUsername !== 0) {
            return res.sendStatus(409)
        //if the username exist (or takenUsername is not equal to zero) then return a 'conflict' status. 
        //we have a return because we don't want the user to continue pass this if this is true
        }

        
        let salt = bcrypt.genSaltSync(10); //generates a salt
        let hash = bcrypt.hashSync(password ,salt); //stores a hash to the password
        let user = await db.auth.register({  username, password:hash}); //go into the db and creates the password. 
        user =user[0] //this is returning the first item from the db of the result (which includes all of the properties)
        console.log({hash})

        console.log({takenUsername})

        console.log({before:session})
        //to see if we have our table
        
        session.user=user;//this is the name that we pulled from the db and we set it to the 'client user'. Also the first time that we create the user property on req.session. 
        console.log({after:session})
        res.status(200).send(session.user) //return this to the user's request
        //this is to test if endpoints work
    },

    login: async (req,res) => {
        const {username,password} = req.body; //coming off of the request
        const{session} = req; 
        const db = req.app.get('db'); //calling the db
        console.log({username,password,session}) //testing to see if these work in
        
        let user = await db.auth.login({username}); //goes to check usernames that equal the usernames in the db
        user = user[0]; //you only want the one single object (not the array of objects)

        if(!user){ //if user doesn't exist, return Not Found. Again the return will not allow the rest of the function run. 
            return res.sendStatus(404);
        }
        let authenticated = bcrypt.compareSync(password,user.password) //so if the user exists it will then compare the inputted password (off of req.body) and the password property off of the user we just pulled from the db.
        console.log(authenticated) //this will be true or false
        if(authenticated){ //if true then remove password off of the user object and set user to req.session.user and return to the axios call
            delete user.password;
            session.user= user;
            console.log({session})
            res.status(200).send(session.user);
        } else {
            res.sendStatus(401);
        }
    },

    getUser: (req,res) => {
        const {user} = req.session; //req.session.user (which was pulled off the client FE)
        if(user){ //if user lives on req.session then return user to axios call 
            res.status(200).send(user);
        } else { //send error
            res.sendStatus(401);
        }
    }, 

    logout: (req,res) => {
        req.session.destroy(); //destroy session 
        res.sendStatus(200); //send to axios call
    }

}