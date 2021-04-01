import React, { useState, useEffect } from "react";
import { portRegex } from "./Regex";

import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";

//copyright
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Equinix Port Calculator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//styling
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8)
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "flex-start"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Calculator() {
  const classes = useStyles();
  //example panel reference  SY4:01:010105:0309:RU42R:001-048 to SY4:01:010050:1109-A:RU41:289-336
  const [aSide, setASide] = useState("");
  const [zSide, setZSide] = useState("");
  const [aSidePatchpanel, setAsidePatchpanel] = useState("sdfasf");
  const [zSidePatchpanel, setZsidePatchpanel] = useState("dsfsadf");
  const [oldAsidePorts, setOldAsidePorts] = useState([0, 0]);
  const [oldZsidePorts, setOldZsidePorts] = useState([0, 0]);
  const [newAsidePorts, setNewAsidePorts] = useState([0, 0]);
  const [newZsidePorts, setNewZsidePorts] = useState([0, 0]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>Equinix Logo</Avatar>
        <Typography variant="h6">
          1. Paste structured cabling port range below:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="aSidePortRange"
              variant="outlined"
              value={aSide}
              onChange={e => {
                setASide(e.target.value);
              }}
              required
              fullWidth
              placeholder="SY4:01:010105:0309:RU42R:001-048"
              autoFocus
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="zSidePortRange"
              variant="outlined"
              value={zSide}
              onChange={e => {
                setZSide(e.target.value);
              }}
              required
              fullWidth
              placeholder="SY4:01:010050:1109-A:RU41:289-336"
            />
          </Grid>
        </Grid>

        <Typography variant="h6">Port Range Template:</Typography>
        <Typography variant="h7">Patch Panel:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="aSidePatchpanel"
              variant="outlined"
              value={aSidePatchpanel}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="zSidePatchpanel"
              variant="outlined"
              value={zSidePatchpanel}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>

        <Typography variant="h7">Ports:</Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortA"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Typography variant="h6"> - </Typography>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortB"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="zSidePortA"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Typography variant="h6"> - </Typography>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="zSidePortB"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
        </Grid>

        <Typography variant="h6">2. Enter Port A to be calculated:</Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortA"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="aSidePortB"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              color="primary"
              name="zSidePortA"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="zSidePortB"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
