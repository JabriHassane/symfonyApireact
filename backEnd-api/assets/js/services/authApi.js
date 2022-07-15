import axios from "axios";
import jwtDecode from "jwt-decode";

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

async function authenticate(credentials) {
    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //stoket token in a local tem storage
            window.localStorage.setItem("authToken", token);
            //previent Axios qu'on a maintenant un header sur tt nos req HTTP
            setAxiosToken(token);

            return true;
        });
    /* //tester
    const data = await customersAPI.findAll();
    console.log(data);*/
}

function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setUp(){
    // 1. Voir si on a un token?
    const token = window.localStorage.getItem("authToken");
    // 2. Si le token est encore valide
    if(token){
        const {exp: expiration} = jwtDecode(token);
        //const jwtData = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
            console.log("Bien connect avec axios !");
        }
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp: expiration} = jwtDecode(token);

        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
            console.log("Vous êtes encore connecter");
            return true;
        }
        return false;
    }
    return false;
}
export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
};