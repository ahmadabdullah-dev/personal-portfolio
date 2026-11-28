import { Box, Container, Stack, Typography } from "@mui/material";
import Contacts from "../contact/Contacts";
import IsDbConnected from "../system/IsDbConnected";
import LogoutButton from "../auth/Logout";
import AddSkill from "../skills/AddSkills";
import DeleteSkill from "../skills/DeleteSkill";
import AddBlogForm from "../blogs/AddBlogForm";
import AddTranslationForm from "../translation/AddTranslation";

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
          <LogoutButton/>
        </Stack>
      </Container>

      <Contacts />
      <AddSkill/>
      <DeleteSkill/>
      <AddBlogForm/>
      <AddTranslationForm/>
    </Box>
  );
}
