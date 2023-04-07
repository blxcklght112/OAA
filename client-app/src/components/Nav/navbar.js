import React, { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Modal, Popover } from "antd";
import ChangePassword from "../ChangePassword";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const content = (
        <div className="user--dropDown">
            <ChangePassword />
            <Button
                onClick={showModal}
                icon={<PoweroffOutlined />}
                danger
            >
                Logout
            </Button>
        </div>
    );

    return (
        <nav className="nav">
            <p className="site-title">
                Group 9
            </p>
            {/* <ul>
                    <li>
                        <a href="/" className="user-info">
                            <p className="nav-username">
                                {localStorage.getItem("username")}
                            </p>
                            <p className="nav-role">
                                {localStorage.getItem("role")}
                            </p>
                        </a>
                    </li>
                </ul> */}
            <Popover placement="bottomRight" content={content} trigger="hover" className="user-info">
                <p className="nav-username">
                    {localStorage.getItem("username")}
                </p>
                <p className="nav-role">
                    {localStorage.getItem("role")}
                </p>
            </Popover>
            <Modal
                title="Warning!"
                open={isModalVisible}
                cancelButtonProps={{
                    className: "ant-btn-default ant-btn-dangerous"
                }}
                okButtonProps={{
                    className: "ant-btn-dangerous"
                }}
                onOk={handleLogout}
                onCancel={handleCancel}
            >
                <p>
                    Do you want to Logout?
                </p>
            </Modal>
        </nav>
    )
}