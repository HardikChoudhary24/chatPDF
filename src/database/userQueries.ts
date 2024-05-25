export const createNewUserQuery =
  "Insert into users (name,email,password) values($1,$2,$3) RETURNING *;";
