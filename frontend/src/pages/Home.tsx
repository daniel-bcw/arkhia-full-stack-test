import { useState, useEffect } from 'react';
import { Box } from "@mui/material";

import * as CoinApi from 'api/coin-api';
import TableWrapper, { TableHeaderProps } from 'components/table/TableWrapper';
import { IconCellRenderer, UrlCellRenderer } from 'components/table/TableCellRenderer';

const FlexBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box display='flex' justifyContent='center'>{children}</Box>
);

function Home() {
    const [coins, setCoins] = useState<CoinApi.ICoinModel[]>([]);
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
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
        // eslint-disable-next-line
    }, []);

    const headers: TableHeaderProps[] = [
        { label: 'Rank', dataKey: 'rank' },
        { label: 'Name', dataKey: 'coin', renderer: IconCellRenderer },
        { label: 'Price', dataKey: 'price' },
        { label: 'Volume', dataKey: 'volume' },
        { label: 'MarketCap', dataKey: 'marketCap' },
        { label: 'URLs', dataKey: 'urls', renderer: UrlCellRenderer },
        { label: 'Exchange', dataKey: 'exchange'},
    ];

    return (
        <div id='app' className='content'>
            <FlexBox>
                <img src='/logo_BCW.png' alt='logo' />
            </FlexBox>
            <div id='actions' className='actions'>

            </div>
            <TableWrapper
                headers={headers}
                data={coins}
            />
        </div>
    );
}

export default Home;
