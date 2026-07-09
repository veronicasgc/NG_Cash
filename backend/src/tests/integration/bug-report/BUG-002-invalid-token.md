# BUG-002 - Invalid JWT Token Returns HTTP 500

## Identification

- **ID:** BUG-002
- **Module:** Account
- **Endpoint:** GET /account
- **Method:** GET
- **Severity:** High
- **Priority:** High

---

## Description

When sending an invalid JWT token in the `Authorization` header to the `GET /account` endpoint, the API returns **HTTP 500 (Internal Server Error)** instead of an authentication error (**HTTP 401 Unauthorized** or **HTTP 400 Bad Request**). This indicates that invalid tokens are not being handled properly by the application.

---

## Preconditions

- API is running.
- The `/account` endpoint is available.
- An invalid JWT token is provided in the `Authorization` header.

---

## Steps to Reproduce

1. Send a **GET** request to:

```
/account?id=1783367341294
```

2. Set the following request header:

```
Authorization: token-fake
```

3. Send the request.

---

## Expected Result

The API should return an authentication error, for example:

- **HTTP 401 - Unauthorized**
or
- **HTTP 400 - Bad Request**

with a message indicating that the provided token is invalid.

Example:

```json
{
  "message": "Unauthorized user"
}
```

---

## Actual Result

The API returns:

- **HTTP 500 - Internal Server Error**

instead of an authentication error.

---

## Evidence

Automated integration test using **Jest + Supertest**:

```ts
const response = await request(app)
  .get("/account")
  .set("Authorization", "token-fake");

expect(response.status).toBe(400); // Received: 500
```

---

## Impact

Clients that send an invalid JWT token receive an **Internal Server Error**, making it difficult to identify the real cause of the failure. The endpoint should return an authentication-related status code instead of indicating an unexpected server error.

---

## Possible Cause

The exception thrown by `jwt.verify()` when validating an invalid JWT token is not being handled correctly. As a result, the application propagates the exception as an internal server error instead of converting it into an authentication error response.