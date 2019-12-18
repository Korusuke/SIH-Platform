import styled from "styled-components";
import SnackbarBase from "@material-ui/core/Snackbar";
import SnackbarContentBase from "@material-ui/core/SnackbarContent";
import IconButtonBase from "@material-ui/core/IconButton";
import ErrorIconBase from "@material-ui/icons/Error";
import CheckCircleIconBase from "@material-ui/icons/CheckCircle";
import CloseIconBase from "@material-ui/icons/Close";

export const Snackbar = styled(SnackbarBase)`
  /* >>> */
`;
export const SnackbarContent = styled(SnackbarContentBase)`
  /* >>> */
  && {
    background: ${props =>
        props.status === "success" ? props.theme.success : props.theme.error};
    padding: 0 0.5rem;
  }
`;
export const IconButton = styled(IconButtonBase)`
  /* >>> */
`;
export const ErrorIcon = styled(ErrorIconBase)`
  /* >>> */
  margin: 0.6rem;
`;
export const CheckCircleIcon = styled(CheckCircleIconBase)`
  /* >>> */
  margin: 0.6rem;
`;
export const InfoWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export const CloseIcon = styled(CloseIconBase)`
  padding: 2px;
`;
