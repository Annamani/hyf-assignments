# Authentication System Documentation

## 1. Login Flow

### JWT Login

POST /api/auth/login
Returns:
{
token: <jwt-token>
}

Use in-Authorization: Bearer <jwt_token>

### Database Token Login

POST /api/auth/login-token
Returns:
{
token: <db_token>
}

Use in-Authorization: Bearer <db_token>

## 2. Using Protected Routes

All protected routes require:
Authorization: Bearer <token>
implemented protected routes
/api/auth/profile-token
/api/snippets -create snippet
/api/snippets/:id -delete snippet

## 3. Token Validation Rules

### Missing token

- No Authorization header → 401 Authorization header missing

### Invalid token

- Token not in database → 401 Invalid token

### Expired token

- expires_at < now → 401 Token expired

## 4. Logout

POST /api/auth/logout-token
Removes token from DB:

- Token is deleted from `tokens` table
- Further requests become invalid and gives -Invalid token or already logged out

## 5. Role-Based Access

Some routes require roles:
Example:

- moderator → delete snippets
- user → create + read only
  by default all users are assigned as role-user

### REFLECTION

## Which auth mechanism would you choose for:

# A SPA web app with many users?

I would like to use JWT authentication because it uses tokens specified for every users and it can be scalable and work well with frontend frameworks.
When we use APIKeys those are not user specified.so,it is not much secure.

# A microservice-to-microservice communication scenario?

here i can use APIKeys easy to communicate from machine to machine,there is no user logging in to communicate .

# An internal admin tool used by a small team?

Session based authentication works well here because the server controls the session and if problem appears the user can be revoke the access to rectify it.

## Why would you not use the other mechanisms in those scenarios?

API keys are not the best choice for user authentication since they are not designed to securely distinguish individual users.
Session-based authentication can become difficult to manage and scale in large frontend applications whereas JWT authentication better suits well fro large and stateless systems.
JWT authentication can introduce unnecessary complexity when used in small internal tools where simpler solutions are sufficient.

## What is one security improvement you would like to make next if you had more time?

If more time then i would add the improvement to monitor and alert the unauthorized access attempts.
