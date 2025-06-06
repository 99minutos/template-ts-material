import { FormControl, MenuItem, Pagination, Select, Stack, styled } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  GridRowSpacingParams,
  useGridApiContext,
} from '@mui/x-data-grid';

import BootstrapInput from './bootstrap-input';

export const AgavePagination = () => {
  const apiRef = useGridApiContext();
  const page = gridPageSelector(apiRef);
  const pageSize = gridPageSizeSelector(apiRef);
  const pageCount = gridPageCountSelector(apiRef);
  return (
    <Stack flexDirection="row" justifyContent="center" alignItems="center">
      <FormControl>
        <Select
          size="small"
          variant="outlined"
          value={pageSize}
          onChange={({ target: { value } }) => apiRef.current.setPageSize(value)}
          input={<BootstrapInput id="status-chip" sx={{ maxWidth: 512 }} />}
        >
          {[10, 25, 50, 75, 100].map((pageSize) => (
            <MenuItem key={`r-${pageSize}`} value={pageSize}>
              {pageSize}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        color="primary"
        page={page + 1}
        count={pageCount}
        onChange={(_, value) => apiRef.current.setPage(value - 1)}
      />
    </Stack>
  );
};

const StyledDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    border: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    border: 'none !important',
  },
  '& .MuiDataGrid-row': {
    borderRadius: 8,
    width: 'calc(100% - 2px)',
    border: '1px solid rgba(224, 224, 224, 1)',
    backgroundColor: theme.palette.common.white,
  },
  '& .MuiDataGrid-cell': {
    border: 'none',
    position: 'relative',
  },
  '& .MuiDataGrid-cell:not(:last-child):after': {
    right: 0,
    width: 1,
    zIndex: 2,
    content: "''",
    position: 'absolute',
    backgroundColor: '#CACACA',
    top: theme.spacing(1),
    bottom: theme.spacing(1),
  },
  '& .MuiDataGrid-footerContainer': {
    border: 'none',
    flexDirection: 'column  !important',
    justifyContent: 'center !important',
  },
}));

function AgaveDataGrid(props: DataGridProps) {
  const getRowSpacing = (params: GridRowSpacingParams) => ({
    top: params.isFirstVisible ? 0 : 5,
    bottom: params.isLastVisible ? 0 : 5,
  });
  const rowHeight = 76;
  const localeText = {
    noRowsLabel: 'No hay filas',
    paginationRowsPerPage: 'Filas por página',
    paginationDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  };
  return (
    <StyledDataGrid
      getRowSpacing={props.getRowSpacing ?? getRowSpacing}
      rowHeight={props.rowHeight ?? rowHeight}
      localeText={props.localeText ?? localeText}
      {...props}
    />
  );
}
export { AgaveDataGrid };
