// setup connection -------------------------
const pg = require('pg');
const dbURI = "postgres://bethxkykqevfzb:5fbf155053ee5f6b34e1309d0dad6537f0736081b5bd23f24ada576f70c4e8b3@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/dcsr7rc5lm4cg";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: {rejectUnauthorized: false}
});

// database methods -------------------------
let dbMethods = {}; //create empty object

// ------------------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";	
	return pool.query(sql); //return the promise	
}

// ------------------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {  
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, blogtext, userid];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteBlogPost = function(id, userid) {  
    let sql = "DELETE FROM blogposts WHERE id = $1 AND userid = $2 RETURNING *";
	let values = [id, userid];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username FROM users";
    return pool.query(sql); //return the promise
}

// ------------------------------------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.createUser = function(username, password, salt) {
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
    let values = [username, password, salt];
    //console.log(salt);
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteUser = function(id) {
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
    let values = [id];
    return pool.query(sql, values); //return the promise
}

// export dbMethods -------------------------
module.exports = dbMethods;

