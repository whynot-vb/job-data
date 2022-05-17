import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

export default function AlertToDisplay() {
  const alertType = useSelector((state) => state.jobs.alertType);
  const alertText = useSelector((state) => state.jobs.alertText);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={alertType}>
        <AlertTitle>{alertType}</AlertTitle>
        {alertText} — <strong>check it out!</strong>
      </Alert>

      {/* <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
    </Stack>
  );
}
