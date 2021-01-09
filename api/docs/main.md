# Fymate API documentation

    
    
## Available endpoints

#### ```POST /auth/register```
#### ```POST /auth/login```
#### ```POST /auth/refresh```
#### ```POST /auth/refresh```
#### ```GET /users/```
#### ```GET /users/:username```
#### ```POST /users/:username```
#### ```GET /posts```
#### ```GET /posts/:username```
#### ```POST /posts/:username```
#### ```PATCH /posts/:username/:postid```
#### ```DELETE /posts/:username/:postid```
#### ```GET /tags```

---

### Auth

---

#### ```POST /auth/register```
Registers new user with username, email and password.  
Credentials **must** be provided via JSON body, with following structure:


```json
{
    "username":"",
    "password":"",
    "email":""
}
```


#### Responses


```HTTP
Status: 200 OK 
```

Body: 
```JSON
{
    "acc": "access token",
    "ref": "refresh token"
}
```

409 responses are issued when resource enforced uniquness would be compromised

```HTTP
Status: 409 Conflict
Body: Account with given username already exists
``` 

```HTTP
Status: 409 Conflict
Body: Account with given email already exists
``` 

400 responses are issued when critical fields are missing or are malformed in the
request JSON body

```HTTP
Status: 400 Bad Request
Body: errors : []
``` 

Server could not push new results to database 
```HTTP
Status: 500 Internal server error
```

---

#### ```POST /auth/login```
Issues access and refresh tokens to the requester if supplied credentials are correct. Credentials must be provided via JSON body, with following structure
```json
{
    "username":"",
    "password":"",
}
```

#### Responses
```HTTP
Status: 200 OK 
```
Body: 
```JSON
{
    "acc": "access token",
    "ref": "refresh token"
}
```


400 responses are issued when critical fields are missing or are malformed in the
request JSON body

```HTTP
Status: 400 Bad Request
Body: errors : []
``` 

```HTTP
Status: 401 Unauthorized
Body: "Username or password dont match"
```

---

#### ```POST /auth/refresh```
Issues access and refresh tokens to the requester if supplied refresh token is correct.  
Refresh token must be provided via *Authorization* header.

```HTTP
Authorization: Bearer refresh_token
```


#### Responses
```HTTP
Status: 200 OK 
```
Body: 
```JSON
{
    "acc": "access token",
    "ref": "refresh token"
}
```

400 responses are issued when critical headers are missing or malformed

```HTTP
Status: 400 Bad Request
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 400
```HTTP
Status: 400 Bad Request
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Token refresh is invalid"
```

Username attached to this token was not found
```HTTP
Status: 401 Unauthorized
Body: "User not found"
```

Critical error of the API server
```HTTP
Status: 500 Internal server error
Body: "Secret missing"
```

---

#### ```POST /auth/refresh```
Removes user account and all associated data from database
Access token must be provided via *Authorization* header.


#### Responses
```HTTP
Status: 200 OK
```

The request is missing Authorization header
```HTTP
Status: 401 Unauthorized
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 401
```HTTP
Status: 401 Unauthorized
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Access token is invalid"
```

Username attached to this token does not match username in parameter
```HTTP
Status: 401 Unauthorized
Body: "This user is not authorized for resource of :username"
```

Username attached to this token was not found
```HTTP
Status: 404 Not found
Body: "User not found"
```

---

### Users

---

#### ```GET /users/```
Returns publicly available user data.

#### Query Parameters

1. **start** - Integer - Optional - starting index of query - Default: 0
2. **limit** - Integer - Optional - how many objects should be retrived - Default: 10

Example:  http://api.fymate.co/users?start=5&limit=2 would return 2 entries, beginning from the 6th one


#### Responses

```HTTP
Status: 200 OK
```

Body:
```JSON
[
    {
        "userid": 3,
        "accountid": 3,
        "profiledescription": "Bark bark",
        "phone": "111 111 111",
        "email": "Dog@bone.org"
    }
]
```

Sent when server cannot perform database query
```HTTP
Status: 500 Internal Server Error
```

---

#### ```GET /users/:username```
Returns userdata belonging to :username

#### Responses

```HTTP
Status: 200 OK
```

Body:
```JSON
{
    "userid": 3,
    "accountid": 3,
    "profiledescription": "Bark bark",
    "phone": "111 111 111",
    "email": "Dog@bone.org"
}
```

Sent when server cannot perform database query
```HTTP
Status: 500 Internal Server Error
```

```HTTP
Status: 404 Not found
Body: Username not found
```

---

#### ```POST /users/:username```
Replaces user info with supplied information

Requirements:
- Refresh token must be provided via *Authorization* header.

- New information **must** be provided via JSON body, with following structure:

```JSON
{
    "profileDescription": "Bark bark",
    "visibleName": "Bark",
    "telephone": "111 111 111",
    "contactEmail": "Dog@bone.org"
}
```

#### Responses

```HTTP
Status: 200 OK
```

