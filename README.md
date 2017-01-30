# jwt-server

Very simple example of using express and express-jwt to issue a HMAC signed JWT within a cookie, that is then used on a protected endpoint.

1. ```npm install```
2. ```npm start```
3. Navigate to ```localhost:7171/jwt``` to be issued a token in a cookie
4. Navigate to ```localhost:7171/protected``` to access the protected endpoint and the decrypted contents of the token
