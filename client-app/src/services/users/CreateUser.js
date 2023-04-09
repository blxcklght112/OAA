import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";

const CreateUser = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [dob, setDOB] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };


    const token = localStorage.getItem("token");

    const showBack = () => {
        window.location.reload();
    }

    const [form] = Form.useForm();
    const Option = Select;

    const onFinish = () => {

        var today = new Date();
        var birthDay = new Date(dob);
        var age = Math.abs(today - birthDay) / (1000 * 60 * 60 * 24) / 365;
        var joined = new Date(joinedDate);
        var joinedDay = joined.getDay();
        var chenhlech = joined - birthDay;
        var chenhlech1 = joined - today;
        var Fspace = firstName;
        var Lspace = lastName;
        if (Fspace.length < 50) {
            if (Lspace.length < 50) {
                if (Fspace.indexOf(' ') < 0) {
                    if (Lspace.trim().length !== 0) {
                        if (joinedDay !== 0 && joinedDay !== 6) {
                            if (birthDay < today) {
                                if (chenhlech1 < 0) {
                                    if (chenhlech > 0) {
                                        if (age >= 18) {
                                            axios({
                                                method: 'post',
                                                url: "https://localhost:7150/create-user",
                                                data: {
                                                    id: "0",
                                                    userCode: "string",
                                                    username: "string",
                                                    password: "string",
                                                    isFirstLogin: true,
                                                    fullName: "string",
                                                    firstName: firstName,
                                                    lastName: lastName.trim().replace(/\s+/g, " "),
                                                    dob: dob,
                                                    joinedDate: joinedDate,
                                                    gender: gender,
                                                    role: role,
                                                },
                                                headers: { Authorization: `Bearer ${token}` }
                                            })

                                                .then(response => {
                                                    console.log(response.data)
                                                    Modal.success({
                                                        title: 'SAVE SUCCESSFULLY',
                                                        content: 'You have done this very well',
                                                        onOk: () => { showBack() }
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

    const selectedJoinedDate = (date, dateString) => {
        setJoinedDate(new Date(date).toLocaleDateString("en-CA"));
    }

    const selectedDOB = (date, dateString) => {
        setDOB(new Date(date).toLocaleDateString("en-CA"));
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
                    <Form id="create-user--form" name="complex-form" form={form} onFinish={onFinish} labelAlign="left" {...formItemLayout}>
                        <Form.Item label="First Name" style={{ marginBottom: 20 }}
                            name="First Name"
                            rules={[{ required: true }]}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        >
                            <Input className="inputForm" />
                        </Form.Item>

                        <Form.Item label="Last Name" style={{ marginBottom: 20 }}
                            name="Last Name"
                            rules={[{ required: true }]}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        >
                            <Input className="inputForm" />
                        </Form.Item>

                        <Form.Item label="Date of Birth" style={{ marginBottom: 20 }}
                            name="Date of Birth"
                            rules={[{ required: true }]}
                            value={dob}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                                onChange={selectedDOB}
                            />
                        </Form.Item>

                        <Form.Item label="Joined Date" style={{ marginBottom: 20 }}
                            name="Joined Date"
                            rules={[{ required: true }]}
                            value={joinedDate}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format='DD/MM/YYYY'
                                placeholder=""
                                className="inputForm"
                                onChange={selectedJoinedDate}
                            />

                        </Form.Item>
                        <Form.Item label="Gender" style={{ marginBottom: 20 }}
                            name="Gender" rules={[{ required: true }]}>
                            <Radio.Group name="gender-radiogroup"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
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
                                onChange={(value) => setRole(value)}
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