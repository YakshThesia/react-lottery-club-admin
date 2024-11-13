import Dropzone from 'react-dropzone';
import UPLOAD from '../Assets/loginimages/upload.png';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
const CustomFileUpload = (props) => {
  const { onDrop, accept, uploadImage, setSelectImage } = props;

  return (
    <Dropzone onDrop={onDrop} accept={accept}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Box sx={{
              height: '200px',
              width: '400px',
              margin: '0 auto',
              background: '#E3F2FB',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '24px'
            }}>
              {!uploadImage ? <Box sx={{}}>
                <Box sx={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  margin: '0 auto'
                }}>
                  <img src={UPLOAD} alt='upload' />
                </Box>
                <Typography sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000000',
                  textAlign: 'center',
                  padding: '8px 0px 0px 0px'
                }}>Click here to upload image or<br></br>drag and drop</Typography>
              </Box> :
                <Box>
                  <Box sx={{
                    width: '50%',
                    margin: '0 auto'
                  }}><img src={uploadImage} alt='upload' style={{
                    width: '100%'
                  }} /></Box>
                  <IconButton
                    component="span"
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "16px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                      transition: "0.5s",
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <EditIcon
                      sx={{
                        color: "#142328",
                        fontSize: "26px",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    component="span"
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "16px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                      transition: "0.5s",
                      position: "absolute",
                      right: "50px",
                      top: "5px",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                    onClick={(e) => { e.stopPropagation(); setSelectImage(false) }}
                  >
                    <CloseIcon
                      sx={{
                        color: "#142328",
                        fontSize: "26px",
                      }}
                    />
                  </IconButton></Box>}
            </Box>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default CustomFileUpload;
