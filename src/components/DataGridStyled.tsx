import { FormControl, MenuItem, Pagination, Select, Stack, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  DataGrid,
  DataGridProps,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  GridRowSpacingParams,
  useGridApiContext,
} from '@mui/x-data-grid';

import BootstrapInput from './BootstrapInput';

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

const AgaveDataGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  width: '100%',
  color: theme.palette.primary.main,
  border: 'none',
  borderColor: 'transparent',
  '& .MuiDataGrid-columnHeaders': {
    border: 'none',
  },
  '& .MuiDataGrid-topContainer div': {
    border: 'none',
    backgroundColor: 'transparent !important',
  },
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'visible !important',
  },
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    height: '100%',
  },
  '& .MuiDataGrid-row': {
    // userSelect: 'none',
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
    right: 1,
    width: 1,
    zIndex: 2,
    content: "''",
    position: 'absolute',
    backgroundColor: grey[300],
    top: theme.spacing(1),
    bottom: theme.spacing(1),
  },
  '& .MuiDataGrid-footerContainer': {
    border: 'none',
    flexDirection: 'column  !important',
    justifyContent: 'center !important',
  },
}));

AgaveDataGrid.defaultProps = {
  getRowSpacing: (params: GridRowSpacingParams) => ({
    top: params.isFirstVisible ? 4 : 4,
    bottom: params.isLastVisible ? 0 : 4,
  }),
  paginationModel: {
    pageSize: 10,
    page: 0,
  },
  rowHeight: 76,
  pageSizeOptions: [10, 25, 50, 75, 100],
  slots: {
    // pagination: AgavePagination,
  },
  localeText: {
    noRowsLabel: 'No hay filas',
    MuiTablePagination: {
      labelRowsPerPage: 'Filas por página',
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
    },
  },
};

export { AgaveDataGrid };
