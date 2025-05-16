import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Tag, Space, Button, Modal, Tooltip } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import { getPriorityColor } from '../../helpers';

import { toggleTask, deleteTask, duplicateTask } from '../../store/reducers';

import Form from '../Form';

import { StyledCard, Title, CategoryTag, PriorityTag } from './styles';

const Item = ({ task, index, onDragStart }) => {
  const dispatch = useDispatch();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDuplicate = () => {
    dispatch(duplicateTask(task));
  };

  const handleDelete = () => {
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(task.id));
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <StyledCard
        draggable
        $priority={task.priority}
        $completed={task.completed}
        onDragStart={e => onDragStart(e, index)}
        actions={[
          <Tooltip title={!task.completed ? 'Mark as completed' : 'Mark as incomplete'}>
            <Button
              type="text"
              icon={!task.completed ? <CheckOutlined /> : <CloseOutlined />}
              onClick={handleToggle}
            />
          </Tooltip>,
          <Tooltip title="Duplicate">
            <Button type="text" icon={<CopyOutlined />} onClick={handleDuplicate} />
          </Tooltip>,
          <Tooltip title="View details">
            <Link to={`/task/${task.id}`}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>,
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setIsEditModalVisible(true)}
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <Button type="text" icon={<DeleteOutlined />} danger onClick={handleDelete} />
          </Tooltip>,
        ]}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title $completed={task.completed}>{task.title}</Title>

          {task.description && (
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              style={{
                marginBottom: 8,
                color: task.completed ? '#aaa' : 'inherit',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.description}
            </Typography.Paragraph>
          )}

          <Space>
            <CategoryTag>{task.category}</CategoryTag>
            <PriorityTag color={getPriorityColor(task.priority)}>{task.priority}</PriorityTag>
            {task.dueDate && (
              <Tag icon={<ClockCircleOutlined />} color="blue">
                {new Date(task.dueDate).toLocaleDateString()}
              </Tag>
            )}
          </Space>
        </Space>
      </StyledCard>

      <Modal
        footer={null}
        title="Edit Task"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form initialValues={task} onCancel={() => setIsEditModalVisible(false)} />
      </Modal>

      <Modal
        okText="Delete"
        title="Delete Task"
        onOk={confirmDelete}
        open={isDeleteModalVisible}
        okButtonProps={{ danger: true }}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </>
  );
};

export default Item;
