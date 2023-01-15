import { Table } from 'antd';
import moment from 'moment'

const columns = [
  {
    title: 'Policy Start',
    dataIndex: 'quoteDate',
    sorter: (a, b) => new Date(a.quoteDate) - new Date(b.quoteDate),
    sortDirections: ['descend', 'ascend'],
    render: (date) => moment(date).format('MM/DD/YYYY'),
  },
  {
    title: 'Policy End',
    dataIndex: 'validUntil',
    sorter: (a, b) => new Date(a.validUntil) - new Date(b.validUntil),
    sortDirections: ['descend', 'ascend'],
    render: (date) => moment(date).format('MM/DD/YYYY'),
  },
  {
    title: 'Primary Activity',
    dataIndex: 'primaryActivity',
    sorter: (a, b) => a.primaryActivity - b.primaryActivity,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Policy Period (m)',
    dataIndex: 'policyPeriod',
    sorter: (a, b) => a.policyPeriod - b.policyPeriod,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    sorter: (a, b) => a.revenue - b.revenue,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Employees',
    dataIndex: 'employees',
    sorter: (a, b) => a.employees - b.employees,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
    sorter: (a, b) => a.capacity - b.capacity,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Policy Cost',
    dataIndex: 'policyCost',
    sorter: (a, b) => a.policyCost - b.policyCost,
    sortDirections: ['descend', 'ascend'],
  },
];

const PolicyList = ({ policies }) => {
  return policies ? (
    <Table
      columns={columns}
      dataSource={policies.map((policy, index) => {
        return {...policy, key: index};
      })}
    />
  ) : (
    <div>Loading policies</div>
  );
};
export default PolicyList