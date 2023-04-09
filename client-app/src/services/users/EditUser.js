import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import axios from "axios";

const EditUser = () => {
    const [FirstName, setFisrtName] = useState('');
    const [LastName, setLastName] = useState('');
    const [form] = Form.useForm();
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("edit-user-id");
    const { Option } = Select;
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };
    
    const showback = () => {
        window.location.reload();
    };

    useEffect(() => {
        fetch(`https://localhost:7150/api/User/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                setFisrtName(json.firstName);
                setLastName(json.lastName);
            })
    }, [id, token]);

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            Gender: fieldsValue["Gender"],
            Role: fieldsValue["Role"],
            DOB: fieldsValue["DOB"].format("YYYY-MM-DD"),
            JoinedDate: fieldsValue["JoinedDate"].format("YYYY-MM-DD"),

        };
        var today = new Date()
        var ngaysinh = new Date(values.DOB)
        var tuoi = Math.abs(today - ngaysinh) / (1000 * 60 * 60 * 24) / 365
        var ngayjoin = new Date(values.JoinedDate)
        var ngayjoinDay = ngayjoin.getDay()
        var chenhlech = ngayjoin - ngaysinh
        var chenhlech1 = ngayjoin - today

        if (ngayjoinDay !== 0 && ngayjoinDay !== 6) {
            if (ngaysinh < today) {
                if (chenhlech1 < 0) {
                    if (chenhlech > 0) {
                        if (tuoi >= 18) {
                            axios({
                                method: 'put',
                                url: `https://localhost:7150/update-user/${id}`,
                                data: {
                                    id: "0",
                                    userCode: "string",
                                    username: "string",
                                    password: "string",
                                    isFirstLogin: true,
                                    fullName: "string",
                                    FirstName: FirstName,
                                    LastName: LastName,
                                    DOB: values.DOB,
                                    JoinedDate: values.JoinedDate,
                                    Gender: values.Gender,
                                    Role: values.Role,
                                },
                                headers: { Authorization: `Bearer ${token}` }
                            })

                                .then(response => {
                                    console.log(response.data)
                                    Modal.success({
                                        title: 'SAVE SUCCESSFULLY',
                                        content: 'You have done this very well',
                                        onOk: () => { showback() }
                                    })
                                })
                                .catch(e => {
                                    Modal.error({
                                        title: 'CHANGE FAILED',
                                        content: e
                                    })
                                });
                        } else {
                            Modal.error({
                                title: 'CREATE FAILED',
                                content: 'User is under 18 age. Please select a different date'
                            })
                        }
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'You must join after you born'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'Joined Date can not be in a future'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Birthday can not be a date in the future'
                })
            }

        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'You cannot join on Saturday or Sunday'
            })
        };
    };

    const [isVisible, setIsVisible] = useState(false);

    const showModal = () => {
        setIsVisible(true);
    }

    const handleCancel = () => {
        setIsVisible(false);
    }

    return (
        <>
            <Button
                shape="circle"
                icon={<EditTwoTone />}
                onClick={showModal}
            >
            </Button>
            <Modal
                open={isVisible}
                title="Update User"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button form="update-user--form" htmlType="submit" type="primary" danger disabled={
                        !form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                    }>
                        Save
                    </Button>
                ]}
            >
                <div>
                    <Form id="update-user--form" name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >
                        <Form.Item label="FirstName" style={{ marginBottom: 20 }}
                            rules={[{ required: true }]}
                        >
                            <Input name="FirstName" value={FirstName} readOnly className="inputForm" disabled />
                        </Form.Item>

                        <Form.Item label="LastName" style={{ marginBottom: 20 }}
                            rules={[{ required: true }]}
                        >
                            <Input name="LastName" value={LastName} readOnly className="inputForm" disabled />
                        </Form.Item>

                        <Form.Item label="Date of Birth" style={{ marginBottom: 20 }}
                            name="DOB"
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item label="Joined Date" style={{ marginBottom: 20 }}
                            name="JoinedDate"
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                            />
                        </Form.Item>

                        <Form.Item label="Gender" style={{ marginBottom: 20 }}
                            name="Gender" rules={[{ required: true }]}>
                            <Radio.Group>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Male">Male</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="Role"
                            name="Role"
                            rules={[{ required: true }]}
                        >
                            <Select
                                showSearch
                                className="inputForm"
                                style={{ display: "block" }}
                            >
                                <Option value="Staff">Staff</Option>
                                <Option value="Admin">Admin</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default EditUser;