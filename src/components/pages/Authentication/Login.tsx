import React from "react";

const Login = () => {
    return (
        <form>
            <label htmlFor="login">Login</label>
            <input id="login" type="email" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" />

            <button type="reset">Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
