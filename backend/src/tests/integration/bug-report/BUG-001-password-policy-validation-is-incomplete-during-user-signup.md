# BUG-005 - Password policy validation is incomplete during user signup

## Severity: 

Medium

## Endpoint:

 POST /user/signup

## Description

The signup endpoint accepts passwords that do not meet the password policy defined by the application.

According to the validation rules, a password must contain:

At least 8 characters
At least one uppercase letter
At least one number

However, only the minimum length is being validated. Passwords without an uppercase letter or without a number are accepted and the user is successfully registered.

## Steps to Reproduce

Scenario 1 - Password without an uppercase letter
Send a POST request to /user/signup.
Use the following request body:
{
  "username": "Julia",
  "password": "senha123"
}

Scenario 2 - Password without a number
Send a POST request to /user/signup.
Use the following request body:
{
  "username": "Julia",
  "password": "Senhaaaa"
}

## Expected Result

The API should reject both requests and return:

Status Code: 400 Bad Request
Message:
Invalid password! Must be at least 8 characters. A number and a capital letter

## Actual Result

Both requests are accepted.

 The API returns:

Status Code: 200 OK
User is successfully registered.

## Impact

Users can create passwords that do not comply with the application's password policy, reducing account security.

## Possible Cause

The regular expression responsible for validating the password requirements is declared in the signup() method but is never executed to validate the password before creating the user.