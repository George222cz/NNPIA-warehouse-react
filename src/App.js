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
import Transfers from "./components/transfers";
import TransferForm from "./components/transfer-form";
import NotFound from "./components/not-found";
import Registration from "./components/registration";
import ProductsList from "./components/products-list";

function App() {

    const [showMenu, setShowMenu] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

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
            <nav className="navbar">
                <button className="navbar-toggler" type="button" id={"navbar-toggler"} onClick={()=>setShowMenu(!showMenu)}>&#9776;</button>
                <div className="navbar-collapse" id={showMenu ? "hiddenMenu":""}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {!currentUser ? (
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
                            {currentUser.roles.some(r=>["ROLE_USER","ROLE_WAREHOUSEMAN","ROLE_ADMIN"].includes(r)) && <li><Link to="/warehouses">Warehouses</Link></li>}
                            {currentUser.roles.some(r=>["ROLE_USER","ROLE_WAREHOUSEMAN","ROLE_ADMIN"].includes(r)) && <li><Link to="/products">Products</Link></li>}
                            {currentUser.roles.some(r=>["ROLE_ADMIN"].includes(r)) && <li><Link to="/transfers">Transfers</Link></li>}
                            {currentUser.roles.some(r=>["ROLE_ADMIN"].includes(r)) && <li><Link to="/products-list">Products List</Link></li>}
                            <li style={{float: "right"}}>
                                <a href="/" onClick={logOut}>Logout</a>
                            </li>
                            <li style={{float: "right"}}>
                                <Link to="/profile">Profile</Link>
                            </li>
                                {currentUser.roles.some(r=>["ROLE_WAREHOUSEMAN","ROLE_ADMIN"].includes(r)) && <li style={{float: "right"}}><Link to="/transfer-form">New transfer</Link></li>}
                            </>
                        )}
                    </ul>
                </div>
            </nav>
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/warehouses" component={Warehouses} />
                <Route exact path="/transfers" component={Transfers} />
                <Route exact path="/transfer-form" component={TransferForm} />
                <Route exact path="/products-list" component={ProductsList} />
                <Route path="/products/:warehouseId" component={Products} />
                <Route path="/products" component={Products} />
                <Route path="/product/:productId" component={ProductForm} />
                <Route path="/product-form/:warehouseId" component={ProductForm} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
