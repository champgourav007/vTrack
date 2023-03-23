import { CircularProgress } from "@mui/material";

export default function CircularLoader(){
  return(
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
    </div>
  )
}