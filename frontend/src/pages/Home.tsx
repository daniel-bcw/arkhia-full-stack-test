import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

import * as CoinApi from 'api/coin-api';
import { FlexBox, IconCellRenderer, UrlCellRenderer } from 'components';
import TableWrapper, { TableHeaderProps } from 'components/table/TableWrapper';

const headers: TableHeaderProps[] = [
    { label: 'Rank', dataKey: 'rank' },
    { label: 'Name', dataKey: 'coin', renderer: IconCellRenderer },
    { label: 'Price', dataKey: 'price' },
    { label: 'Volume', dataKey: 'volume' },
    { label: 'MarketCap', dataKey: 'marketCap' },
    { label: 'URLs', dataKey: 'urls', renderer: UrlCellRenderer },
    { label: 'Exchange', dataKey: 'exchange' },
];

const currencies = ["USD", "HKD", "SGD", "KRW"];

function Home() {
    const [coins, setCoins] = useState<CoinApi.ICoinModel[]>([]);
    const [currency, setCurrency] = useState('USD');

    const getCoinsQuery = () => {
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

            setCoins(transform(data));
        });
    }
    
    useEffect(() => {
        getCoinsQuery();
        // eslint-disable-next-line
    }, [currency]);

    useEffect(() => {
        console.log("Coins Updated");
        // eslint-disable-next-line
    }, [coins]);

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
                <img src='/logo_BCW.png' alt='logo' />
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

            <TableWrapper
                headers={headers}
                data={coins}
            />
        </div>
    );
}

export default Home;
