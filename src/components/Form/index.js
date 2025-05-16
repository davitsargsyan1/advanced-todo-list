import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { Form as AntForm, Input, Select, DatePicker, Button, Space } from 'antd';

import { addTask, updateTask } from '../../store/reducers';

import { CATEGORIES, PRIORITIES } from '../../constants';

import { FormContainer } from './styles';

const Form = ({ initialValues = null, onCancel = null }) => {
  const [form] = AntForm.useForm();

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setIsEditing(true);
      form.setFieldsValue({
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
      });
    }
  }, [initialValues, form]);

  const handleSubmit = values => {
    const formattedValues = {
      title: values.title,
      description: values.description,
      category: values.category,
      priority: values.priority,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    };

    if (isEditing) {
      dispatch(updateTask({ id: initialValues.id, ...formattedValues }));
    } else {
      dispatch(addTask(formattedValues));
      form.resetFields();
    }

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <FormContainer>
      <AntForm
        form={form}
        name="taskForm"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          title: '',
          description: '',
          category: CATEGORIES.WORK,
          priority: PRIORITIES.MEDIUM,
          dueDate: null,
        }}
      >
        <AntForm.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter task title" />
        </AntForm.Item>

        <AntForm.Item name="description" label="Description">
          <Input.TextArea
            placeholder="Enter task description"
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </AntForm.Item>

        <AntForm.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            {Object.values(CATEGORIES).map(category => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </AntForm.Item>

        <AntForm.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please select a priority' }]}
        >
          <Select placeholder="Select a priority">
            {Object.values(PRIORITIES).map(priority => (
              <Select.Option key={priority} value={priority}>
                {priority}
              </Select.Option>
            ))}
          </Select>
        </AntForm.Item>

        <AntForm.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: '100%' }} />
        </AntForm.Item>

        <AntForm.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {isEditing ? 'Update Task' : 'Add Task'}
            </Button>
            {onCancel && <Button onClick={onCancel}>Cancel</Button>}
          </Space>
        </AntForm.Item>
      </AntForm>
    </FormContainer>
  );
};

export default Form;
