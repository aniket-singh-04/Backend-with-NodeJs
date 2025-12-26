import bcrypt from 'bcrypt'

// bcrypt vs bcrypt.js
// bcrypt it uses the c++ behing the sean and it is very fast it work on the nodejs it not work on browser because is browser on understand the c++ 
// bcryptJs it is in pure js it is slighter slow and it work on browser 
// bcryptJs library use to hash at the ui level of password 



// await bcrypt.hash('our password or any thing', salt);
// Salt can be number or stirng but we are not able to give salt as a string 
// Because , A bcrypt “salt string” contains critical configuration data:

// $2b$10$eImiTXuWVxfM37uY4JANjQ
// │ │ │  └─────────────── random salt (22 chars)
// │ │ └── cost factor (work factor)
// │ └── algorithm version
// └── identifier


const salt = await bcrypt.genSalt(10) //$2b$10$FPWnvQ8Kb8J/CsYNMSlZHu  (here 10 represent the number of round salt is hashed)
console.log(salt)


const hashed = await bcrypt.hash('password', 12) // $2b$12$zJFCRqsWn4amyyD5hfzpw.cT/jAOb1Kk.vWGwvNNfjhQQ090CMuQm // len> 60 > 22(salt) rest password hash
console.log(hashed)

const compair = await bcrypt.compare("password", "$2b$12$zJFCRqsWn4amyyD5hfzpw.cT/jAOb1Kk.vWGwvNNfjhQQ090CMuQm")
console.log(compair)



// bcrypt uses Blowfish internally,
// Blowfish is a symmetric key block cipher, designed for speed and secure data encryption. It breaks data down into fixed block-size chunks and then scrambles it repeatedly using a secret key to guide the process.
// It’s highly versatile because it allows a choice of key sizes ranging from 32 to 448 bits. This means users can balance speed and security.
