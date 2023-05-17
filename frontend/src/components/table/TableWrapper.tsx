import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { StringCellRenderer } from './TableCellRenderer';
export interface TableHeaderProps {
    label: string;
    dataKey: string;
    mediaType?: "mobile" | "tablet" | "desktop" | "hd";
    renderer?: React.FC<any>;
};

const itemsPerPageOptions = [5, 10, 25];

/**
 * This component is a Material UI table wrapper supporting renderer pattern and
 * const headers: TableHeaderProps[] = [
 *     {
 *          label: 'Name',
 *          dataKey: 'name'
 *     },
 *     {
 *          label: 'Price in USD',
 *          dataKey: 'price'
 *     }
 * ];
 * const data = [{
 *      name: 'Coin',
 *      price: 15,
 * }];
 * 
 * <TableWrapper 
 *     headers={headers}
 *     data={data}
 * >
 *              
 * @param headers An array of table header
 * @param data An array of data to be displayed.
 */
interface TableWrapperProps {
    headers: TableHeaderProps[];
    data: any[];
};
const TableWrapper: React.FC<TableWrapperProps> = ({ headers, data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[0]);
    const [visibleRows, setVisibleRows] = useState<any[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setVisibleRows(data.slice(
            page * rowsPerPage,
            (page + 1) * rowsPerPage
        ));
    }, [page, rowsPerPage, data]);

    return (
        <Box>
            {visibleRows.length === 0
                ? <Box display='flex' justifyContent='center'>
                    No Item to display
                </Box>
                : <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) =>
                                    <StringCellRenderer
                                        key={header.dataKey}
                                        value={header.label}
                                    />
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow key={index}>
                                    {headers.map((header) => {
                                        const value = row[header.dataKey];
                                        const CellRenderer = (header.renderer || StringCellRenderer) as unknown as React.FC<any>;

                                        return (
                                            <CellRenderer
                                                key={header.dataKey}
                                                value={value}
                                                mediaType={header.mediaType}
                                            />
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            <TablePagination
                rowsPerPageOptions={itemsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Box>
    );
};

export default TableWrapper;
