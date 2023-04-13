import { Button, DatePicker, Form, Input, Modal, Radio, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateAssignment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { Search } = Input;
    const { TextArea } = Input;

    const [form] = Form.useForm();

    const showModal = () => {
        setIsVisible(true);
    }

    const handleCancel = () => {
        setIsVisible(false);
    }

    const [isBigModalVisible, setIsBigModalVisible] = useState(false);
    const showBigModal = () => {
        setIsBigModalVisible(true);
    }
    const handleBigModalCancel = () => {
        setIsBigModalVisible(false);
    }

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const showback = () => {
        window.location.reload();
    };
    const token = localStorage.getItem("token");
    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 18,
            offset: 1
        },
    };

    //Modal User
    const [dataSource, setDataSource] = useState([]);
    const [totalUser, setTotalUser] = useState();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setLoading(true);

        axios.get(`https://localhost:7150/all-users`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource(response.data);
                setTotalUser(response.headers["user-count"]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token]);

    const columns = [
        {
            key: "1",
            title: "",
            dataIndex: "id",
            render: (id) => (
                <Radio onChange={() => onChangeStaff(id)} value={id}></Radio>
            )
        },
        {
            key: "2",
            title: "User Code",
            dataIndex: "userCode",
            sorter: (a, b) => {
                if (a.userCode > b.userCode) {
                    return -1;
                }
                if (b.userCode > a.userCode) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "3",
            title: "Full Name",
            dataIndex: "fullName",
            sorter: (a, b) => {
                if (a.fullName > b.fullName) {
                    return -1;
                }
                if (b.fullName > a.fullName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "4",
            title: "Role",
            dataIndex: "role",
            sorter: (a, b) => {
                if (a.role > b.role) {
                    return -1;
                }
                if (b.role > a.role) {
                    return 1;
                }
                return 0;
            }
        },
    ];

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const dataFiltered = (dataSource.filter((user) => (
        user.fullName.toLowerCase().includes(searchText.toLowerCase())
        || user.username.toLowerCase().includes(searchText.toLowerCase())
        || user.userCode.toLowerCase().includes(searchText.toLowerCase())
    )
    ))

    const onSearch = value => console.log(value);

    const [changeStaff, setChangeStaff] = useState()
    const onChangeStaff = (id) => {
        setChangeStaff(id)
    }

    const [userDataInput, setUserDataInput] = useState({})

    const pickdata = () => {
        var array = {
            User: dataSource.find(x => x.id === parseInt(changeStaff)).userCode + ' - ' + dataSource.find(x => x.id === parseInt(changeStaff)).fullName,
            ID: dataSource.find(x => x.id === parseInt(changeStaff)).id,
            Name: dataSource.find(x => x.id === parseInt(changeStaff)).username,
        }
        setUserDataInput(array)
        setIsVisible(false)
    }

    const id = localStorage.getItem("id");
    const [assignedByUser, setAssignedByUser] = useState("");
    useEffect(() => {
        axios.get(`https://localhost:7150/api/User/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setAssignedByUser(response.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token, id]);

    const _id = localStorage.getItem("selected-assigned-to-user-id");
    const [assignedToUser, setAssignedToUser] = useState("");
    useEffect(() => {
        axios.get(`https://localhost:7150/api/User/${_id}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setAssignedToUser(response.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token, _id]);

    //Modal Asset
    const [isVisible2, setIsVisible2] = useState(false)
    const [dataSource2, setDataSource2] = useState([]);
    const [totalAsset, setTotalAsset] = useState();
    const [searchText2, setSearchText2] = useState("");
    const handleCancel2 = () => {
        setIsVisible2(false)
    };
    const showModal2 = () => {
        setIsVisible2(true)
    }
    useEffect(() => {
        setLoading(true);

        axios.get(`https://localhost:7150/get-assets`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource2(response.data);
                setTotalAsset(response.headers["Asset-Pagination"]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token]);

    const columns2 = [
        {
            key: "1",
            title: "",
            dataIndex: "id",
            render: (id) => (
                <Radio onChange={() => onChangeStaff2(id)} value={id}></Radio>
            )
        },
        {
            key: "2",
            title: "Asset Code",
            dataIndex: "assetCode",
            sorter: (a, b) => {
                if (a.assetCode > b.assetCode) {
                    return -1;
                }
                if (b.assetCode > a.assetCode) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "3",
            title: "Asset Name",
            dataIndex: "assetName",
            sorter: (a, b) => {
                if (a.assetName > b.assetName) {
                    return -1;
                }
                if (b.assetName > a.assetName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "4",
            title: "Category",
            dataIndex: "categoryName",
            sorter: (a, b) => {
                if (a.categoryName > b.categoryName) {
                    return -1;
                }
                if (b.categoryName > a.categoryName) {
                    return 1;
                }
                return 0;
            }
        },
    ];

    const itemRender2 = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const dataFiltered2 = (dataSource2.filter((asset) => (
        asset.assetName.toLowerCase().includes(searchText2.toLowerCase())
        || asset.assetCode.toLowerCase().includes(searchText2.toLowerCase())
        || asset.categoryName.toLowerCase().includes(searchText2.toLowerCase())
    )
    ))

    const onSearch2 = value2 => console.log(value2);
    const [changeStaff2, setChangeStaff2] = useState()
    const onChangeStaff2 = (id) => {
        setChangeStaff2(id)
    }

    const [assetDataInput, setAssetDataInput] = useState({})
    const pickdata2 = () => {
        var array = {
            Asset: dataSource2.find(x => x.id === parseInt(changeStaff2)).assetCode + ' - ' + dataSource2.find(x => x.id === parseInt(changeStaff2)).assetName,
            ID: dataSource2.find(x => x.id === parseInt(changeStaff2)).id,
        }
        setAssetDataInput(array);
        setIsVisible2(false);
    }

    const [selectedAsset, setSelectedAsset] = useState("");
    useEffect(() => {
        axios.get(`https://localhost:7150/get-asset/${assetDataInput.ID}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setSelectedAsset(response.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token, assetDataInput.ID]);

    const [selectedCategory, setSelectedCategory] = useState("");
    useEffect(() => {
        axios.get(`https://localhost:7150/get-category/${selectedAsset.categoryId}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setSelectedCategory(response.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token, selectedAsset.categoryId]);

    const [note, setNote] = useState("");
    const [assignedDate, setAssignedDate] = useState("");
    const selectedAssignedDate = (date, dateString) => {
        setAssignedDate(new Date(date).toLocaleDateString("en-CA"));
    }

    const onFinish = () => {
        console.log(assignedByUser)
        console.log(assignedToUser)
        console.log(selectedAsset)
        console.log(selectedCategory)
        console.log(assignedDate)
        console.log(note)
        var today = new Date().toLocaleDateString("en-CA");
        var ngaynhap = new Date(assignedDate).toLocaleDateString("en-CA");
        var Nspace = note
        if (ngaynhap >= today) {
            if (Nspace.trim().length !== 0) {
                axios({
                    method: 'post',
                    url: `https://localhost:7150/create-assignment`,
                    data: {
                        "id": 22,
                        "assetName": selectedAsset.assetName,
                        "assetId": selectedAsset.id,
                        "assignedByUserId": assignedByUser.id,
                        "assignedByUserName": assignedByUser.username,
                        "assignedToUserId": assignedToUser.id,
                        "assignedToUserName": assignedToUser.username,
                        "assignedDate": assignedDate,
                        "note": note,
                        "status": "waiting",
                        "assetCode": selectedAsset.assetCode,
                        "asset": {
                            "id": selectedAsset.id,
                            "assetName": selectedAsset.assetName,
                            "assetCode": selectedAsset.assetCode,
                            "specification": selectedAsset.specification,
                            "installedDate": selectedAsset.installedDate,
                            "categoryName": selectedAsset.categoryName,
                            "categoryId": selectedAsset.categoryId,
                            "assignments": [
                                null
                            ],
                            "category": {
                                "id": selectedCategory.id,
                                "name": selectedCategory.name,
                                "prefix": selectedCategory.prefix
                            }
                        },
                        "assignedByUser": {
                            "id": assignedByUser.id,
                            "firstName": assignedByUser.firstName,
                            "lastName": assignedByUser.lastName,
                            "dob": assignedByUser.dob,
                            "gender": assignedByUser.gender,
                            "role": assignedByUser.role,
                            "joinedDate": assignedByUser.joinedDate,
                            "userCode": assignedByUser.userCode,
                            "username": assignedByUser.userName,
                            "password": assignedByUser.password,
                            "isFirstLogin": assignedByUser.isFirstLogin,
                            "fullName": assignedByUser.fullName,
                            "assignmentAssignedByUsers": [
                                null
                            ],
                            "assignmentAssignedToUsers": []
                        },
                        "assignedToUser": {
                            "id": assignedToUser.id,
                            "firstName": assignedToUser.firstName,
                            "lastName": assignedToUser.lastName,
                            "dob": assignedToUser.dob,
                            "gender": assignedToUser.gender,
                            "role": assignedToUser.role,
                            "joinedDate": assignedToUser.joinedDate,
                            "userCode": assignedToUser.userCode,
                            "username": assignedToUser.userName,
                            "password": assignedToUser.password,
                            "isFirstLogin": assignedToUser.isFirstLogin,
                            "fullName": assignedToUser.fullName,
                            "assignmentAssignedByUsers": [],
                            "assignmentAssignedToUsers": [
                                null
                            ]
                        }
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
                    content: 'Note cannot input only white spaces'
                })
            }
        } else {
            Modal.error({
                title: 'CREATE FAILED',
                content: 'Assigned Date can not be a date in the past'
            })
        }
    };

    return (
        <>
            <Button
                type="primary"
                danger
                onClick={showBigModal}
            >
                Create new Assignment
            </Button>
            <Modal
                open={isBigModalVisible}
                title="Create New Assignment"
                onCancel={handleBigModalCancel}
                footer={[
                    <Button key="back" onClick={handleBigModalCancel}>
                        Return
                    </Button>,
                    <Button form="create-assignment--form" htmlType="submit" type="primary" danger disabled={
                        !form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                    }>
                        Save
                    </Button>
                ]}
            >
                <div>
                    <Form id="create-assignment--form" name="complex-form" form={form} onFinish={onFinish} {...formItemLayout} labelAlign="left" >
                        <Form.Item label="User" style={{ marginBottom: 0 }} >
                            <Form.Item
                                // name="User"
                                rules={[{ required: true }]}
                                style={{ display: "block" }}
                            >
                                <Search name="User" value={userDataInput.User} readOnly enterButton onSearch={showModal} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Asset" style={{ marginBottom: 0 }} >
                            <Form.Item
                                // name="Asset"
                                rules={[{ required: true }]}
                                style={{ display: "block" }}
                            >
                                <Search name="Asset" value={assetDataInput.Asset} readOnly enterButton onSearch={showModal2} />
                            </Form.Item>
                        </Form.Item>

                        <Form.Item label="Assigned Date" style={{ marginBottom: 20 }}
                            name="AssignedDate"
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                style={{ display: "block" }}
                                format="DD/MM/YYYY"
                                placeholder=""
                                className="inputForm"
                                onChange={selectedAssignedDate}
                            />
                        </Form.Item>

                        <Form.Item label="Note" style={{ marginBottom: 20 }}>
                            <Form.Item
                                name="Note"
                                style={{ display: "block" }}
                                onChange={(e) => setNote(e.target.value.trim().replace(/\s+/g, " "))}
                            >
                                <TextArea autoSize={{ minRows: 5, maxRows: 7 }} />
                            </Form.Item>
                        </Form.Item>

                    </Form>
                </div>

                <Modal
                    open={isVisible}
                    title="Select User"
                    onCancel={handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={pickdata} >
                            Save
                        </Button>,
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>
                    ]}
                >
                    <Search
                        allowClear
                        onSearch={onSearch}
                        value={searchText}
                        onChange={evt => setSearchText(evt.target.value)}
                        style={{ width: 200 }}
                    />
                    <Radio.Group>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={dataFiltered}
                            pagination={{
                                total: totalUser,
                                current: page,
                                pageSize: pageSize,
                                pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                                itemRender: itemRender,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize)
                                }
                            }}
                            rowKey={"id"}
                            onRow={(user) => ({
                                onClick: () => (localStorage.setItem("selected-assigned-to-user-id", user.id)),
                            })}
                        >
                        </Table>
                    </Radio.Group>
                </Modal>

                <Modal
                    open={isVisible2}
                    title="Select Asset"
                    onCancel={handleCancel2}
                    footer={[
                        <Button key="submit" type="primary" onClick={pickdata2} >
                            Save
                        </Button>,
                        <Button key="back" onClick={handleCancel2}>
                            Cancel
                        </Button>
                    ]}
                >
                    <Search
                        allowClear
                        onSearch={onSearch2}
                        value={searchText2}
                        onChange={evt => setSearchText2(evt.target.value)}
                        style={{ width: 200 }}
                    />
                    <Radio.Group>
                        <Table
                            loading={loading}
                            columns={columns2}
                            dataSource={dataFiltered2}
                            pagination={{
                                total: totalAsset,
                                current: page,
                                pageSize: pageSize,
                                pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                                itemRender2: itemRender2,
                                onChange: (page, pageSize) => {
                                    setPage(page);
                                    setPageSize(pageSize)
                                }
                            }}
                            rowKey={"id"}
                            onRow={(asset) => ({
                                onClick: () => (localStorage.setItem("selected-assigned-asset-id", asset.id)),
                            })}
                        >
                        </Table>
                    </Radio.Group>
                </Modal>
            </Modal>
        </>
    )
};

export default CreateAssignment;