import { useState, useEffect, useRef } from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Container from "@material-ui/core/Container"
import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import {
  Paper,
  CardActionArea,
  CardMedia,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
} from "@material-ui/core"
import cblogo from "../img/cblogo.PNG"
import image from "../img/bg4.png"
import { DropzoneArea } from "material-ui-dropzone"
import { common } from "@material-ui/core/colors"
import Clear from "@material-ui/icons/Clear"

// Camera
import Webcam from "react-webcam"
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo"
import "react-html5-camera-photo/build/css/index.css"

// CSS
import "../css/Home.css"

require("dotenv").config()

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    "&:hover": {
      backgroundColor: "#ffffff7a",
    },
  },
}))(Button)
const axios = require("axios").default

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
    margin: "auto",
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4% 0",
    // backgroundColor: "blue"
  },
  mainContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "93vh",
    marginTop: "8px",
  },
  imageCard: {
    margin: "auto",
    maxWidth: 1000,
    backgroundColor: "#376b4d",
    boxShadow: "0px 9px 70px 0px rgb(0 0 0 / 30%) !important",
    borderRadius: "15px",
  },
  imageCardEmpty: {
    height: "auto",
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: "none",
  },
  uploadIcon: {
    background: "white",
  },
  tableContainer: {
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
  },
  table: {
    backgroundColor: "transparent !important",
  },
  tableHead: {
    backgroundColor: "transparent !important",
  },
  tableRow: {
    backgroundColor: "transparent !important",
  },
  tableCell: {
    fontSize: "22px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableCell1: {
    fontSize: "14px",
    backgroundColor: "transparent !important",
    borderColor: "transparent !important",
    color: "#000000a6 !important",
    fontWeight: "bolder",
    padding: "1px 24px 1px 16px",
  },
  tableBody: {
    backgroundColor: "transparent !important",
  },
  text: {
    color: "white !important",
    textAlign: "center",
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: "#fef9ea",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  appbar: {
    background: "#be6a77",
    boxShadow: "none",
    color: "white",
  },
  loader: {
    color: "#be6a77 !important",
  },
}))
export const ImageUpload = () => {
  const classes = useStyles()
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [data, setData] = useState()
  const [image, setImage] = useState(false)
  const [isLoading, setIsloading] = useState(false)

  const [selectedFile2, setSelectedFile2] = useState()
  const [preview2, setPreview2] = useState()
  const [data2, setData2] = useState()
  const [image2, setImage2] = useState(false)

  // const [dataUri, setDataUri] = useState("")
  let confidence = 0

  let img = null

  // Camera

  // data variable
  let definition
  let solution
  let tagalog_definition
  let tagalog_solution

  const sendFile = async () => {
    if (image) {
      let formData = new FormData()
      formData.append("file", selectedFile)
      let res = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL,
        data: formData,
      })
      // console.log(formData)
      if (res.status === 200) {
        setData(res.data)
      }
      setIsloading(false)
    }
  }

  const clearData = () => {
    setData(null)
    setImage(false)
    setSelectedFile(null)
    setPreview(null)
  }

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    let objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    if (!preview) {
      return
    }
    setIsloading(true)
    sendFile()
  }, [preview])

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined)
      setImage(false)
      setData(undefined)
      return
    }
    setSelectedFile(files[0])
    setData(undefined)
    setImage(true)
    console.log(files)
  }

  const onSelectFile2 = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined)
      setImage(false)
      setData(undefined)
      return
    }
    setSelectedFile(files)
    setData(undefined)
    setImage(true)
    console.log(files)
  }

  // Camera

  useEffect(() => {})

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, { type: mime })
  }

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    let file = dataURLtoFile(dataUri, "test.png")

    onSelectFile2(file)
  }

  const browserSupportsMedia = () => {
    return (
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.mzGetUserMedia
    )
  }

  // function initGetUserMedia() {
  //   navigator.mediaDevices = navigator.mediaDevices || {}
  //   navigator.mediaDevices.getUserMedia =
  //     navigator.mediaDevices.getUserMedia ||
  //     function (constraints) {
  //       let getUserMedia =
  //         navigator.webkitGetUserMedia || navigator.mozGetUserMedia
  //       if (!getUserMedia) {
  //         return Promise.reject(
  //           new Error("getUserMedia not supported by this browser")
  //         )
  //       } else {
  //         return new Promise((resolve, reject) => {
  //           getUserMedia.call(navigator, constraints, resolve, reject)
  //         })
  //       }
  //     }
  // }

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2)

    definition = data.definition
    solution = data.solution
    tagalog_definition = data.tagalog_definition
    tagalog_solution = data.tagalog_solution
  }

  // initGetUserMedia()

  return (
    <div className='home-body'>
      <Grid
        className={classes.gridContainer}
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <Grid item xs={12}>
          <Card
            className={`${classes.imageCard} ${
              !image ? classes.imageCardEmpty : ""
            }`}
          >
            {image && (
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component='image'
                  title='Contemplative Reptile'
                />
              </CardActionArea>
            )}
            {!image && (
              <>
                <div className='cameraZone'>
                  <Camera
                    idealResolution={{ width: 640, height: 480 }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    onTakePhoto={(dataUri) => {
                      handleTakePhoto(dataUri)
                    }}
                  />
                </div>
                <div className='dropZone'>
                  <CardContent className={classes.content}>
                    <DropzoneArea
                      // className='dropZoneName'
                      acceptedFiles={["image/*"]}
                      dropzoneText={
                        "I-drag at I-drop ang larawan para ma-proceso"
                      }
                      onChange={onSelectFile}
                    />
                  </CardContent>
                </div>
              </>
            )}
            {data && (
              <div className='home-container'>
                <div className='home-container-label'>
                  <div className='home-container-label-1'>
                    <h2>Name: </h2> <p>{data.class}</p>
                  </div>
                  <div className='home-container-label-2'>
                    <h2>Accuracy: </h2> <p>{confidence}%</p>
                  </div>
                </div>
                <hr />
                <div className='home-definition'>
                  <div className='home-definition-english'>
                    <div>
                      <h2>Definition: </h2> <p>{definition}</p>
                    </div>
                    <div>
                      <h2>Solution: </h2> <p>{solution}</p>
                    </div>
                  </div>
                  <div className='home-definition-tagalog'>
                    <div>
                      <h2>Kahulugan: </h2> <p>{tagalog_definition}</p>
                    </div>
                    <div>
                      <h2>Solusyon: </h2> <p>{tagalog_solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isLoading && (
              <CardContent className={classes.detail}>
                <CircularProgress
                  color='secondary'
                  className={classes.loader}
                />
                <Typography className={classes.title} variant='h6' noWrap>
                  Processing
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
        {data && (
          <Grid item className={classes.buttonGrid}>
            <ColorButton
              variant='contained'
              className={classes.clearButton}
              color='primary'
              component='span'
              size='large'
              onClick={clearData}
              startIcon={<Clear fontSize='large' />}
            >
              Try Again
            </ColorButton>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
