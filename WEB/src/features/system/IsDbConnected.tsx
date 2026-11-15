import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useGetIsDbConnected } from "../../lib/hooks/system";

export default function IsDbConnected() {
  const { data, isLoading, isError, refetch, isFetching } = useGetIsDbConnected();

if (isLoading) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={18} />
      <Typography variant="body2">Checking database connection...</Typography>
    </Box>
  );
}

  if (isError) {
    return (
      <Alert
        severity="error"
        variant="outlined"
        action={
          <Button
            color="inherit"
            size="small"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        }
      >
        Failed to load db connection.
      </Alert>
    );
  }

  if (data === undefined || data === null) {
    return (
      <Alert severity="info" variant="outlined">
        No data found.
      </Alert>
    );
  }

  return (
    <Alert
      severity={data ? "success" : "error"}
      variant="outlined"
      action={
        <Button
          color="inherit"
          size="small"
          disabled={isFetching}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      }
    >
      {data ? "Database is connected." : "Database is not connected."}
    </Alert>
  );
}
