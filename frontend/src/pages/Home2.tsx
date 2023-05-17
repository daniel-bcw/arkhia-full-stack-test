import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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

    const getCoinsQuery = (sortBy?: string) => {
        CoinApi.getCoinsExchange(currency, sortBy).then((data: CoinApi.ICoinModel[]) => {
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

    const handleCurrencyChange = (e: {target: any}) => {
        setCurrency(e.target.value);
    }

    const handleSortbyName = () => {
        getCoinsQuery('name');
    }

    const handleSortbyRank = () => {
        getCoinsQuery('rank');
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
