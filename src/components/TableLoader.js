import { LinearProgress } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

export default function TableLoader() {
  return (
    // <div style={{display: 'flex', justifyContent: 'center'}}>
    //     <CircularProgress />
    // </div>
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}