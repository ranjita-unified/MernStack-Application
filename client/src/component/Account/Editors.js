import { 
  Table,
  TableBody,
  TableContainer,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Paper,
  styled
 } 
from '@mui/material';
import Alert from "react-bootstrap/Alert";

import Header from '../Common/Header';

import { useGetEditors } from '../../module/users/hooks';
import { IMAGE_URL } from '../../service/api';
import { ErrorCodes } from '../../enums';


const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  
  
const Editors = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const {data: editorData, isError,error, isSuccess } =  useGetEditors(accessToken);
  const rows = [];
  const editors = {};

  if(typeof editorData !== "undefined") {
    if(editorData.length>0) {
      editorData.forEach(function(user) {
        editors['name'] = user.name;
        editors['email'] = user.email; 
        editors['profileImage'] = user.profileImage; //profileImage
        rows.push(user)
      });
    }
  }
  
  if(isError) {
    if(error.status === 401) {
      sessionStorage.clear();
      window.location.href = '/';
    }
  }
  
  const errorCode = error?.status;
  const errorMessage = errorCode?ErrorCodes[errorCode]:ErrorCodes['default'];

    return (
        <>
          <Header/>
          <TableContainer component={Paper} style={{marginTop:'65px'}}>
          {isError && <Alert variant="danger">{errorMessage}</Alert>}
          {isSuccess && <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Profile Image</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 && rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      <img src={row.profileImage!==''?IMAGE_URL+row.profileImage:'./no-profile-image.png'} alt="BigCo Inc. logo" width={'80px'} height={'80px'}/>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                  </StyledTableRow>
                ))}
                {rows.length === 0 && <StyledTableRow>
                  <StyledTableCell colSpan={4}>
                      No Data Found
                  </StyledTableCell>
                </StyledTableRow> 
                } 
              </TableBody>
            </Table>} 
          </TableContainer>
        </>
      )
}

export default Editors