const bcrypt = require("bcryptjs");

const password = "admin"; // Replace with the password you want
bcrypt.hash(password, 10).then((hash) => {
    console.log("Hashed password:", hash);
});


// Hashed Password for 'admin': $2a$10$6u5QsaeuM8PQiMvQrbnGruvmejm9L5bYcF10pXL.ftiVefiPYgIJa 

//INSERT new admin in newly created db statement... 
// INSERT INTO public."Admins"
// (id, username, "password")
// VALUES(nextval('"Admins_id_seq"'::regclass), 'admin', '$2a$10$6u5QsaeuM8PQiMvQrbnGruvmejm9L5bYcF10pXL.ftiVefiPYgIJa');