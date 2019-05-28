import React from 'react';

import { storiesOf } from '@storybook/react';
import Table from './index';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Button from '../Button';
import Select from '../Select';

const stories = storiesOf('Table', module);
stories.addDecorator(withKnobs);
const { Column } = Table;

const columns = [
  <Column
    key="columnFirst"
    title={'column1'}
    dataIndex={'columnFirst'}
    sorter={true}
  />,
  <Column key="columnSecond" title={'column2'} dataIndex={'columnSecond'} />,
  <Column key="columnThird" title={'column3'} dataIndex={'columnThird'} />
];
const options = [
  { key: '1', content: 'First Item' },
  { key: '2', content: 'Second Item' },
  { key: '3', content: 'Third Item' }
];

const data = [
  {
    key: '1',
    columnFirst: (
      <div>
        <span> this is dummy text</span>
      </div>
    ),
    columnSecond: 32,
    columnThird: 'columnThird text/div come here'
  },
  {
    key: '2',
    columnFirst: <Button />,
    columnSecond: 32,
    columnThird: 'columnThird text/div come here'
  },
  {
    key: '3',
    columnFirst: (
      <Select
        options={options}
        defaultValue="Select"
        style={{ minWidth: '200px' }}
      />
    ),
    columnSecond: (
      <Select
        options={options}
        defaultValue="Select"
        style={{ minWidth: '200px' }}
      />
    ),
    columnThird: (
      <div>
        <Select
          options={options}
          defaultValue="Select"
          style={{ minWidth: '200px' }}
        />
        <span> this is dummy text</span>
      </div>
    )
  },
  {
    key: '4',
    columnFirst: 'Joe Black',
    columnSecond: 32,
    columnThird: 'Sidney No. 1 Lake Park'
  }
];

const columnsTry = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a> // eslint-disable-line react/display-name
  }
];

const dataOptions = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park'
  }
];

stories
  .add(
    'Table Small',
    withInfo('Adding Table small')(() => (
      <Table
        rowSelection={{}}
        dataSource={data}
        size="small"
        pagination={false}
        actionBar={{
          countText: 'hahahaa',
          actionItem: ['<div>kakakja</div>']
        }}
      >
        {columns}{' '}
      </Table>
    ))
  )
  .add(
    'Table Custom padding',
    withInfo('Adding Table small')(() => (
      <Table
        rowSelection={{}}
        dataSource={data}
        loading={boolean('loading', false)}
        size="small"
        pagination={false}
        headerCellPadding={{
          pTop: '10px',
          pRight: '0',
          pBottom: '10px',
          pLeft: '30px'
        }}
        contentCellPadding={{
          pTop: '20px',
          pRight: '0',
          pBottom: '20px',
          pLeft: '40px'
        }}
        actionBar={{
          countText: 'hahahaa',
          actionItem: ['<div>kakakja</div>']
        }}
      >
        {columns}{' '}
      </Table>
    ))
  )
  .add(
    'Table Middle',
    withInfo('Adding Table middle')(() => (
      <Table dataSource={data} size="middle" pagination={false}>
        {columns}
      </Table>
    ))
  )

  .add(
    'Table Scroll',
    withInfo('Adding Table scroll')(() => (
      <Table
        columns={columnsTry}
        dataSource={dataOptions}
        scroll={{ x: 1500, y: 300 }}
        pagination={false}
      />
    ))
  )

  .add(
    'Table with LoadMore Button',
    withInfo('Adding Table scroll')(() => (
      <Table
        columns={columnsTry}
        dataSource={dataOptions}
        scroll={{ x: 1500, y: 300 }}
        pagination={false}
        isLoadMore
        hasMore={true}
        loading
      />
    ))
  );
