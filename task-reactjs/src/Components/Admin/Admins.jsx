import React, { useState ,useEffect} from 'react';
import axios from "axios";
import { connect, useSelector, useDispatch } from 'react-redux';
import { Table, Input, Form, Typography, Upload } from 'antd';

// Helpers
import {
    Card,
    setPaginationObject,
} from "Components/Commons/Commons";

//REDUX
import { adminList } from "Redux/Admin/Actions";

// STYLES
import { Wrapper } from "./Admins.style";

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
            const inputNode = inputType === 'image' ? <Upload /> : <Input />;
            return (
                <td {...restProps}>
                {editing ? (
                    <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                        required: true,
                        message: `Please Input ${title}!`,
                        },
                    ]}
                    >
                    {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
                </td>
            );
    };

let initPaginationInfo = {
    total: 0,
    current: 1,
    pageSize:6
};

function Admins(props) {
    let [loading, setLoading] = useState(false),
        [paginationInfo, setPaginationInfo] = useState(initPaginationInfo);
        const admin = useSelector(state => state.Admin.adminData);
        const dispatch = useDispatch();
        const [form] = Form.useForm();
        const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        getAdmin();
        // eslint-disable-next-line
    }, []);

    async function getAdmin(pagination = paginationInfo) {
            const baseURL = `https://reqres.in/api/users?page=${pagination.current}`;
            setLoading(true);
            await axios.get(baseURL).then((response) => {
                let adminDatas = response.data.data.map((item)=>{
                    let DataValues = {...item}
                    DataValues.key = item.id;
                    return DataValues;
                })
                dispatch(adminList({ adminData: adminDatas }));
                setPaginationInfo({
                    ...pagination,
                    total: response.data.total,
                });
                setLoading(false);
            }).catch((error)=>{
                console.log("error:",error);
                setLoading(false);
            });
    }

    const isEditing = (record) => record.key === editingKey;

    const onDelete = (key) => {
        try {
            setLoading(true);
            let newData = admin.filter((item)=> item.key !== key);
            dispatch(adminList({ adminData: newData }));
            setLoading(false);
        } catch (errInfo) {
            setLoading(false);
            console.log('Delete Failed:', errInfo);
    }
    }

    const edit = (record) => {
        form.setFieldsValue({
        first_name: '',
        last_name: '',
        email: '',
        ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            setLoading(true);
            const row = await form.validateFields();
            const newData = [...admin];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                dispatch(adminList({ adminData: newData }));
                setLoading(false);
                setEditingKey('');
            }
        } catch (errInfo) {
            setLoading(false);
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            width: 200,
            align:"center",
            render: (text, record) => (
                <img
                    className="img-fluid"
                    src={record.avatar}
                    alt="avatar"
                    width="70"
                    height="70"
                />
            ),
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            width: 200,
            align:"center",
            editable: true,
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
            width: 200,
            align:"center",
            editable: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
            align:"center",
            editable: true,
        },
        {
        title: 'Action',
        dataIndex: 'operation',
        align:"center",
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
            <span>
                <Typography.Link
                    onClick={() => save(record.key)}
                    style={{
                        marginRight: 8,
                    }}
                >
                    Save
                </Typography.Link>
                <Typography.Link
                    onClick={() => cancel()}
                >
                Cancel
                </Typography.Link>
            </span>
            ) : (
            <span>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{
                        marginRight: 8,
                }}>
                    Edit
                </Typography.Link>
                <Typography.Link disabled={editingKey !== ''} onClick={() => onDelete(record.key)}>
                    Delete
                </Typography.Link>
            </span>
            );
        },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'avatar' ? 'image' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    function onTableChange(...rest) {
        let newPaginationInfo = setPaginationObject(paginationInfo, ...rest);
        getAdmin(newPaginationInfo);
        setPaginationInfo(newPaginationInfo);
    }

    return (
        <Wrapper>
            <Card spacing={24}>
                <Form form={form} component={false}>
                    <Table
                        loading={loading}
                        components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                        bordered
                        rowKey={"id"}
                        dataSource={admin}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        onChange={onTableChange}
                        pagination={paginationInfo}
                    />
                </Form>
        </Card>
        </Wrapper>
    );
};

const mapStateToProps = state => ({
    adminData: state.Admin.adminData
});

export default connect(mapStateToProps)(Admins);