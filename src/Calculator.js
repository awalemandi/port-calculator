import React, { useState, useEffect } from "react";
import {
  rangeSeparatorRegex,
  portRangeRegex,
  getSides,
  getRegexMatch
} from "./Regex";

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

  //Initialize states
  const [portRange, setPortRange] = useState("");
  const [sidesArray, setSidesArray] = useState(["A side", "Z side"]);
  const [aSidePatchpanel, setAsidePatchpanel] = useState("A side PP");
  const [zSidePatchpanel, setZsidePatchpanel] = useState("Z side PP");
  const [oldAsidePorts, setOldAsidePorts] = useState(["000", "000"]);
  const [oldZsidePorts, setOldZsidePorts] = useState(["000", "000"]);
  const [newAsidePorts, setNewAsidePorts] = useState(["000", "000"]);
  const [newZsidePorts, setNewZsidePorts] = useState(["000", "000"]);

  const handleRangeChange = e => {
    setPortRange(e.target.value);
  };

  const updateSides =() => {
    let updatedSidesArray = getSides(rangeSeparatorRegex, portRange);
    if (updatedSidesArray) {
      setSidesArray(updatedSidesArray);
    }
  };

  useEffect(() => {
    updateSides();
  }, [portRange]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>Equinix Logo</Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              1. Paste structured cabling port range below:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              name="portRange"
              variant="outlined"
              value={portRange}
              onChange={handleRangeChange}
              required
              fullWidth
              placeholder="SY4:01:010105:0309:RU42R:001-048 to SY4:01:010050:1109-A:RU41:289-336"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Port Range Template:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7">A and Z sides:</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="aSidePortRange"
              variant="outlined"
              value={sidesArray[0]}
              required
              fullWidth
              disabled
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
              value={sidesArray[1]}
              required
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h7">Patch Panel:</Typography>
          </Grid>
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h7">Ports:</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortA"
              variant="outlined"
              value={oldAsidePorts[0]}
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
              value={oldAsidePorts[1]}
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
              value={oldZsidePorts[0]}
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
              value={oldZsidePorts[1]}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              2. Enter Port A to be calculated:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortA"
              variant="outlined"
              value={newAsidePorts[0]}
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="aSidePortB"
              variant="outlined"
              value={newAsidePorts[1]}
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
              value={newZsidePorts[0]}
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="zSidePortB"
              variant="outlined"
              value={newZsidePorts[1]}
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
