import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";

const CreateUser = () => {

    const [form] = Form.useForm();
    const Option = Select;
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };

    const onFinish = (fieldsValue) => {
        const values = {
            // ...fieldsValue,
            FirstName: fieldsValue["FirstName"],
            LastName: fieldsValue["LastName"],
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
        var Fspace = values.FirstName
        var Lspace = values.LastName
        const token = localStorage.getItem("token")
        if (Fspace.length < 50) {
            if (Lspace.length < 50) {
                if (Fspace.indexOf(' ') < 0) {
                    if (Lspace.trim().length !== 0) {
                        if (ngayjoinDay !== 0 && ngayjoinDay !== 6) {
                            if (ngaysinh < today) {
                                if (chenhlech1 < 0) {
                                    if (chenhlech > 0) {
                                        if (tuoi >= 18) {
                                            axios({
                                                method: 'post',
                                                url: `https://localhost:7150/create-user`,
                                                data: {
                                                    FirstName: values.FirstName,
                                                    LastName: values.LastName.trim().replace(/\s+/g, " "),
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
                                                        onOk: () => { setIsVisible(true) }
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
                        }
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'Lastname cannot contains white spaces'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'Firstname cannot contains white spaces'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'The Lastname length should be 50 characters'
                })
            }

        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'The Firstname length should be 50 characters'
            })
        }

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
                type="primary"
                danger
                onClick={showModal}
            >
                Create new User
            </Button>
            <Modal
                open={isVisible}
                title="Create New User"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button form="create-user--form" htmlType="submit" type="primary" danger disabled={
                        !form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                    }>
                        Save
                    </Button>
                ]}
            >
                <div>
                    <Form id="create-user--form" name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >
                        <Form.Item label="First Name" style={{ marginBottom: 20 }}
                            name="FirstName"
                            rules={[{ required: true }]}
                        >
                            <Input className="inputForm" />
                        </Form.Item>

                        <Form.Item label="Last Name" style={{ marginBottom: 20 }}
                            name="LastName"
                            rules={[{ required: true }]}
                        >
                            <Input className="inputForm" />
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
                                style={{ display: "block", color: "black" }}
                            >
                                <Option style={{ color: "black" }} value="Staff">Staff</Option>
                                <Option value="Admin">Admin</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
};

export default CreateUser;