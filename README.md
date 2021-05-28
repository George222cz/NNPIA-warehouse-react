# React frontend for Warehouse app

Warehouse app - Application for warehouse management.
Warehouse app has users who manage warehouses. There are products in those warehouses. 
These products can be added to transfers - forms for product transportation. (see Database model in backend README.md)

The purpose of this React frontend application is to provide user-friendly UI for warehouse app.   

### Security
Application has three not secured (public) endpoints:
- ("/" or "/home") index or home page
- ("/login") page for user login form
- ("/register") page for user registration form

All other communication with backend is already secured by JWT tokens.

Users also have roles. The user can have the role of administrator or warehouseman or basic user.
So for user and warehouseman roles some content is not available (Forbidden).
For example: 
- User - cannot see or creates new transfers.
- Warehouseman - cannot see transfers but can create new one. Also, cannot create a new warehouse.
- Admin - he's allowed to do everything.
### App structure
Application has 10 components. All communication with REST API backend is throw fetch methods.
Application has three auxiliary services:
- auth for logged user manipulation
- auth-header for getting header with authentication token
- user for better fetch REST API handling and providing of user info

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Final note
This application is part of Warehouse app semester work for NNPIA (2021).
For inspiration were used:
- Spring Boot Security and working example JWT authentication https://github.com/petrfilip/spring-boot-jwt
- Spring Boot JWT Authentication example with Spring Security & Spring Data JPA https://github.com/bezkoder/spring-boot-spring-security-jwt-authentication
- React JWT Authentication (without Redux) example https://github.com/bezkoder/react-jwt-auth
- And other repositories and public codes throw internet. All work was done by Bc. Jiří Dřímal.