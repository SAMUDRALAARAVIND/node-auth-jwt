* All the APIs are private only an authorized user can access these apis.

Pass token in the request headers for authorization.

```json
{
    "headers": {
        "Authorization": "Bearer: ${token}"
    }
}
```

### Create a New Post

**Endpoint:** `POST /posts/create`

**Description:** Creates a new post.

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post Content",
  "imageUrls": ["url1", "url2"]
}
```

**Response**: Returns the newly created post.


### Get All Posts of a User
**Endpoint:** `GET /posts/all`

**Description**: Retrieves all posts of a user.

**Query Parameters:**

`userId (optional)`: ID of the user whose posts to retrieve. If not provided, retrieves posts of the authenticated user.
Response: Returns an array of posts with the specified fields.

*** Response ***

*** Status Code *** `200`

```json
[
    {
        "_id": "660ac8743b9b2f0a83da674d",
        "title": "Data Structures and Algorithms",
        "content": "I like graph data structure",
        "imageUrls": [
            "https://media.geeksforgeeks.org/wp-content/uploads/20200630111809/graph18.jpg"
        ],
        "likesCount": 0,
        "commentsCount": 0
    }
]
```


### Like a Post
**Endpoint**: `POST /posts/like?postId={postId}`

**Description**: Likes a post.

**Query Parameters:**

`postId`: ID of the post to like.
Response: Returns a success message if the post is successfully liked.


### Add a Comment to a Post
**Endpoint**: `POST /posts/comment?postId={postId}`

**Description**: Adds a comment to a post.

**Query Parameters**:

`postId`: ID of the post to comment on.
**Request Body:**

```json 
{
  "message": "Comment message"
}
```


### Get Comments of a Post
**Endpoint**: `GET /posts/comments?postId={postId}`

**Description**: Retrieves comments of a post.

**Query Parameters**:

`postId`: ID of the post whose comments to retrieve.
**Response**: Returns an array of comments with the specified fields, including the username of the commenter

```json
{
    "comments": [
        {
            "message": "Comment for testing 1",
            "user": {
                "name": "Bhuvaneswaran"
            },
            "timeStamp": "2024-03-31T13:08:42.288Z"
        }
    ]
}
```
