import React from "react";

export default function Home() {

    return(
        <div>
            <h1>Warehouse app</h1>
            <div className={"container"} style={{maxWidth: "57%", fontSize: "1.1em"}}>
                <div>
                    Warehouse app - Application for warehouse management.
                    Warehouse app has users who manage warehouses. There are products in those warehouses.
                    These products can be added to transfers - forms for product transportation.
                    <br/>
                    The purpose of this React frontend application is to provide user-friendly UI for warehouse app.
                </div>
                <h2>Database model</h2>
                <img src={"./db.png"} alt={"Database model"}/>
                <h2>Security</h2>
                <div>
                    Application has three not secured (public) endpoints:<br/>
                    - ("/" or "/home") index or home page<br/>
                    - ("/login") page for user login form<br/>
                    - ("/register") page for user registration form<br/>
                    <br/>
                    All other communication with backend is already secured by JWT tokens.
                    <br/><br/>
                    Users also have roles. The user can have the role of administrator or warehouseman or basic user.<br/>
                    So for user and warehouseman roles some content is not available (Forbidden).
                    For example:<br/>
                    - User - cannot see or creates new transfers.<br/>
                    - Warehouseman - cannot see transfers but can create new one. Also, cannot create a new warehouse.<br/>
                    - Admin - he's allowed to do everything.
                </div>
                <h2>App structure</h2>
                <div>
                    Application has 10 components. All communication with REST API backend is throw fetch methods.<br/>
                    Application has three auxiliary services:<br/>
                    - auth for logged user manipulation<br/>
                    - auth-header for getting header with authentication token<br/>
                    - user for better fetch REST API handling and providing of user info<br/>
                </div>
                <h2>Final note</h2>
                <div>
                    This application is part of Warehouse app semester work for NNPIA (2021).<br/>
                    For inspiration were used:<br/>
                    - <a href={"https://github.com/petrfilip/spring-boot-jwt"}>Spring Boot Security and working example JWT authentication</a><br/>
                    - <a href={"https://github.com/bezkoder/spring-boot-spring-security-jwt-authentication"}>Spring Boot JWT Authentication example with Spring Security & Spring Data JPA</a><br/>
                    - <a href={"https://github.com/bezkoder/react-jwt-auth"}>React JWT Authentication (without Redux) example</a><br/>
                    - And other repositories and public codes throw internet. All work was done by Bc. Jiří Dřímal.<br/>
                </div>
            </div>
            <br/>
        </div>
    )
}