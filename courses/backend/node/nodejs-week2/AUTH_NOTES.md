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
