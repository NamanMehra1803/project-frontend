import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


export default function Table(props) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, //customize the default page size
  });
  const [rowCount, setRowCount] = useState(0);
  const table = useMaterialReactTable({
    columns: props?.columns,
    data: props?.data?.rows?.length > 0 ? props?.data?.rows : props?.data,
    manualPagination: true,
    onPaginationChange: setPagination,
    // rowCount: rowCount,
    rowCount: Number(rowCount),
    manualSorting: true,
    manualFiltering: true,
    enableGlobalFilter:false,
    enableColumnResizing: true,
    enableGlobalFilterModes:false,
    enableFilterMatchHighlighting:false,
    enableHiding : false,
    enableColumnFilters : false,
     enableDensityToggle : false,
              enableColumnActions : false,
              enableGlobalFilter : false,
              enableFullScreenToggle : false, enableSorting : false,
    
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    state: {
      isLoading: props?.isLoading,
      pagination,
    }
  });

  useEffect(() => {
    setRowCount(Number(props?.data?.count))
  }, [props?.data])

  useEffect(() => {
    props?.handlePagination(pagination)
  }, [pagination])

  return (
    <MaterialReactTable table={table} /> //other more lightweight MRT sub components also available
  );
}