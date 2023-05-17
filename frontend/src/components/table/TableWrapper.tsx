import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { StringCellRenderer } from './TableCellRenderer';
export interface TableHeaderProps {
    label: string;
    dataKey: string;
    mediaType?: "mobile" | "tablet" | "desktop" | "hd";
    renderer?: React.FC<any>;
};

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

    return (
        <>
            {data.length === 0
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
                                        mediaType={header.mediaType}
                                    />
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((row, index) => (
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
        </>
    );
};

export default TableWrapper;
