import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import PhotosCarousel from "./Carousel";
import "./SimpleDialog.scss";
export default function SimpleDialog(props) {
  const { onClose, currentPhoto, open, photos } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} className="Dialog">
      <Typography variant="h6" className="Typography">
        الصور
        <IconButton
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      </Typography>


      <DialogContent>
        <PhotosCarousel photos={photos} currentPhoto={currentPhoto} />
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  currentPhoto: PropTypes.object,
  photos: PropTypes.array,
};
