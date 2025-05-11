import React, {useRef, useState} from "react";
import "../style/layout/PopupEditPlaylist.css"
import {Button, TextField} from "@mui/material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import ThemeForm from "../global/ThemeForm.js";
import {ThemeProvider} from "@mui/material/styles";

const PopupEditPlaylist = (props) => {
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const fileInputRef = useRef(null);
  const [currentlyEdited, setCurrentlyEdited] = useState(() => {
    return props.playlists.find(playlist => playlist.id === props.currentPlaylist)
  });
  // description, name se ukldájí rovnou do currentlyEdited, image ne
  const [previewImageUrl, setPreviewImageUrl] = useState(currentlyEdited.image);
  const [previewImage, setPreviewImage] = useState(null);

  const TemporarySaveName = (e) => {
    const newName = e.target.value.trim();
    const duplicate = props.playlists.some(
      playlist =>
        playlist.name === newName &&
        playlist.id !== currentlyEdited.id
    );

    if (newName === "") {
      setNameError("Název nesmí být prázdný.");
    } else if (duplicate) {
      setNameError("Název už existuje.");
    } else if (newName.length > 100){
      e.target.value = newName.slice(0, 100);
      setNameError("100/100");
    } else {
      setNameError("");
    }

    setCurrentlyEdited({...currentlyEdited, name: newName});
  };

  const TemporarySaveDescription = (e) => {
    const newValue = e.target.value;

    if (newValue.length > 500) {
      setDescriptionError("500/500")
      e.target.value = newValue.slice(0, 500);
    } else {
      setDescriptionError("");
    }

    setCurrentlyEdited({...currentlyEdited, description: newValue})
  };

  const TemporarySaveImage = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setPreviewImage(newImage);
      const imageURL = URL.createObjectURL(newImage);
      setPreviewImageUrl(imageURL);
    }
    //setCurrentlyEdited({...currentlyEdited, image: e.target.value})
  };

  const SaveChanges = async () => {

    if (previewImage) {
      const uploadedUrl = await uploadImage(previewImage);

      if (uploadedUrl) {
        // Kvůli tomu ze se moje obrazky na backendu jmenuji podle id playlistu,
        // tak pokud se změní např. 0.jpg na 0.jpg, tak prohlížeč si myslí, že se nic
        // nezměnilo (ma obrazky stažene v cache), nebo by reagoval jen na zmenu pripon (png, jpg)
        // reseni je tam pridat casovou neskodnou znacku, ktera vzdy zajisti nove stazeni obrazku
        const cacheBustedUrl = uploadedUrl + "?t=" + Date.now();
        currentlyEdited.image = cacheBustedUrl;
      } else {
        alert("Unable to upload image.");
        return;
      }
    }

    props.setPlaylists(
      props.playlists.map(playlist =>
        playlist.id === currentlyEdited.id ? currentlyEdited : playlist
      )
    );

    props.setShownPopupMenu(null);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("playlistId", currentlyEdited.id);

    try {
      const response = await fetch("http://localhost/uploadImage.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      return result.imageUrl; // např. "http://localhost/images/xyz.jpg"
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };


  return (
    <>
      <div
        id={'popup-menu-background'}
        onClick={() => props.setShownPopupMenu(null)}
      ></div>

      <div id={'popup-menu-content'} className="mui-like-border">
        <ThemeProvider theme={ThemeForm}>
          <div id={'edit-playlist-popup-container'}>

            <div id={'edit-playlist-popup-image'}>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{display: 'none'}}
                ref={fileInputRef}
                onChange={TemporarySaveImage}
              />
              <div
                id={'edit-playlist-popup-image-clickable'}
              >
                <img
                  src={previewImageUrl}
                  alt={"Image preview"}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover"
                  }}
                  onClick={handleImageClick}
                />
              </div>
            </div>

            <TextField
              id="edit-playlist-popup-name"
              label="Playlist name"
              variant="outlined"
              defaultValue={currentlyEdited.name}
              onChange={(e) => TemporarySaveName(e)}
              helperText={nameError !== "" ? nameError : ""}
              error={nameError !== ""}
            />
            <TextField
              id="edit-playlist-popup-description"
              label="Optional description"
              variant="outlined"
              defaultValue={currentlyEdited.description}
              multiline
              rows={9}
              onChange={(e) => TemporarySaveDescription(e)}
              helperText={descriptionError !== "" ? descriptionError : ""}
              error={descriptionError !== ""}
            />
            <div
              id="edit-playlist-popup-button"
            >
              <Button
                variant="filled"
                startIcon={<CancelIcon />}
                onClick={() => props.setShownPopupMenu(null)}
                sx={{ width: '120px' }}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                startIcon={<CheckBoxIcon />}
                onClick={() => SaveChanges()}
                disabled={!!nameError || !!descriptionError || currentlyEdited.name.trim() === ""}
                sx={{ width: '120px' }}
              >
                Save
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  )
}

export default PopupEditPlaylist;