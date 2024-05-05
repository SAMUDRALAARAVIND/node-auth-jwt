* A user in this app can follow/unfollow any other user.
* If a user `A` follows another user `B` , `A` will be following `B` and `B`'s follower will be `A` there's not `Accept Request` flow.


* All the APIs are private only an authorized user can access these apis.

Pass token in the request headers for authorization.

```json
{
    "headers": {
        "Authorization": "Bearer: ${token}"
    }
}
```

### Get User Info

***Endpoint*** `GET user/info?userId={userId}`

* Request Param {userId} is optional

*** Response ***

*** Status Code*** `200`

```json
{
    "followers": 2,
    "following": 11,
    "posts": 3,
    "name": "Anu",
    "email": "anu@gmail.com",
    "city": "Hyderabad",
    "gender": "FEMALE"
}
```


### Follow a user

***Endpoint*** `POST /user/follow`

**Description** To follow a user.

**Request Body**

```json
{
    "userId" : ""
}
```

**Response**

***Status Code*** 201

```json
{
  "message": "Successfully followed user",
}
```

***Status Code*** 404

* If passed an invalid userId in the payload

```json
{
  "message": "User not found",
}
```

### UnFollow a user

***Endpoint*** `POST /user/unfollow`

**Description** To unfollow a user.

**Request Body**

```json
{
    "userId" : ""
}
```

**Response**

***Status Code*** 201

```json
{
  "message": "Successfully unfollowing user",
}
```

***Status Code*** 404

* If passed an invalid userId in the payload

```json
{
  "message": "User not found",
}
```



### Get All followers

***Endpoint*** `GET /user/followers?userId={userId}`

* Request Param { userId } is optional.

*** Response ***

```json
[
  {
      "_id": "65dca365739226be3be7a084",
      "name": "Uday Bari",
      "email": "uday042003@gmail.com",
      "gender": "MALE",
      "city": "Jalgon",
      "following": true
  }
]
```

### Get Suggestions

***Endpoint*** `GET /user/suggestions/`

*** Response ***

*** Status Code *** `200`

```json
{
  "suggestions": [
        {
            "_id": "65dccebdafd4f320866bcbd0",
            "name": "Chota Don",
            "email": "RajuDon@gmail.com",
            "gender": "MALE",
            "city": "donpur",
            "following": false
        },
  ]
}
```

### Get All followings list

***Endpoint*** `GET user/following`

*** Response ***

*** Status Code *** `200`

```json
[
  {
      "_id": "65e2a44d5086f9d371a3e73b",
      "name": "lalli",
      "email": "lalli@gmail.com",
      "gender": "FEMALE",
      "city": "Hyderabad",
      "following": true
  },
]
```