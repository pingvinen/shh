Shh API
=======

The API uses JSON as the transport format for both requests and responses.


Errors
------

If an error occurs the response will always have the following format (but the values will obviously vary). 

```
{
	"error": {
		  "code": "InvalidCredentials"
		, "message": "Invalid credentials"
	}
}
```
