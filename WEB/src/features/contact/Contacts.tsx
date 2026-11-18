import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import type { PaginationParams } from "../../lib/types/common";
import { useGetAllContacts } from "../../lib/hooks/useContact";

export default function Contacts() {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 9,
  });
  const {
    data: list,
    isLoading,
    isError,
    error,
  } = useGetAllContacts(pagination);

  if (isLoading) {
    return (
      <Container sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !list) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" variant="outlined">
          {error?.message ?? "Unable to load messages."}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
        Messages
      </Typography>

      {list.items.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No messages yet.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {list.items.map((c) => (
            <Grid
              key={`${c.email}-${c.sentAt}`}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  transition: "box-shadow .15s, border-color .15s",
                  "&:hover": { boxShadow: 3, borderColor: "primary.main" },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {c.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography noWrap sx={{ fontWeight: 600 }}>
                        {c.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {c.email}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{ mb: 2, whiteSpace: "pre-line" }}
                  >
                    {c.message}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {new Date(c.sentAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {list.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={list.totalPages}
            page={list.currentPage}
            onChange={(_, page) => setPagination((p) => ({ ...p, page }))}
            shape="rounded"
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
