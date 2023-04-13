import { CheckCircleTwoTone, CloseCircleTwoTone, FilterFilled } from "@ant-design/icons";
import { Button, DatePicker, Input, Modal, Select, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminHomePage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalAssignment, setTotalAssignment] = useState();

    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false)

    const token = localStorage.getItem("token");

    const handleCancel = () => {
        setIsVisible(false)
    };

    const showModal = (id) => {
        fetch(`https://localhost:7150/get-assignment/${id}`,
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
    };

    const ownAssignment = localStorage.getItem("username");

    useEffect(() => {
        setLoading(true);

        axios.get(`https://localhost:7150/own-assignments?username=${ownAssignment}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setDataSource(response.data);
                setTotalAssignment(response.headers["Assignment-Count"]);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [token, ownAssignment]);

    const showback = () => {
        window.location.reload();
    }

    const showAcceptedConfirm = (id) => {
        fetch(`https://localhost:7150/get-assignment/${id}`,
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
            });

        axios({
            method: 'put',
            url: `https://localhost:7150/update-assignment/${id}`,
            data: {
                "id": id,
                "assetName": detail.assetName,
                "assetId": detail.assetId,
                "assignedByUserId": detail.assignedByUserId,
                "assignedByUserName": detail.assignedByUserName,
                "assignedToUserId": detail.assignedToUserId,
                "assignedToUserName": detail.assignedToUserName,
                "assignedDate": detail.assignedDate,
                "note": detail.note,
                "status": "Accepted",
                "assetCode": detail.assetCode,
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
    };

    const [smallModalVisible, setSmallModalVisible] = useState(false);
    const showDeclinedConfirm = (id) => {
        fetch(`https://localhost:7150/get-assignment/${id}`,
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
            });

        if(detail.status === "Waiting"){
            axios({
                method: 'put',
                url: `https://localhost:7150/update-assignment/${id}`,
                data: {
                    "id": id,
                    "assetName": detail.assetName,
                    "assetId": detail.assetId,
                    "assignedByUserId": detail.assignedByUserId,
                    "assignedByUserName": detail.assignedByUserName,
                    "assignedToUserId": detail.assignedToUserId,
                    "assignedToUserName": detail.assignedToUserName,
                    "assignedDate": detail.assignedDate,
                    "note": detail.note,
                    "status": "Declined",
                    "assetCode": detail.assetCode,
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
                open: {smallModalVisible},
                title: 'ERROR',
                content: 'You have accepted/ declined this assignment !!!',
                onOk: () => { setSmallModalVisible(true) }
            })
        }
    };


    const columns = [
        {
            key: "1",
            title: "No.",
            dataIndex: "id",
            sorter: (a, b) => {
                if (a.id > b.id) {
                    return -1;
                }
                if (b.id > a.id) {
                    return 1;
                }
                return 0;
            }
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
            title: "Assigned To",
            dataIndex: "assignedToUserName",
            sorter: (a, b) => {
                if (a.assignedToUserName > b.assignedToUserName) {
                    return -1;
                }
                if (b.assignedToUserName > a.assignedToUserName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "5",
            title: "Assigned By",
            dataIndex: "assignedByUserName",
            sorter: (a, b) => {
                if (a.assignedByUserName > b.assignedByUserName) {
                    return -1;
                }
                if (b.assignedByUserName > a.assignedByUserName) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "6",
            title: "Assigned Date",
            dataIndex: "assignedDate",
            render: (assignedDate) => {
                return <span>{new Date(assignedDate).toLocaleDateString("en-GB")}</span>
            },
            sorter: (a, b) => {
                if (a.assignedDate > b.assignedDate) {
                    return -1;
                }
                if (b.assignedDate > a.assignedDate) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "7",
            title: "Status",
            dataIndex: "status",
            sorter: (a, b) => {
                if (a.status > b.status) {
                    return -1;
                }
                if (b.status > a.status) {
                    return 1;
                }
                return 0;
            }
        },
        {
            key: "8",
            title: "",
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <CheckCircleTwoTone onClick={() => showAcceptedConfirm(id)} />
                    <CloseCircleTwoTone twoToneColor={"#fc0303"} onClick={() => showDeclinedConfirm(id)} />
                </Space>
            )
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

    const [searchText, setSearchText] = useState("");

    const [searchDate, setSearchDate] = useState("");
    const selectedAssignedDate = (date, dateString) => {
        setSearchDate(new Date(date).toLocaleDateString("en-CA"));
    }

    const [selectedValues, setSelectedValues] = useState([]);
    const handleFilter = (value) => {
        setSelectedValues(value);
    }

    const dataFiltered =
        (dataSource.filter((assignment) => (
            ((searchDate != null) && (searchDate !== "") && (searchDate !== "1970-01-01")) ?
                ((new Date(assignment.assignedDate).toLocaleDateString("en-CA")) === searchDate) :
                assignment.assetName.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assetCode.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assignedByUserName.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assignedToUserName.toLowerCase().includes(searchText.toLowerCase())
        )
            &&
            (assignment.status).toLowerCase().startsWith(selectedValues)
            && (
                assignment.assetName.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assetCode.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assignedByUserName.toLowerCase().includes(searchText.toLowerCase())
                || assignment.assignedToUserName.toLowerCase().includes(searchText.toLowerCase())
            )
        ))

    const onSearch = value => console.log(value);

    return (
        <>
            <article>
                <h3 className="title">
                    Assignment List
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="extensions">
                                <div className="filter">
                                    <Select
                                        mode="multiple"
                                        placeholder="State"
                                        suffixIcon={<FilterFilled />}
                                        showArrow
                                        value={selectedValues}
                                        onChange={handleFilter}
                                        style={{ width: "200px" }}
                                    >
                                        <Select.Option key={0} value={"accepted"}>
                                            Accepted
                                        </Select.Option>
                                        <Select.Option key={1} value={"waiting"}>
                                            Waiting for Acceptance
                                        </Select.Option>
                                        <Select.Option key={2} value={"declined"}>
                                            Declined
                                        </Select.Option>
                                    </Select>
                                    <Space direction="vertical" size={12}>
                                        <DatePicker
                                            format={"DD/MM/YYYY"}
                                            placeholder="Assigned Date"
                                            onChange={selectedAssignedDate}
                                        />
                                    </Space>
                                </div>
                                <div className="search">
                                    <Space direction="vertical">
                                        <Input.Search
                                            allowClear
                                            onSearch={onSearch}
                                            value={searchText}
                                            onChange={evt => setSearchText(evt.target.value)}
                                            style={{ width: "200px" }}
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
                                        total: totalAssignment,
                                        current: page,
                                        pageSize: pageSize,
                                        pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                                        itemRender: itemRender,
                                        onChange: (page, pageSize) => {
                                            setPage(page);
                                            setPageSize(pageSize)
                                        }
                                    }}
                                    onRow={(assignment) => ({
                                        onClick: () => (localStorage.setItem("status-assignment-id", assignment.id)),
                                        onDoubleClick: () => (showModal(assignment.id))
                                    })}
                                    rowKey={"id"}
                                >
                                </Table>
                            </div>
                        </div>
                    ) : <p>No assignment to display</p>}
            </article>
            <Modal
                open={isVisible}
                title="Detail Assignment Information"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <p className="view_Detail">Asset Code : {detail.assetCode}</p>
                <p className="view_Detail">Asset Name : {detail.assetName} </p>
                <p className="view_Detail">Assigned to : {detail.assignedToUserName} </p>
                <p className="view_Detail">Assigned by : {detail.assignedByUserName} </p>
                <p className="view_Detail">Assigned Date : {new Date(detail.assignedDate).toLocaleDateString("en-GB")}</p>
                <p className="view_Detail">Status : {detail.status}</p>
                <p className="view_Detail">Note : {detail.note} </p>
            </Modal>
        </>
    );
}

export default AdminHomePage;