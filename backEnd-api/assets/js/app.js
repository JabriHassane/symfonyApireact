// assets/app.js
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
//important import
import React from "react";
import ReactDom from "react-dom";
import {createRoot} from "react-dom/client";
import Navbar from "./components/Navbar";
import {HashRouter, Switch, Router, Route} from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import '../styles/app.css';
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";

// start the Stimulus application
// import '../bootstrap';



console.log("Tester si la console repend : TRTRTR");

const App = () => {
    return <>
            <HashRouter>
                    <Navbar />
                    <main className="container pt-4">
                        <Switch>
                            <Route exact path="/invoices" component={InvoicesPage}/>
                            <Route exact path="/customers" component={CustomersPage}/>
                            <Route exact path="/" component={HomePage}/>
                        </Switch>
                    </main>
            </HashRouter>
        </>;
};

const rootElement = document.querySelector('#app');

const root = createRoot(rootElement);
root.render(<App/>);