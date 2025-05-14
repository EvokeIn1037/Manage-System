import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
// import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

// type SparkLineData = number[];

// function getDaysInMonth(month: number, year: number) {
//   const date = new Date(year, month, 0);
//   const monthName = date.toLocaleDateString('en-US', {
//     month: 'short',
//   });
//   const daysInMonth = date.getDate();
//   const days = [];
//   let i = 1;
//   while (days.length < daysInMonth) {
//     days.push(`${monthName} ${i}`);
//     i += 1;
//   }
//   return days;
// }

// function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
//   const date = new Date();
//   const data = getDaysInMonth(date.getMonth(), date.getFullYear());
//   const { value, colDef } = params;

//   if (!value || value.length === 0) {
//     return null;
//   }

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
//       <SparkLineChart
//         data={value}
//         width={colDef.computedWidth || 100}
//         height={32}
//         plotType="bar"
//         showHighlight
//         showTooltip
//         colors={['hsl(210, 98%, 42%)']}
//         xAxis={{
//           scaleType: 'band',
//           data,
//         }}
//       />
//     </div>
//   );
// }

interface PopperCellProps {
  value: string;            // ← whatever type your column holds
  title: string;
}

const PopperCell: React.FC<PopperCellProps> = ({ value, title }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // toggle popper
    setAnchorEl(prev => (prev ? null : event.currentTarget));
  };
  const open = Boolean(anchorEl);
  const id = open ? 'grid-popper' : undefined;

  return (
    <>
      <div>
        <Button variant="outlined" onClick={handleClick} sx={{px: 1, py: 0, height: '100%'}}>
          View {title}
        </Button>
        <Popper
          id={id}
          // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
          sx={{ zIndex: 1200 }}
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          disablePortal={false}
          modifiers={[
            {
              name: 'flip',
              enabled: true,
              options: {
                altBoundary: true,
                rootBoundary: 'document',
                padding: 8,
              },
            },
            {
              name: 'preventOverflow',
              enabled: false,
              options: {
                altAxis: true,
                altBoundary: true,
                tether: true,
                rootBoundary: 'document',
                padding: 8,
              },
            },
          ]}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  bgcolor: 'primary.light', // default paper bg
                  color: 'primary-contrastText',}}
              >
                <Typography variant="body1" sx={{ p: 2 }}>{value}</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </>
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
    minWidth: 120,
  },
  {
    field: 'orderNumber',
    headerName: 'Order Number',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 170,
  },
  {
    field: 'purchaseDate',
    headerName: 'Purchase Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'status',
    headerName: 'Status Type',
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: 'returnReason',
    headerName: 'Return Reason',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 240,
    renderCell: params => <PopperCell value={params.value as string} title="Reason" />
  },
  {
    field: 'customerComment',
    headerName: 'Customer Comment',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 240,
    renderCell: params => <PopperCell value={params.value as string} title="Comments" />
  },
  {
    field: 'realIssue',
    headerName: 'Real Issue',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    minWidth: 200,
    renderCell: params => <PopperCell value={params.value as string} title="Issue" />
    // renderCell: renderSparklineCell,
  },
];
