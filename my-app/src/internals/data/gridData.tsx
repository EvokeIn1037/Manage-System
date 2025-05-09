import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const date = new Date();
  const data = getDaysInMonth(date.getMonth(), date.getFullYear());
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: 'Unit returned to inventory' | 'Repair') {
  const colors: { [index: string]: 'success' | 'default' } = {
    'Unit returned to inventory': 'success',
    'Repair': 'default',
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>,
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  { field: 'serialNumber',
    headerName: 'Serial Number', 
    flex: 1, 
    minWidth: 80,
  },
  {
    field: 'orderNumber',
    headerName: 'Order Number',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'purchaseDate',
    headerName: 'Purchase Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'status',
    headerName: 'Status Type',
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: 'returnReason',
    headerName: 'Return Reason',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'customerComment',
    headerName: 'Customer Comment',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 120,
  },
  {
    field: 'realIssue',
    headerName: 'Real Issue',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 100,
    renderCell: renderSparklineCell,
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    serialNumber: 612024047853,
    status: 'Return',
    orderNumber: "114-4367767-1507402",
    purchaseDate: "2024-11-05 09:17:43",
    returnDate: "2024-12-03 16:53:01",
    customerComment: "Ok",
    realIssue: [
      469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863,
      911787, 844815, 992022, 1143838, 1446926, 1267886, 1362511, 1348746, 1560533,
      1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989, 3263473,
      3296541, 3041524, 2599497,
    ],
  },
];
