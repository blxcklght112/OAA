import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {Form, Input, Button} from "antd";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        try{
            await authService.login(username, password).then(
                (response) => {
                    console.log(response);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("role", response.role);
                    localStorage.setItem("isFirstLogin", response.isFirstLogin);
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("id", response.id);
                    // if (localStorage.getItem("role") === "Admin") { navigate("/home") }
                    // else if (localStorage.getItem("role") === "Staff") { navigate("/homestaff") }
                    navigate("/home");
                    window.location.reload();
                },
                (err) => {
                    if (err?.response.status === 400) { setErrMsg("Username or password is incorrect. Please try again?") }
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            {localStorage.getItem("token") ?
                (<div>You're Login</div>) :
                (
                <Form
                    name="basic"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 6,
                    }}
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <Input.Password  onCopy={(e) => {
                            e.preventDefault()
                            return false;
                        }} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit" disabled={
                            (password === "" || username === "" || password.match(/^ *$/) !== null 
                            || username.match(/^ *$/) !== null) ? true : false}>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 6,
                        }}
                    ><label className="err-msg">{errMsg}</label></Form.Item>
                </Form>
                )
            }
        </div>
    )
}

export default LoginPage;