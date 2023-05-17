import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    TablePagination,
    CircularProgress
} from '@mui/material';

import * as CoinApi from 'api/coin-api';
import { FlexBox, IconCellRenderer, UrlCellRenderer } from 'components';
import TableWrapper, { TableHeaderProps } from 'components/table/TableWrapper';

const itemsPerPageOptions = [5, 10];
const currencies = ["USD", "HKD", "SGD", "KRW"];

const headers: TableHeaderProps[] = [
    { label: 'Rank', dataKey: 'rank' },
    { label: 'Name', dataKey: 'coin', renderer: IconCellRenderer },
    { label: 'Price', dataKey: 'price', mediaType: 'tablet'},
    { label: 'Volume', dataKey: 'volume', mediaType: 'desktop' },
    { label: 'MarketCap', dataKey: 'marketCap', mediaType: 'hd' },
    { label: 'Total Supply', dataKey: 'totalSupply', mediaType: 'hd' },
    { label: 'URLs', dataKey: 'urls', renderer: UrlCellRenderer, mediaType: 'mobile' },
    { label: 'Exchange', dataKey: 'exchange' },
];

function Home() {
    const [isLoading, setLoading] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [coins, setCoins] = useState<CoinApi.ICoinModel[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPageOptions[0]);
    const [visibleRows, setVisibleRows] = useState<any[]>([]);
    
    useEffect(() => {
        setPage(0);
    }, [coins]);

    const getCoinsQuery = () => {
        setLoading(true);
        CoinApi.getCoins(currency).then((data: CoinApi.ICoinModel[]) => {
            const transform = (_data: CoinApi.ICoinModel[]) => _data.map((coin: CoinApi.ICoinModel) => {
                return {
                    ...coin,
                    coin: {
                        name: coin.name,
                        icon: coin.icon,
                        symbol: coin.symbol,
                    },
                    urls: [
                        coin.websiteUrl,
                        coin.twitterUrl,
                    ]
                };
            });

            setLoading(false);
            setCoins(transform(data));
        });
    }

    useEffect(() => {
        getCoinsQuery();
        // eslint-disable-next-line
    }, [currency]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const updateExchange = async () => {
            const rows = coins.slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
            );
    
            // Query Exchange
            for (let i = 0; i < rows.length; i++) {
                const exchange = await CoinApi.getExchange(currency, rows[i].id);
                rows[i].exchange = exchange;
            }

            // Set Visible Data on Table
            setVisibleRows(rows);
            setLoading(false);
        }

        setLoading(true);
        updateExchange();
    }, [page, rowsPerPage, coins]);

    const handleCurrencyChange = (e: SelectChangeEvent) => {
        setCurrency(e.target.value);
    }

    const handleSortbyName = () => {
        const sortedCoins = coins.sort((a, b) => a.id.localeCompare(b.id));
        setCoins([...sortedCoins]);
    }

    const handleSortbyRank = () => {
        const sortedCoins = coins.sort((a, b) => (a.rank - b.rank));
        setCoins([...sortedCoins]);
    }

    return (
        <div id='app' className='content'>
            <FlexBox>
                <img src='/logo_BCW.png' width='640px' alt='logo' />
            </FlexBox>

            <FlexBox gap='10px'>
                <FormControl fullWidth>
                    <InputLabel id="currency-select-label">Currency</InputLabel>
                    <Select
                        labelId="currency-select-label"
                        id="currency-select"
                        value={currency}
                        label="Currency"
                        onChange={handleCurrencyChange}
                    >
                        {currencies.map(_currency => (
                            <MenuItem key={_currency} value={_currency}>
                                {_currency}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSortbyName}>
                    Sort by Name
                </Button>
                <Button onClick={handleSortbyRank}>
                    Sort by Rank
                </Button>
            </FlexBox>

            {isLoading
                ? <FlexBox> <CircularProgress /> </FlexBox>
                : <Box>
                    <TableWrapper
                        headers={headers}
                        data={visibleRows}
                    />
                    <TablePagination
                        rowsPerPageOptions={itemsPerPageOptions}
                        component="div"
                        count={coins.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            }
        </div>
    );
}

export default Home;
