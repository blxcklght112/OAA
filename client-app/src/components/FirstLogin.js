import { Button, Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstLogin = () => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("id");

    const [isModalVisible, setIsModalVisible] = useState(true);
    const [oldPassword, setOldPassword] = useState("");
    const [data, setData] = useState({
        username: (localStorage.getItem("username")),
        password: ""
    });

    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
    const navigate = useNavigate();

    useEffect(() => {
        axios(``,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setOldPassword(response.data.password)
        })
    }, [token, userID]);

    const submit = () => {
        if (oldPassword !== data.password) {
            if (data.password.length >= 8) {
                if (mediumRegex.test(data.password)) {
                    if (data.password.indexOf(' ') < 0) {
                        axios({
                            method: 'PUT',
                            url: `https://localhost:7150/first-login/${userID}`,
                            data: data,
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then(res => {
                                console.log(res)
                                Modal.success({
                                    title: 'CHANGE SUCCESSFULLY',
                                    content: 'Your password has been changed'
                                })
                                localStorage.setItem("isFirstLogin", false)
                                setIsModalVisible(false)
                                navigate("/home");
                                window.location.reload();
                            }).catch(err => console.error(err))
                    }
                    else {
                        Modal.error({
                            title: 'CHANGE FAILED',
                            content: 'Password cannot contain white space'
                        })
                    }
                }
                else {
                    Modal.error({
                        title: 'CHANGE FAILED',
                        content: 'Wrong Format Password'
                    })
                }
            }
            else {
                Modal.error({
                    title: 'CHANGE FAILED',
                    content: 'Password is at least 8 characters'
                })
            }
        }
        else {
            Modal.error({
                title: 'CHANGE FAILED',
                content: 'Your Password Invalid !!'
            })
        }
    };

    const handleData = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

    return (
        <div className="App">
            <Modal title="First Login" open={isModalVisible}
                onOk={submit}
                footer={[
                    <Button key="submit" type="primary" onClick={submit} disabled={
                        (data.password === "") ? true : false}>
                        Save
                    </Button>
                ]}
            >
                <label>This is the first time you logged in. </label>
                <label>You have to change password to continue</label>
                <Input.Password
                    id="title"
                    name="password"
                    value={data.password}
                    onChange={(e) => handleData(e)}
                />
            </Modal>
        </div>
    )
};

export default FirstLogin;