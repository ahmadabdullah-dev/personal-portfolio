import { Box, Container, Stack, Typography } from "@mui/material";
import Contacts from "../contact/Contacts";
import IsDbConnected from "../system/IsDbConnected";

export default function AdminDashboard() {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin dashboard
          </Typography>
          <IsDbConnected />
        </Stack>
      </Container>

      <Contacts />
    </Box>
  );
}
