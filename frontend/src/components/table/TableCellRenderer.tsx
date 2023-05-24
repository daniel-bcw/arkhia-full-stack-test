import {
    Box,
    TableCell,
    Typography,
} from "@mui/material";

import './style.css';

interface DefaultCellRendererProps {
    value: string;
    mediaType?: string;
};

/**
 * This component is just a table cell wrapper
 * Example: 
 * <BasicCellRenderer mediaType="mobile">
 *     <Typography>
 *         This can be hidden.
 *     </Typography>
 * </TableBody>
 *              
 * @param children Components to be rendered inside
 * @param mediaType A string to indicate when it should be hidden when resizing
 * @returns A cell renderer component
 */

interface BasicCellRendererProps {
    children: React.ReactNode;
    mediaType?: string;
};
export const BasicCellRenderer: React.FC<BasicCellRendererProps> = ({ children, mediaType }) => {
    return (
        <TableCell className="mobile" media-type={mediaType}>
            {children}
        </TableCell>
    );
};


/**
 * This component returns a simple Typography react element to be used inside TableWrapper.
 * Example: 
 * <TableBody>
 *     <TableRow>
 *         <StringCellRenderer value="HelloWorld" />
 *     </TableRow>
 * </TableBody>
 *              
 * @param value A string value to be rendered 
 * @returns A string cell React element.
 */
export const StringCellRenderer: React.FC<DefaultCellRendererProps> = ({ value, mediaType }) => {
    return (
        <BasicCellRenderer mediaType={mediaType}>
            <Typography color="textSecondary" variant="body2">
                {value?.toString() || ""}
            </Typography>
        </BasicCellRenderer>
    );
};

/**
 * This component returns a CoinIcon react element to be used inside TableWrapper.
 * Example: 
 * <TableBody>
 *     <TableRow>
 *         <CoinCellRenderer value="HelloWorld" />
 *     </TableRow>
 * </TableBody>
 *              
 * @param icon A string value to be rendered 
 * @param name A string value to be rendered 
 * @param symbol A string value to be rendered 
 * @returns A react element with an icon, coin name and coin symbol.
 */
interface IconCellRendererProps {
    value: {
        icon: string,
        name: string,
        symbol: string,
    };
    mediaType?: string;
};
export const IconCellRenderer: React.FC<IconCellRendererProps> = ({ value, mediaType }) => {
    return (
        <BasicCellRenderer mediaType={mediaType}>
            <Box display='flex' gap='10px' alignItems='center'>
                <img src={value.icon} alt='coin-icon' width='48px' height='48px' />
                <Box display='flex' flexDirection='column'>
                    <Typography variant='body1'>{value.name}</Typography>
                    <Typography variant='body2'>{value.symbol}</Typography>
                </Box>
            </Box>
        </BasicCellRenderer>
    );
};

/**
 * This component returns a CoinIcon react element to be used inside TableWrapper.
 * Example: 
 * <TableBody>
 *     <TableRow>
 *         <UrlCellRenderer value={["HelloWorld"]} />
 *     </TableRow>
 * </TableBody>
 *              
 * @param value An array of URLs
 * @returns A react element with an icon, coin name and coin symbol.
 */
interface UrlCellRendererProps {
    value: string[];
    mediaType?: string;
};
export const UrlCellRenderer: React.FC<UrlCellRendererProps> = ({ value, mediaType }) => {
    return (
        <BasicCellRenderer mediaType={mediaType}>
            <Box display='flex' flexDirection='column'>
                {value.map((url: string, index: number) => (
                    <Typography key={url || "" + index}>
                        <a href={url} target="#">{url}</a>
                    </Typography>)
                )}
            </Box>
        </BasicCellRenderer>
    );
};
