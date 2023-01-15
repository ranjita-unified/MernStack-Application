import { Box, CircularProgress } from '@mui/material';

const LoadingOverlay = ({isLoading}) => {
    return (
        <>
        {isLoading && <Box sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content', position: 'relative', left: '40%', padding: '20px 0 20px 10px', top: '50px','minHeight': '50vh' }}>
        <CircularProgress />
        Loading.....
        </Box>}
        </>
    )
}

export default LoadingOverlay