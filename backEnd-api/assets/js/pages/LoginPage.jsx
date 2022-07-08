import React, {useState} from "react";
import authApi from "../services/authApi";

const LoginPage = (props) => {

    // states
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

        //constant for error
    const [error, setError] = useState("");

    //handling change in username & password input
    const handleChange = (event)=>{
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    };

    //handling inputs recuperation info Token
    const handleSubmi = async (event)=>{
        event.preventDefault();
        try {
            await authApi.authenticate(credentials);
            setError("");
        }catch (error) {
            console.log(error.response);
            setError("No account has this address or information does not match");
        }

        console.log(credentials);
    };

    return (
        <>
            <h1>Connexion To the App :</h1>

            <form action="" onSubmit={handleSubmi}>
                <div className="form-group row">
                    <div className="form-group mt-4">
                        <label htmlFor="_username">email :</label>
                        <input
                            type="email"
                            value={credentials.username}
                            onChange={handleChange}
                            name="username"
                            id="username"
                            placeholder="enter your email"
                            className={"form-control mt-4"+(error && " is-invalid")}
                        />
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="_password">password :</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            name="password"
                            id="password"
                            placeholder="enter you passWord"
                            className="form-control mt-4"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success mt-4">connexion</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default LoginPage;