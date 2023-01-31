import React, { useCallback, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useEffect } from 'react';

import axios from '../../utils/axios';
import { discussionRoute } from '../../utils/ApiRoutes';
import { AddNewModal } from '../components/AddNewModal';
import ConfirmDelete from '../components/ConfirmDelete';

const Discussion = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

 const [openConfirm, setOpenConfirm] = useState(false);
 const [confirmDeleteRow, setConfirmDeleteRow] = useState(false);
  const handleCreateNewRow = async(values) => {
    values.type = 'room';
   await axios.post(discussionRoute, values).then((res) => {
      console.log(res);
      tableData.push(values);
      setTableData([...tableData]);
    }).catch((err) => {
      console.log(err);
    }
    );
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;

      //send/receive api updates here, then refetch or update local table data for re-render
      await axios.patch(discussionRoute + '/' + row.getValue('id'), values).then((res) => {
        console.log(res);

      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
      }).catch((err) => {
        console.log(err);
      }
      );
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDeleteRow(true);
  };
  const handleCloseDelete = () => {
    setOpenConfirm(false);
  };
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      // return <ConfirmDelete open={openConfirm} handleClose={handleCloseDelete} handleConfirm={handleConfirmDelete} title={row.getValue("name")}/>
      axios.delete(discussionRoute + '/' + row.getValue('id')).then((res) => {
        console.log(res);
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      }).catch((err) => {
        console.log(err);
      });

      
    },
    [tableData],
  );

  // useEffect(() => {
  //   if(confirmDeleteRow){
  //     //send api delete request here, then refetch or update local table data for re-render
  //     axios.delete(discussionRoute + '/' + row.getValue('id')).then((res) => {
  //       console.log(res);
  //     tableData.splice(row.index, 1);
  //     setTableData([...tableData]);
  //     }).catch((err) => {
  //       console.log(err);
  //     });

  //     }
  // }, [confirmDeleteRow]);

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          },
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableEditing: false, 
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'capacity',
        header: 'Capacity',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'currentParticipants',
        header: 'Current Participants',
        enableEditing: false, 
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'createdBy',
        header: 'Created By',
        enableEditing: false, 
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        enableEditing: false, 
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  const createFormFields = columns.filter((column) =>  column.accessorKey === 'name' || column.accessorKey === 'capacity' );


  useEffect(() => {
    console.log('useEffect');
    const fetchData = async () => {
console.log('fetchData');
      const response = await axios.get(discussionRoute);
      if (response.status !== 200) {
        console.log('error');
        return;
      }
      const data = await response.data;
      setTableData(data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Discussion
          </Button>
        )}
      />
      <AddNewModal
        columns={createFormFields}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};


export default Discussion;
