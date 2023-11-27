// @mui
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
// utils
import { fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { TableHeadCustom } from 'src/components/table';
import { Skeleton } from '@mui/material';
import _ from 'lodash';

// ----------------------------------------------------------------------

type RowProps = {
  username: string;
  wallet_address: string;
  hash: string;
  type: string;
  amount: number;
  token: string;
  timestamp: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: Array<any>;
  tableLabels: Array<any>;
  transactionsLoading: boolean;
}

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  transactionsLoading,
  ...other
}: Props) {
  console.log(tableData);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels as any[]} />
            {transactionsLoading ? (
              <TableBody>
                {[...Array(3)].map((array, i) => (
                  <TableRow>
                    {[...Array(7)].map((array1, j) => (
                      <TableCell>
                        <Skeleton variant="rectangular" animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {tableData.map((row: any) => (
                  <AppNewInvoiceRow row={row} />
                ))}
              </TableBody>
            )}
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

// type AppNewInvoiceRowProps = {
//   row: RowProps;
// };

interface NewProps {
  row: Array<any>;
}

function AppNewInvoiceRow(props: NewProps) {
  const { row } = props;
  const popover = usePopover();

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row[0]);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row[0]);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row[0]);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row[0]);
  };

  return (
    <>
      <TableRow>
        <TableCell>{row[0]}</TableCell>
        <TableCell>{row[1]}</TableCell>
        <TableCell>{row[2]}</TableCell>
        <TableCell>{row[3]}</TableCell>
        <TableCell>{row[4]}</TableCell>
        <TableCell>{row[5]}</TableCell>
        <TableCell>{row[6]}</TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
