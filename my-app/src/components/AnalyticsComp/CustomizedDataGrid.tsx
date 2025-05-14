import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { columns } from './gridData';

interface CustomizedDataGridProps {
  apiurl: string;
  dateTrig: number;
  startDate: string;
  endDate: string;
  rows: GridRowsProp;
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
  rowsShown: GridRowsProp;
  setRowsShown: React.Dispatch<React.SetStateAction<GridRowsProp>>;
}

export default function CustomizedDataGrid({ apiurl, dateTrig, startDate, endDate, rows, setRows, rowsShown, setRowsShown }: CustomizedDataGridProps) {
  // const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [nowDTrig, setNowDTrig] = React.useState(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hintInfo, setHintInfo] = React.useState("Please select the date range!");
  const [hintInfoFlag, setHintInfoFlag] = React.useState(false);

  React.useEffect(() => {
    if (dateTrig !== nowDTrig) {
      setRowsShown([]);
      setRows([]);
      setHintInfoFlag(true);
      const fetchRows = async () => {
        setLoading(true);
        try {
          const res = await fetch(apiurl + `/data/detailbydate/?mode=1&start=${startDate}&end=${endDate}`, {
            method: 'GET',
            credentials: 'include', // 👈 IMPORTANT for sending/receiving cookies
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          const data: GridRowsProp = await res.json();
          setRowsShown(data);
          setRows(data);
          setNowDTrig(dateTrig);
        } catch (err) {
          console.error('Failed to load rows:', err);
          setRowsShown([]);
          setRows([]);
        } finally {
          setLoading(false);
        }
      };

      fetchRows();
    }
  }, [apiurl, dateTrig, nowDTrig, startDate, endDate]);

  // if still no data (or loading) show placeholder
  if (!rows.length) {
    if (hintInfoFlag) {
      setHintInfo("No data in the selected range.");
      setHintInfoFlag(false);
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "25vh",
        }}
      >
        <Typography component="h3" variant="h5" sx={{ my: 4 }}>
          {loading
            ? "Loading..."
            : hintInfo}
        </Typography>
      </Box>
    );
  }

  return (
    <DataGrid
      checkboxSelection
      rows={rowsShown}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
