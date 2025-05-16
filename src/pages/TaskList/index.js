import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Empty, Row, Col, Modal } from 'antd';

import Item from '../../components/Item';
import Form from '../../components/Form';
import Filters from '../../components/Filters';
import UsageInstructions from '../../components/UsageInstructions';

import { reorderTasks } from '../../store/reducers';
import { selectFilteredTasks } from '../../store/selectors';

import { PageHeader } from './styles';

const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectFilteredTasks);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragEnd = e => {
    e.currentTarget.style.opacity = '1';
    setDraggingIndex(null);
  };

  const handleDragOver = e => {
    e.preventDefault();
    return false;
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggingIndex !== null && draggingIndex !== index) {
      dispatch(
        reorderTasks({
          sourceIndex: draggingIndex,
          destinationIndex: index,
        }),
      );
    }

    return false;
  };

  return (
    <div>
      <PageHeader>
        <Typography.Title level={2}>Tasks</Typography.Title>
        {!isFormVisible && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Add Task
          </Button>
        )}
      </PageHeader>

      <Modal
        footer={null}
        title="Add Task"
        open={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
      >
        <Form onCancel={() => setIsFormVisible(false)} />
      </Modal>

      <Filters />

      {!tasks.length ? (
        <Empty description="No tasks found" style={{ margin: '40px 0' }} />
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            {tasks.map((task, index) => (
              <div key={task.id} onDragOver={handleDragOver} onDrop={e => handleDrop(e, index)}>
                <Item
                  task={task}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              </div>
            ))}
          </Col>
        </Row>
      )}

      <UsageInstructions />
    </div>
  );
};

export default TaskList;
