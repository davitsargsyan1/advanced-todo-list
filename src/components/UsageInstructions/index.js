import { Collapse } from 'antd';

const { Panel } = Collapse;

const UsageInstructions = () => (
  <Collapse ghost style={{ background: '#f0f2f5', marginTop: 24, borderRadius: 8 }}>
    <Panel header="Usage Instructions" key="1">
      <ul>
        <li>Add a new task by clicking the "Add Task" button</li>
        <li>Mark tasks as complete by clicking the checkmark icon</li>
        <li>Edit or delete tasks using the icons on each task card</li>
        <li>Filter tasks by status, category, or priority using the filters section</li>
        <li>Drag and drop tasks to reorder them</li>
        <li>Click on the eye icon to view task details</li>
      </ul>
    </Panel>
  </Collapse>
);

export default UsageInstructions;
