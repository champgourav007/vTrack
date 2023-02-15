import CircularProgress from "@mui/material/CircularProgress";

export default function TableLoader() {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
    </div>
  );
}