import { Box, BoxProps } from "@mui/material";

const FlexBox: React.FC<BoxProps> = (props) => (
    <Box display='flex' justifyContent='center' {...props}>{props.children}</Box>
);

export default FlexBox;