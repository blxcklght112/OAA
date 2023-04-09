import { FilterFilled } from "@ant-design/icons";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react"

const StaffUserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUser, setTotalUser] = useState();
    const [searchText, setSearchText] = useState("");
    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);

    const Search = Input;

    const token = localStorage.getItem("token");

    const handleCancel = () => {
        setIsVisible(false);
    }

    const showModal = (id) => {
        fetch(`https://localhost:7150/api/User/${id}`,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                setDetail(json);

            })

        setIsVisible(true)
    }

    useEffect(() => {
        setLoading(true);

        axios.get("https://localhost:7150/all-users", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setDataSource(response.data);
            setTotalUser(response.headers["user-count"]);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token]);

    const handleFilter = (value) => {
        setSelectedValues(value);
    };

    const dataFiltered = (dataSource.filter((user) => (
        user.fullName.toLowerCase().includes(searchText.toLowerCase())
        || user.username.toLowerCase().includes(searchText.toLowerCase())
        || user.userCode.toLowerCase().includes(searchText.toLowerCase())
    ) &&
        (user.role).toLowerCase().includes(selectedValues)
    ));

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    }

    const columns = [
        {
            key: "1",
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
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "2",
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
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "3",
            title: "Username",
            dataIndex: "username"
        },
        {
            key: "4",
            title: "Joined Date",
            dataIndex: "joinedDate",
            render: (joinedDate) => {
                return <span>{new Date(joinedDate).toLocaleDateString("en-GB")}</span>
            },
            sorter: (a, b) => {
                if (a.joinedDate > b.joinedDate) {
                    return -1;
                }
                if (b.joinedDate > a.joinedDate) {
                    return 1;
                }
                return 0;
            },
            sortDirections: ["descend", "ascend"]
        },
        {
            key: "5",
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
            },
            sortDirections: ["descend", "ascend"]
        },
    ];

    return (
        !localStorage.getItem("token") ? window.location.reload()
            :
            <>
                <article>
                    <h1 className="title">
                        User List
                    </h1>
                    {dataSource?.length
                        ? (
                            <div>
                                <div className="extension">
                                    <div className="filter">
                                        <Select
                                            mode="multiple"
                                            placeholder="Role"
                                            suffixIcon={<FilterFilled />}
                                            showArrow
                                            value={selectedValues}
                                            onChange={handleFilter}
                                            style={{ width: "150px" }}
                                        >
                                            <Select.Option key={0} value={"admin"}>
                                                Admin
                                            </Select.Option>
                                            <Select.Option key={1} value={"staff"}>
                                                Staff
                                            </Select.Option>
                                        </Select>
                                        <Space direction="vertical">
                                            <Search
                                                allowClear
                                                value={searchText}
                                                onChange={evt => setSearchText(evt.target.value)}
                                                style={{ width: 400, marginLeft: 100 }}
                                            />
                                        </Space>
                                    </div>
                                </div>
                                <div className="table-responsive-sm">
                                    <Table
                                        loading={loading}
                                        columns={columns}
                                        dataSource={dataFiltered}
                                        pagination={{
                                            showSizeChanger: true,
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
                                        onRow={(user) => ({
                                            onClick: () => (showModal(user.id)),
                                        })}
                                        rowKey={"id"}
                                    >
                                    </Table>
                                </div>
                            </div>
                        ) : <p>No user to display</p>
                    }
                </article>
                <Modal
                    open={isVisible}
                    title="User Detail"
                    onCancel={handleCancel}
                    footer={[
                    ]}
                >
                    <p className="view_Detail">Full name : {detail.fullName}</p>
                    <p className="view_Detail">Date Of Birth : {new Date(detail.dob).toLocaleDateString("en-GB")} </p>
                    <p className="view_Detail">Joined Date : {new Date(detail.joinedDate).toLocaleDateString("en-GB")}</p>
                    <p className="view_Detail">Gender : {detail.gender}</p>
                    <p className="view_Detail">Type : {detail.role}</p>
                    <p className="view_Detail">Username : {detail.username}</p>
                    <p className="view_Detail">Staff Code : {detail.userCode}</p>
                </Modal>
            </>
    )
}

export default StaffUserPage;