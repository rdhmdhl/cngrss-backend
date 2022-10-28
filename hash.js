const bcrypt = require('bcrypt');

// to hash a password we need a salt
// salt is a random string added before or after a string
// 1234 --> abcd

// use the asyncronus method, to serve other clients
// the higher the number we provide in the method will increase the time it takes to generate the salt
// and the salt will be more complex
async function run() {
    console.log(salt);  
    console.log(hashed);  
}

run();
