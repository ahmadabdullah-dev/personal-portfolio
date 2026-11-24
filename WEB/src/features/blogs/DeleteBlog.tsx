import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useDeleteBlog } from "../../lib/hooks/useBlogs";

type Props = {
  id: string;
  title?: string; 
};

export default function DeleteBlog({ id, title }: Props) {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteBlog();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false);
        navigate("/blogs", { replace: true });
      },
      onError: (err) => {
        setOpen(false);
        setError(err.message || "Failed to delete blog");
      },
    });
  };

  return (
    <>
      <Button color="error" variant="outlined" onClick={() => setOpen(true)}>
        Delete blog
      </Button>

      <Dialog open={open} onClose={() => !isPending && setOpen(false)}>
        <DialogTitle>Delete blog?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {title ? `"${title}" will be permanently deleted. ` : ""}
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={isPending}
            startIcon={
              isPending && <CircularProgress size={16} color="inherit" />
            }
          >
            {isPending ? "Deleting" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {error ? (
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        ) : undefined}
      </Snackbar>
    </>
  );
}
