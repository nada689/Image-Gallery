import { useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from "./createForm"
import PropTypes from "prop-types";
export default function Create(props) {
    const { Get_data } = props;
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Gallery
          </Typography>
          <Button color="inherit"onClick={() => {
                handleClickOpen();
              }}><AddIcon/></Button>
        </Toolbar>
      </AppBar>
      <CreateForm
        open={open}
        onClose={handleClose}
        Get_data={Get_data}
      />
    </Box>
  );
  
}
Create.propTypes = {
    Get_data:PropTypes.func.isRequired,
  };

