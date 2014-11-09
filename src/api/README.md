Shh API
=======

The API uses JSON as the transport format for both requests and responses.


Authentication
--------------

`/authenticate`

Before doing any other requests against the API, one must first go through authentication, 
which (at the moment) is a simple username/password challenge. This will generate a token that must
be used to calculate a checksum for all subsequent requests in the session.

```
POST /authenticate
{
	  "username": "<username>"
	, "password": "***"
}
```

For successful authentication, the response would be similar to

```
{
	  "sessionId": "<id of this session>"
	, "token": "<auth token for this session>"
}
```

In case of invalid credentials...

```
{
	"error": {
		  "code": "InvalidCredentials"
		, "message": "Invalid credentials"
	}
}
```


Logging out
-----------

`/logout`

Logging out basically means "kill this token".

```
POST /logout
{
	"checksum": "<checksum>" 
}
```

### Checksum

```
checksum = sha256( "/logout" . token )
```