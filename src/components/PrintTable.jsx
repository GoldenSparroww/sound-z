import {Box, IconButton, ListItemText, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import * as React from "react";
import CenterBox from "./CenterBox.jsx";
import LayersIcon from "@mui/icons-material/Layers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PrintTable = (props) => {
  const columns = [
    {
      /* NUMBER LINE */
      //tenhle atribut je mapovany pri kazdem vypisu zavisle na poctu dat
      field: 'index',
      headerName: "#",
      width: 50,
      sortable: false,
      filterable: false,
      resizable: false,
      type: "number",
    },
    {
      /* IMAGE */
      field: 'O',
      headerName: '',
      sortable: false,
      filterable: false,
      resizable: false,
      width: 50,
      renderCell: (params) => (
        <CenterBox>
          <img
            src={`http://localhost/music/images/${params.row.image}`}
            alt={params.row.name}
            style={{
              width: '40px',
              height: '40px',
            }}
          />
        </CenterBox>
      ),
    },
    {
      /* NAME (ARTIST, GENRE) */
      field: 'name',
      headerName: 'Název',
      sortable: false,
      filterable: false,
      resizable: false,
      flex: 1,
      renderCell: (params) => (
        <CenterBox>
          <ListItemText
            primary={params.row.name}
            secondary={`${props.showArtist ? params.row.artist : ''} ${props.showArtist && props.showGenre ? '•' : '' } ${props.showGenre ? params.row.genre : ''}`} />
        </CenterBox>
      )
    },
    {
      /* QUEUE ICON */
      field: 'queue',
      headerName: '',
      sortable: false,
      filterable: false,
      resizable: false,
      width: 30,
      renderCell: (params) => (
        <CenterBox>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              props.AddImmediateFollowingTracks(params.row);
              props.HandleActionPopup("Přidáno do fronty.");
            }}>
            <LayersIcon />
          </IconButton>
        </CenterBox>
      ),
    },
    {
      /* FAVOURITE ICON */
      field: 'favourite',
      headerName: '',
      sortable: false,
      filterable: false,
      resizable: false,
      width: 50,
      renderCell: (params) => (
        <CenterBox>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              if (props.favouriteTracks.includes(params.row)) {
                props.FavouritesRemove(params.row);
                props.HandleActionPopup("Odebráno z oblíbených.");
              } else {
                props.FavouritesAdd(params.row);
                props.HandleActionPopup("Přidáno do oblíbených.");
              }
            }}>
            {props.favouriteTracks.includes(params.row) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CenterBox>
      ),
    },
    {
      /* DURATION */
      field: 'duration',
      headerName: 'Délka',
      sortable: false,
      filterable: false,
      resizable: false,
      width: 100,
    },
  ];

  const filteredSongs = props.allSongs.filter(song => {
    return (props.whatToFilter !== null ? song[props.whatToFilter] : true) ===
      (props.filter !== null ? props.filter : true);
  });

  const rows = filteredSongs.map((song, idx) => ({
    ...song,
    index: idx + 1,
  }))

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{
          /*-----------------------------*/
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-menuIconButton": {
            color: "red",
          },
        }}
        rows={rows}
        columns={columns}
        disableColumnMenu
        hideFooter={true}
        onRowClick={(params) => {
          const song = params.row;
          props.setCurrent(song);
          props.ChangeActiveList(
            params.row.index,
            filteredSongs
          );
        }}

        getRowClassName={(params) =>
          props.current.url === params.row.url ? 'Mui-selected' : ''
        }
      />
    </Box>
  );
}

export default PrintTable;