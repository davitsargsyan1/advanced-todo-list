import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Descriptions, Tag, Button, Space, Modal, Alert, Divider } from 'antd';
import {
  CopyOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import Form from '../../components/Form';

import { selectTasks } from '../../store/selectors';
import { toggleTask, deleteTask, duplicateTask } from '../../store/reducers';

import { formatDate, getPriorityColor } from '../../helpers';

import { PageHeader, StyledCard } from './styles';
const TaskDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTasks = useSelector(selectTasks);

  const task = allTasks.find(t => t.id === id);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  if (!task) {
    return (
      <div>
        <PageHeader>
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
              Back to Tasks
            </Button>
          </Space>
        </PageHeader>
        <Alert
          message="Task Not Found"
          description="The task you're looking for doesn't exist or has been deleted."
          type="error"
          showIcon
        />
      </div>
    );
  }

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setIsDeleteModalVisible(false);
    navigate('/');
  };

  const handleDuplicate = () => {
    dispatch(duplicateTask(task));
  };

  return (
    <div>
      <PageHeader>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            Back to Tasks
          </Button>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Task Details
          </Typography.Title>
        </Space>
        <Space>
          <Button
            type={task.completed ? 'default' : 'primary'}
            icon={<CheckOutlined />}
            onClick={handleToggle}
          >
            {task.completed ? 'Mark as Active' : 'Mark as Completed'}
          </Button>
          <Button icon={<EditOutlined />} onClick={() => setIsEditModalVisible(true)}>
            Edit
          </Button>
          <Button icon={<CopyOutlined />} onClick={() => handleDuplicate()}>
            Duplicate
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      </PageHeader>

      <StyledCard $priority={task.priority}>
        <Typography.Title
          level={2}
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#aaa' : 'inherit',
          }}
        >
          {task.title}
        </Typography.Title>

        <Space wrap>
          <Tag>{task.category}</Tag>
          <Tag color={getPriorityColor(task.priority)}>{task.priority} Priority</Tag>
          <Tag color={task.completed ? 'green' : 'blue'}>
            {task.completed ? 'Completed' : 'Active'}
          </Tag>
          {task.dueDate && (
            <Tag icon={<ClockCircleOutlined />} color="purple">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Tag>
          )}
        </Space>

        <Divider />

        {task.description ? (
          <div style={{ marginBottom: 24 }}>
            <Typography.Title level={4}>Description</Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: 16,
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#aaa' : 'inherit',
              }}
            >
              {task.description}
            </Typography.Paragraph>
          </div>
        ) : (
          <Alert
            showIcon
            type="info"
            message="No description provided"
            style={{ marginBottom: 24 }}
          />
        )}

        <Descriptions title="Task Information" bordered>
          <Descriptions.Item label="Created" span={3}>
            <Space>
              <CalendarOutlined />
              {formatDate(task.createdAt)}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Status" span={3}>
            {task.completed ? 'Completed' : 'Active'}
          </Descriptions.Item>

          <Descriptions.Item label="Category" span={3}>
            {task.category}
          </Descriptions.Item>

          <Descriptions.Item label="Priority" span={3}>
            {task.priority}
          </Descriptions.Item>

          <Descriptions.Item label="Due Date" span={3}>
            {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
          </Descriptions.Item>
        </Descriptions>
      </StyledCard>

      <Modal
        title="Edit Task"
        open={isEditModalVisible}
        footer={null}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form initialValues={task} onCancel={() => setIsEditModalVisible(false)} />
      </Modal>

      <Modal
        title="Delete Task"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default TaskDetail;
