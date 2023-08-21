import React from "react";
import {bool, func } from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const CardDeleteDialog = ({isDialogOpen, onDelete , onChangeDialog}) => {


    return (
        < Dialog 
        open = {isDialogOpen}
        onClose ={onChangeDialog}
        aria-labelledby = "alert-dialog-title"
       aria-describedby="alert-dialog-description"
       maxWidth = "xs">

        <DialogTitle  id = "alert-dialog-title">
        {"Are you sure you want to delete this card?"}
        </DialogTitle>
       <DialogContent>
        <DialogContentText  id = "alert-dialog-description" >
           if you delete this profil they will not back
        </DialogContentText>
        </DialogContent>
        <DialogActions>
    <Button  onClick={onChangeDialog} color="error">
    cancel
    </Button>
    <Button  onClick={onDelete} autoFocus color="info">
    Delete profil
    </Button>
    </DialogActions>

    </Dialog>


    ) ;
    };

   CardDeleteDialog.prototype = {
        isDialogOpen: bool.isRequired,
        onChangeDialog : func.isRequired,
        onDelete: func.isRequired
    
};

    export default CardDeleteDialog;