import { EditTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditAsset = () => {

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };

    const [form] = Form.useForm();
    const format = new RegExp(".*?[^0-9].*")
    const formatX = new RegExp("^[a-zA-Z0-9 ]+$")


    const token = localStorage.getItem("token");
    const id = localStorage.getItem("edit-asset-id");

    const showBack = () => {
        window.location.reload();
    }

    const [categoryName, setCategoryName] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [assetName, setAssetName] = useState("");
    const [specification, setSpecification] = useState("");

    const [installedDate, setInstalledDate] = useState("");
    const selectedInstalledDate = (date, dateString) => {
        setInstalledDate(new Date(date).toLocaleDateString("en-CA"));
    }

    useEffect(() => {
        fetch(`https://localhost:7150/get-asset/${id}`, {
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
                setCategoryName(json.categoryName);
                setCategoryID(json.categoryId);
            })
    }, [id, token]);


    const onFinish = () => {

        var Aspace = assetName;
        var Sspace = specification;
        var today = new Date();
        var ngaynhap = new Date(installedDate);
        var count = 0;
        if (count === 0) {
            if (ngaynhap < today) {
                if (Aspace.length < 50) {
                    if (Aspace.trim().length !== 0) {
                        if (formatX.test(Aspace)) {
                            if (format.test(Aspace)) {
                                if (Sspace.length < 500) {
                                    if (Sspace.trim().length !== 0) {
                                        axios({
                                            method: 'put',
                                            url: `https://localhost:7150/update-asset/${id}`,
                                            data: {
                                                assetName: assetName.trim().replace(/\s+/g, " "),
                                                categoryId: categoryID,
                                                specification: specification.trim().replace(/\s+/g, " "),
                                                installedDate: installedDate,
                                                assetCode: "",
                                                categoryName: "",
                                                Id: 0,
                                                assignments: "",
                                                category: {
                                                    "id": 0,
                                                    "name": "string",
                                                    "prefix": "string"
                                                }

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
                                            content: 'Specification cannot input only white spaces'
                                        })
                                    }
                                } else {
                                    Modal.error({
                                        title: 'CREATE FAILED',
                                        content: 'Spectification length should be under 500 charaters'
                                    })
                                }
                            } else {
                                Modal.error({
                                    title: 'CREATE FAILED',
                                    content: 'Asset Name cannot input only number'
                                })
                            }
                        } else {
                            Modal.error({
                                title: 'CREATE FAILED',
                                content: 'Asset Name cannot input special characters'
                            })
                        }
                    } else {
                        Modal.error({
                            title: 'CREATE FAILED',
                            content: 'Asset Name cannot input only white spaces'
                        })
                    }
                } else {
                    Modal.error({
                        title: 'CREATE FAILED',
                        content: 'The Assets Name length should be under 50 characters'
                    })
                }
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Installed Date can not be a date in the future'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Asset Name must be unique'
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
                shape="circle"
                icon={<EditTwoTone />}
                onClick={showModal}
            >
            </Button>
            <Modal
                open={isVisible}
                title="Update New Asset"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button form="create-asset--form" htmlType="submit" type="primary" danger disabled={
                        !form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                    }>
                        Save
                    </Button>
                ]}
            >
                <div>
                    <Form id="create-asset--form" name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >
                        <Form.Item label="Name" style={{ marginBottom: 20 }}
                            name="AssetName"
                            rules={[{ required: true }]}
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                        >
                            <Input className="inputForm" />
                        </Form.Item>

                        <Form.Item label="Category" style={{ marginBottom: 20 }} >
                            <Form.Item

                                rules={[{ required: true }]}
                                style={{ display: "block" }}

                            >
                                <Input name="Category" value={categoryName} readOnly className="inputForm" disabled />
                            </Form.Item>

                        </Form.Item>

                        <Form.Item label="Specification" style={{ marginBottom: 20 }}
                            name="Specification"
                            rules={[{ required: true }]}
                            value={specification}
                            onChange={(e) => setSpecification(e.target.value)}
                        >
                            <TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                        </Form.Item>

                        <Form.Item label="Installed Date" style={{ marginBottom: 20 }}
                            name="InstalledDate"
                            rules={[{ required: true }]}
                            value={installedDate}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD-MM-YYYY"
                                placeholder=""
                                className="inputForm"
                                onChange={selectedInstalledDate}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
};

export default EditAsset;