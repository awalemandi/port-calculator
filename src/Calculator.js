import React, { useState, useEffect } from "react";
import {
  rangeSeparatorRegex,
  portsSeparatorRegex,
  portRangeRegex,
  getSides,
  getPatchpanel,
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
      {"Created by "}
      <Link color="inherit" href="https://github.com/awalemandi">
        awalemandi
      </Link>
      {" for Equinix Australia "}
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
  const [newAsidePorts, setNewAsidePorts] = useState([0, 0]);
  const [newZsidePorts, setNewZsidePorts] = useState([0, 0]);
  const [portDifference, setPortDifference] = useState(0);

  const handleRangeChange = e => {
    setPortRange(e.target.value);
  };

  const updatePatchpanels = (aSide, zSide) => {
    setAsidePatchpanel(aSide);
    setZsidePatchpanel(zSide);
  };

  const updatePorts = (aPorts, zPorts) => {
    setOldAsidePorts(aPorts);
    setOldZsidePorts(zPorts);
  };

  const updateFields = () => {
    let updatedSidesArray = getSides(rangeSeparatorRegex, portRange);
    if (updatedSidesArray) {
      setSidesArray(updatedSidesArray);

      const updatedAside = getPatchpanel(portRangeRegex, updatedSidesArray[0]);
      const updatedZside = getPatchpanel(portRangeRegex, updatedSidesArray[1]);

      updatePatchpanels(updatedAside, updatedZside);

      const updatedAportRange = getRegexMatch(
        portRangeRegex,
        updatedSidesArray[0]
      );
      const updatedZportRange = getRegexMatch(
        portRangeRegex,
        updatedSidesArray[1]
      );

      const updatedAportsArray = getSides(
        portsSeparatorRegex,
        updatedAportRange
      );
      const updatedZportsArray = getSides(/-/gim, updatedZportRange);

      updatePorts(updatedAportsArray, updatedZportsArray);
      setPortDifference(
        calculatePortDifference(updatedAportsArray[0], updatedZportsArray[0])
      );
    }
  };

  const calculatePortDifference = (a, b) => {
    return Math.abs(parseInt(a) - parseInt(b));
  };

  const handlePortAChange = e => {
    setNewAsidePorts([parseInt(e.target.value), parseInt(e.target.value) + 1]);
  };

  const handlePortBChange = e => {
    setNewAsidePorts([parseInt(e.target.value) - 1, parseInt(e.target.value)]);
  };

  useEffect(() => {
    try {
      updateFields();
      calculatePortDifference();
    } catch (e) {
      console.log(e);
    }
  }, [portRange, newAsidePorts]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>Equinix Logo</Avatar>
            Port Difference:{portDifference}
            OldAPort:{oldAsidePorts}
            OldZPort:{oldZsidePorts}
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
              value={
                newAsidePorts[0] && newAsidePorts[0] >= 0 ? newAsidePorts[0] : 0
              }
              onChange={handlePortAChange}
              type="number"
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="aSidePortB"
              variant="outlined"
              value={
                newAsidePorts[1] && newAsidePorts[1] >= 0 ? newAsidePorts[1] : 0
              }
              onChange={handlePortBChange}
              type="number"
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
              value={
                newAsidePorts[0] && newAsidePorts[0] > 0
                  ? newAsidePorts[0] + portDifference
                  : 0
              }
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="primary"
              name="zSidePortB"
              variant="outlined"
              value={
                newAsidePorts[1] && newAsidePorts[1] > 0
                  ? newAsidePorts[1] + portDifference
                  : 0
              }
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
