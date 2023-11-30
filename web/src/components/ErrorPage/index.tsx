import { useRouteError } from "react-router-dom";
import {Box, Typography} from "@mui/material";
import React from "react";

const ErrorPage: React.FC = () => {
    const error: any = useRouteError();

    return (
        <Box
            className="error-page"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            flexDirection="column"
        >
            <Typography variant="h3" align="center" gutterBottom>Ooops!</Typography>
            <Typography variant="h6" gutterBottom>Something went wrong.</Typography>
            <Typography variant="subtitle1">{error.statusText || error.message}</Typography>
        </Box>
    );
}

export default ErrorPage;