The request is missing Authorization header
```HTTP
Status: 401 Unauthorized
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 400
```HTTP
Status: 401 Unauthorized
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Access token is invalid"
```

Username attached to this token does not match username in parameter
```HTTP
Status: 401 Unauthorized
Body: "This user is not authorized for resource of :username"
```

Server failed to push into database 
```HTTP
Status: 500 Internal Server Error
```

---

### Posts

---

#### ```GET /posts```
Returns any posts or post with specified tags

#### Query Parameters

1. **start** - Integer - PLANNED - starting index of query - Default: 0
2. **limit** - Integer - PLANNED - how many objects should be retrived - Default: 10
3. **tags** - Array of IDs - Optional - find posts with given tag ids

Example:  http://{{API host}}/posts/?tags=2 - finds all posts with tag id 2

Output:
```JSON
[
    {
        "postid": 13,
        "userid": 3,
        "content": "Yes this is another post like that :D",
        "title": "Anotha one",
        "tagids": [
            2
        ]
    },
    {
        "postid": 14,
        "userid": 1,
        "content": "Yes this is another post like that :D",
        "title": "Anotha one",
        "tagids": [
            2
        ]
    },
    {
        "postid": 15,
        "userid": 2,
        "content": "Yes this is another post like that :D",
        "title": "Anotha one",
        "tagids": [
            1,
            2
        ]
    }
]
```


#### Responses

Should always return 200. If none were found it will send
empty json array []
```HTTP
Status: 200 OK
```


This only happens when exception wont be caught (so should not)
```HTTP
Status: 500 Internal Server Error
```

---

#### ```GET /posts/:username```


Returns any posts or post belonging to a given username

#### Query Parameters

1. **start** - Integer - PLANNED - starting index of query - Default: 0
2. **limit** - Integer - PLANNED - how many objects should be retrived - Default: 10


#### Responses

Should always return 200. If none were found it will send
empty json array []
```HTTP
Status: 200 OK
```

Body:
```JSON
[
   {
        "postid": 15,
        "userid": 2,
        "content": "Yes this is another post like that :D",
        "title": "Anotha one",
        "tagids": [
            1,
            2
        ]
    }
]
```


This only happens when exception wont be caught (so should not)
```HTTP
Status: 500 Internal Server Error
```

---

#### ```POST /posts/:username```


Requirements:

Refresh token must be provided via Authorization header.

New information must be provided via JSON body, with following structure:

```JSON
{
    "content": "Yes this is another post like that :D",
    "title": "Anotha one",
    "tagIDs": [1,2,3]
}
```




#### Responses:
```HTTP
Status: 200 OK
```
```JSON
body: {
    "content": "Yes this is another post like that :D",
    "title": "Anotha one",
    "tagIDs": [
        1,
        2
    ],
    "id": 18
}


```
400 responses are issued when critical fields are missing or are malformed in the
request JSON body

```HTTP
Status: 400 Bad Request
Body: errors : []
``` 


The request is missing Authorization header
```HTTP
Status: 401 Unauthorized
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 400
```HTTP
Status: 401 Unauthorized
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Access token is invalid"
```

Username attached to this token does not match username in parameter
```HTTP
Status: 401 Unauthorized
Body: "This user is not authorized for resource of :username"
```




---

#### ```PATCH /posts/:username/:postid```
Replaces post information with new given information

Requirements:
- Refresh token must be provided via *Authorization* header.

- New information **must** be provided via JSON body, with following structure:

```JSON
{
    "content": "New post? UWU?",
    "title": "Changed post XD",
    "tagIDs": [1]
}
```


#### Responses:
```HTTP
Status: 200 OK
```
```JSON
body: {
    "content": "Yes this is another post like that :D",
    "title": "Anotha one",
    "tagIDs": [
        1,
        2
    ],
    "id": 18
}
```

400 responses are issued when critical fields are missing or are malformed in the
request JSON body

```HTTP
Status: 400 Bad Request
Body: errors : []
``` 

The request is missing Authorization header
```HTTP
Status: 401 Unauthorized
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 400
```HTTP
Status: 401 Unauthorized
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Access token is invalid"
```

Username attached to this token does not match username in parameter
```HTTP
Status: 401 Unauthorized
Body: "This user is not authorized for resource of :username"
```

---

#### ```DELETE /posts/:username/:postid```
Deletes given user post

Requirements:
- Refresh token must be provided via *Authorization* header.


#### Responses

Resource was successfuly removed 
```HTTP
Status: 200 OK
```

The request is missing Authorization header
```HTTP
Status: 401 Unauthorized
Body: Auth header missing
```

Missing *Bearer* in Authorization header will result in 400
```HTTP
Status: 401 Unauthorized
Body: Missing bearer
```

Token is either expired or failed to be recoginized as valid
```HTTP
Status: 401 Unauthorized
Body: "Access token is invalid"
```

Username attached to this token does not match username in parameter
```HTTP
Status: 401 Unauthorized
Body: "This user is not authorized for resource of :username"
```

#### ```GET /tags```
Returns all available tags from the database



#### Responses
```HTTP
Status: 200 OK
```
Body:
```JSON
[
    {
        "tagid": 1,
        "name": "Programista"
    },
    {
        "tagid": 2,
        "name": "Grafik"
    }
]
```

```HTTP
Status: 500 Internal Server Error
```
