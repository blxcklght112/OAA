import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Input, Modal, Select, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateAsset = () => {

    const formItemLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };

    const [categories, setCategories] = useState([""]);
    const [form] = Form.useForm();
    const format = new RegExp(".*?[^0-9].*")
    const formatX = new RegExp("^[a-zA-Z0-9 ]+$")


    const token = localStorage.getItem("token");

    const showBack = () => {
        window.location.reload();
    }

    const Option = Select;

    useEffect(() => {
        axios.get(`https://localhost:7150/all-categories`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCategories(response.data)
            })

    }, [token]);

    const [boxClass, setBoxClass] = useState("d-none");
    const [boxDisappear, setBoxDisappear] = useState("");

    const showBox = () => {
        setBoxClass("");
        setBoxDisappear("d-none");
    }

    const closeBox = () => {
        setBoxClass("d-none");
        setBoxDisappear("");
    }

    const saveCategory = (e) => {
        var count = 0;
        var _count = 0;

        console.log(e);

        categories.forEach(i => {
            if (e.name === i.name)
                count++;
        });

        categories.forEach(i => {
            if (e.prefix === i.prefix)
                _count++;
        });

        if (count === 0) {
            if (_count === 0) {
                fetch('https://localhost:7150/add-category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: newCategoryName,
                        prefix: newCategoryPrefix
                    })
                }).then(() => {
                    Modal.success({
                        title: 'CREATE SUCCESSFULLY',
                        content: 'Your category has been create',
                        onOk() { window.location.reload() }
                    })

                })
            } else {
                Modal.error({
                    title: 'CREATE FAILED',
                    content: 'Category Prefix is already existed. Please enter a different category prefix'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Category Name is already existed. Please enter a different category name'
            })
        }
    };

    const handleNewCategoryName = (e) => {
        setNewCategoryName(e.target.value);
    }

    const handleNewCategoryPrefix = (e) => {
        setNewCategoryPrefix(e.target.value);
    }

    const handleChange = (e) => {
        setNewCategoryID(e);
    }

    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryPrefix, setNewCategoryPrefix] = useState("");
    const [newCategoryID, setNewCategoryID] = useState("");
    const [assetName, setAssetName] = useState("");
    const [specification, setSpecification] = useState("");

    const [installedDate, setInstalledDate] = useState("");
    const selectedInstalledDate = (date, dateString) => {
        setInstalledDate(new Date(date).toLocaleDateString("en-CA"));
    }

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
                                        // console.log(assetName);
                                        // console.log(newCategoryID);
                                        // console.log(specification);
                                        // console.log(installedDate);
                                        axios({
                                            method: 'post',
                                            url: `https://localhost:7150/create-asset`,
                                            data: {
                                                assetName: assetName.trim().replace(/\s+/g, " "),
                                                categoryId: newCategoryID,
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
                type="primary"
                danger
                onClick={showModal}
            >
                Create new Asset
            </Button>
            <Modal
                open={isVisible}
                title="Create New Asset"
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

                        <Form.Item label="Category" style={{ marginBottom: 20 }}
                            name="Category"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Category"
                                onChange={handleChange}
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space align="center" style={{ marginTop: "10px", marginLeft: "5px", display: "block" }} rules={[{ required: true }]} >
                                            <Typography.Link style={{ whiteSpace: 'nowrap' }} onClick={showBox} className={boxDisappear} >
                                                Create new Category
                                            </Typography.Link>
                                            <Form onFinish={saveCategory} >
                                                <Form.Item className={boxClass}
                                                    rules={[{ required: true }]}
                                                    name="CategoryName"
                                                >
                                                    <Input
                                                        placeholder="Enter Category Name"
                                                        value={newCategoryName}
                                                        onChange={handleNewCategoryName}
                                                    />
                                                </Form.Item>

                                                <Form.Item className={boxClass}
                                                    rules={[{ required: true }]}
                                                    name="CategoryPrefix"
                                                >
                                                    <Input placeholder="Enter Category Prefix" value={newCategoryPrefix} onChange={handleNewCategoryPrefix} />
                                                </Form.Item>

                                                <Button style={{ whiteSpace: 'nowrap' }} htmlType="submit" className={boxClass} type="primary" >
                                                    <PlusOutlined /> Add item
                                                </Button>

                                                <Button style={{ whiteSpace: 'nowrap' }} className={boxClass} onClick={closeBox} type="danger">
                                                    <CloseOutlined /> Close
                                                </Button>

                                            </Form>
                                        </Space>
                                    </>
                                )}
                            >
                                {categories.map(item => (
                                    <Option value={item.id} key={item.id} className="option--category__select">{item.name}</Option>
                                ))}
                            </Select>
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

export default CreateAsset;