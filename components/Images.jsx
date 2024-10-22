import { useState, useEffect } from "react";
import { db } from "../Firebase";
import "./Images.scss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";
import SimpleDialog from "./SimpleDialog";
import Create from "./Create"
export default function Images() {
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [photoInfo, setPhotoInfo] = useState({
    Photo_Information: null,
    Id_Information: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Fetch all photos on component mount
  useEffect(() => {
    Get_data();
  }, []);
  // Function to update photo information when an image is clicked
  const photo_Information = (photo) => {
    setPhotoInfo({
      Photo_Information: photo.image,
      Id_Information: photo.id,
    });
    console.log("Selected Photo ID:", photo.id);
  };

  return (
    <>
    <Create Get_data={Get_data}/>
      <div className="box">
        {photos.map((photo) => (
          <div className="imgContainer" key={photo.id}>
            <img
              src={photo.image}
              alt="photo"
              className="img"
              loading="lazy"
              onClick={() => {
                handleClickOpen();
                photo_Information(photo);
              }}
            />
            <div className="caption">
              <div>
                <AccessTimeIcon />
                {photo.time.toDate().toLocaleString()}
              </div>
              <DeleteOutlineIcon className="delete"
                onClick={() => delete_photo(photo.id, photo.image)}
              ></DeleteOutlineIcon>
            </div>
          </div>
        ))}
      </div>
      <SimpleDialog
        currentPhoto={photoInfo}
        open={open}
        onClose={handleClose}
        photos={photos}
      />
    </>
  );


  // Fetch all photos from Firestore
  async function Get_data() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Photos"), orderBy("time", "desc"))
      );
      const photoArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPhotos(photoArray);
      console.log("Fetched Photos: ", photoArray);
    } catch (error) {
      console.error(error);
    }
  }

  // Delete photo from Firestore and Firebase Storage
  async function delete_photo(photoId, image) {
    try {
      console.log("Deleting Photo from Firestore:", photoId);

      // Delete the document from Firestore
      await deleteDoc(doc(db, "Photos", photoId));

      // Delete the image from Firebase Storage
      const storage = getStorage();
      const desertRef = storageRef(storage, image);
      await deleteObject(desertRef);

      console.log("Photo deleted successfully.");
      setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error(error);
    }
  }
}
