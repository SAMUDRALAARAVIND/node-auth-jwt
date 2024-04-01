### Create a New Post

**Endpoint:** `POST /posts/create`

**Description:** Creates a new post.

**Authorization:** Bearer token must be included in the request headers.

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

**Authorization**: Bearer token must be included in the request headers.

**Query Parameters:**

`userId (optional)`: ID of the user whose posts to retrieve. If not provided, retrieves posts of the authenticated user.
Response: Returns an array of posts with the specified fields.


### Like a Post
**Endpoint**: POST /posts/like?postId={postId}

**Description**: Likes a post.

**Authorization**: Bearer token must be included in the request headers.

**Query Parameters:**

`postId`: ID of the post to like.
Response: Returns a success message if the post is successfully liked.


### Add a Comment to a Post
**Endpoint**: POST /posts/comment?postId={postId}

**Description**: Adds a comment to a post.

**Authorization**: Bearer token must be included in the request headers.

**Query Parameters**:

`postId`: ID of the post to comment on.
**Request Body:**

```json 
{
  "message": "Comment message"
}
```


### Get Comments of a Post
**Endpoint**: GET /posts/comments?postId={postId}

**Description**: Retrieves comments of a post.

**Authorization**: Bearer token must be included in the request headers.

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
