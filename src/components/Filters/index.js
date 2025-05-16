import { Select, Radio, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

import { selectedFilters } from '../../store/selectors';
import { setFilter, resetFilter } from '../../store/reducers';

import { CATEGORIES, PRIORITIES, STATUSES, ALL } from '../../constants';

import { FilterCard, FilterContainer, FilterItem, StyledLabel, StyledRadioButton } from './styles';

const Filters = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectedFilters);

  const handleFilterChange = (type, value) => dispatch(setFilter({ [type]: value }));

  const handleClearFilters = () => dispatch(resetFilter());

  return (
    <FilterCard title="Filters">
      <FilterContainer size={16}>
        <FilterItem>
          <StyledLabel>Search</StyledLabel>
          <Input
            prefix={<SearchOutlined />}
            width={400}
            suffix={<CloseOutlined onClick={() => handleFilterChange('search', '')} />}
            placeholder="Search"
            value={filter.search}
            onChange={e => handleFilterChange('search', e.target.value)}
          />
        </FilterItem>
        <FilterItem>
          <StyledLabel>Status</StyledLabel>
          <Radio.Group
            buttonStyle="solid"
            value={filter.status}
            style={{ width: '100%' }}
            onChange={e => handleFilterChange('status', e.target.value)}
          >
            {Object.values(STATUSES).map(status => (
              <StyledRadioButton key={status} value={status}>
                {status}
              </StyledRadioButton>
            ))}
          </Radio.Group>
        </FilterItem>

        <FilterItem>
          <StyledLabel>Category</StyledLabel>
          <Select value={filter.category} onChange={value => handleFilterChange('category', value)}>
            <Select.Option value={ALL}>All Categories</Select.Option>
            {Object.values(CATEGORIES).map(category => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </FilterItem>

        <FilterItem>
          <StyledLabel>Priority</StyledLabel>
          <Select value={filter.priority} onChange={value => handleFilterChange('priority', value)}>
            <Select.Option value={ALL}>All Priorities</Select.Option>
            {Object.values(PRIORITIES).map(priority => (
              <Select.Option key={priority} value={priority}>
                {priority}
              </Select.Option>
            ))}
          </Select>
        </FilterItem>

        <FilterItem>
          <StyledLabel>&nbsp;</StyledLabel>
          <Button type="default" onClick={handleClearFilters} block>
            Clear Filters
          </Button>
        </FilterItem>
      </FilterContainer>
    </FilterCard>
  );
};

export default Filters;
