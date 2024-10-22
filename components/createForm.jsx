import { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; // Import Firebase Storage methods
import { addDoc, collection, updateDoc, Timestamp } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Firebase"; // Adjust import based on your file structure

export default function CreateForm(props) {
  const { onClose, open,Get_data } = props;

  const handleClose = () => {
    onClose();
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  // Upload an image to Firebase Storage
  const upload_Image = async (file) => {
    try {
      const random = Math.random();
      const storage = getStorage();
      const storageReference = storageRef(storage, "/images" + random);
      const snapshot = await uploadBytes(storageReference, file);

      console.log("Uploaded a blob or file!", snapshot);
      return getDownloadURL(snapshot.ref); // Return file download URL
    } catch (err) {
      console.error(err);
    }
  };

  // Add photo to Firestore
  const Add_Photos = async (photo) => {
    try {
      if (photo.image) {
        const imageUrl = await upload_Image(photo.image);
        const currentTime = Timestamp.now();
        const docRef = await addDoc(collection(db, "Photos"), {
          time: currentTime,
          image: imageUrl,
        });

        // Update document with its own ID
        await updateDoc(docRef, { id: docRef.id });
        console.log("Document written with ID: ", docRef.id);
        Get_data();
      } else {
        console.error("No file selected.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const photo = {
        image: selectedFile,
      };
      await Add_Photos(photo); // Call the Add_Photos function directly
      onClose(); // Close the form dialog
      setSelectedFile(null); // Reset the selected file
    } else {
      alert("Please select a file to upload.");
    }
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
    <form onSubmit={handleSubmit}>
      <input accept="image/*" type="file" onChange={handleFileChange} />
      <Button type="submit" color="primary">
        Upload
      </Button>
    </form>
    </DialogContent>
  </Dialog>

  );
}

CreateForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  Get_data:PropTypes.func.isRequired,
};

