import { CloseCircleTwoTone, FilterFilled } from "@ant-design/icons";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react"
import CreateAsset from "../../services/assets/createAsset";
import EditAsset from "../../services/assets/EditAsset";

const AdminAssetPage = () => {

    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] =  useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalAsset, setTotalAsset] = useState();
    const [detail, setDetail] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const token = localStorage.getItem("token");
    const [categories, setCategories] = useState([]);

    const handleCancel = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        axios.get("https://localhost:7150/all-categories", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setCategories(response.data);
        })
    }, [token]);

    const showModal = (id) => {
        fetch(`https://localhost:7150/get-asset/${id}`, {
            method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    'Authorization': `Bearer ${token}`
                }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            setDetail(json);
        })

        setIsVisible(true);
    };

    useEffect(() => {
        setLoading(true);

        axios.get("https://localhost:7150/get-assets", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setDataSource(response.data);
            setTotalAsset(response.headers["Asset-Pagination"]);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [token]);

    const columns = [
        {
            key: "1",
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
            key: "2",
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
            key: "3",
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
        {
            key: "4",
            title: "",
            width: "15%",
            dataIndex: "id",
            render: (id) => (
                <Space>
                    <EditAsset />
                    <CloseCircleTwoTone twoToneColor="#d42a2a" onClick={() => showConfirm(id)} />
                </Space>
            )
        },
    ];

    const confirm = Modal.confirm;

    const deleteAsset = (id) => {
        fetch(`https://localhost:7150/delete-asset/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(function () {
                setDataSource(dataSource.filter(asset => asset.id !== id));
            })
            .catch((err) => console.log(err))
    }

    const showConfirm = (id) => {
        confirm({
            title: 'Are you sure ? ',
            content: 'Do you want to delete this Asset?',
            okText: 'Yes',
            onCancel() { },
            onOk: () => { deleteAsset(id) },
        })
    };

    const itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Button>Previous</Button>;
        } else if (type === 'next') {
            return <Button>Next</Button>;
        }
        return originalElement;
    };

    const [searchText, setSearchText] = useState("");
    const [selectedValue, setSelectedValues] = useState([]);

    const secondHandleFilter = (value) => {
        setSelectedValues(value);
    }

    const dataFiltered = (dataSource.filter((asset) => (
        asset.assetName.toLowerCase().includes(searchText.toLowerCase())
        || asset.assetCode.toLowerCase().includes(searchText.toLowerCase())
    )
        &&
        asset.categoryName.toLowerCase().includes(selectedValue)
    ));

    const onSearch = (value) => console.log(value);

    return (
        <>
            <article>
                <h3 className="title">
                    Asset List
                </h3>

                {dataSource?.length
                    ? (
                        <div>
                            <div className="extension">
                                <div className="filter">
                                    <Select
                                        mode="multiple"
                                        placeholder="Category"
                                        suffixIcon={<FilterFilled />}
                                        showArrow
                                        value={selectedValue}
                                        onChange={secondHandleFilter}
                                        style={{ width: "200px", marginLeft: "50px" }}
                                    >
                                        {categories.map(category => (
                                            <Select.Option key={category.id} value={category.name.toLowerCase()}>
                                                {category.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="search">
                                    <Space direction="vertical">
                                        <Input.Search
                                            allowClear
                                            onSearch={onSearch}
                                            value={searchText}
                                            onChange={evt => setSearchText(evt.target.value)}
                                            style={{ width: 200 }}
                                        />
                                    </Space>
                                    <CreateAsset />
                                </div>
                            </div>
                            <div className="table-responsive-sm">
                                <Table
                                    loading={loading}
                                    columns={columns}
                                    dataSource={dataFiltered}
                                    pagination={{
                                        showSizeChanger: true,
                                        total: totalAsset,
                                        current: page,
                                        pageSize: pageSize,
                                        pageSizeOptions: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
                                        itemRender: itemRender,
                                        onChange: (page, pageSize) => {
                                            setPage(page);
                                            setPageSize(pageSize)
                                        }
                                    }}
                                    onRow={(asset) => ({
                                        onClick: () => (localStorage.setItem("edit-asset-id", asset.id)),
                                        onDoubleClick: () => (showModal(asset.id))
                                    })}
                                    rowKey={"id"}
                                >
                                </Table>
                            </div>
                        </div>
                    ) : <p>No asset to display</p>
                }
            </article>
            <Modal
                open={isVisible}
                title="Asset Detail"
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <p className="view_Detail">Asset Code : {detail.assetCode}</p>
                <p className="view_Detail">Asset Name : {detail.assetName} </p>
                <p className="view_Detail">Specification : {detail.specification} </p>
                <p className="view_Detail">Installed Date : {new Date(detail.installedDate).toLocaleDateString("en-GB")}</p>
                <p className="view_Detail">Category : {detail.categoryName}</p>
            </Modal>
        </>
    );
}

export default AdminAssetPage;