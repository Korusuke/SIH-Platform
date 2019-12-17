import React, { useEffect } from "react";

import {
    Snackbar,
    SnackbarContent,
    IconButton,
    CheckCircleIcon,
    CloseIcon,
    ErrorIcon,
    InfoWrapper
} from "./style";

function SimpleSnackbar({ type, msg }) {
    const [open, setOpen] = React.useState(true);
    useEffect(
        () => {
            setOpen(true);
        },
        [status]
    );

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            type={status}
            style={type === 'success' ?
                { backgroundColor: 'green' } :
                { backgroundColor: 'red'}
            }
        >
            <SnackbarContent
                type={status}
                style={type === 'success' ?
                    { backgroundColor: 'green' } :
                    { backgroundColor: 'red' }
                }
                contentprops={{
                    "aria-describedby": "message-id"
                }}
                // prettier-ignore
                message={(
                    <InfoWrapper id='message-id'>
                        {type === 'success' ?
                            <CheckCircleIcon /> :
                            <ErrorIcon />
                        }
                        {msg}
                    </InfoWrapper>
                )}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}
export default SimpleSnackbar;
