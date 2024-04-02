## Authorization

### Login
**Endpoint**: `POST /auth/login`

**Description** Creates a login request.

**Request Body**
```json
{
  "email": "aravind@gmail.com",
  "password": "ajsjsk"
}
```

**Response**

**status** `200`
```json
{
  "token": "jwt_token"
}
```

**status** `400`
```json
{
  "token": "Invalid Credentials"
}
```

### Signup

***Endpoint*** `POST /auth/signup`

**Description** Creates a new account request

**Request Body**

```json
{
    "email" : "bhuvan243@gmail.com",
    "name": "Bhuvaneswaran",
    "gender": "MALE",
    "password": "bhuvan243",
    "city" :"Pondicherry"
}
```

**Response**

***Status Code*** 201

```json
{
  "message": "Signup success"
}
```

***Status Code*** 400

```json
{
  "message": "User already exists"
}
```