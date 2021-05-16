import './App.css';
import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthService from "./services/auth";
import Profile from "./components/profile";
import Warehouses from "./components/warehouses";
import Products from "./components/products";
import ProductForm from "./components/product-form";

function App() {

    const [currentUser, setCurrentUser] = useState()


    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        if(user){
            setCurrentUser(user);
        }
    },[])

    const logOut = function () {
        AuthService.logout();
    }



    return (
    <Router>
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {(!currentUser) ? (
                    <>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/register">Sign up</Link>
                    </li>
                    </>
                    ) : (
                        <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        {currentUser.roles.includes("ADMIN") && <li><Link to="/warehouses">Warehouses</Link></li>}
                        {currentUser.roles.includes("ADMIN") && <li><Link to="/products">Products</Link></li>}
                        <li>
                            <a href="/" onClick={logOut}>Logout</a>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/warehouses" component={Warehouses} />
                <Route path="/products/:warehouseId" component={Products} />
                <Route path="/products" component={Products} />
                <Route path="/product/:productId" component={ProductForm} />
                <Route path="/product-form/:warehouseId" component={ProductForm} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
