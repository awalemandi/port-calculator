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
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Logo from './images/equinixLogo.png';
import Background from './images/sy5.jpg';

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
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: theme.palette.secondary.light,
    width: "100%",
    height: "100%",
  },
  logo: {
    margin: theme.spacing(2),
    width: 200,
    height: 'auto',
    alignContent: 'center',
  },
  container: {
    width: '50%',
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
      width: '70%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    },
  },
  separator: {
    textAlign: 'center'
  },
  buttonContainer: {
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing(4),
    maxWidth: 70,
    height: '100%'
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
  const [newPortA, setNewPortA] = useState(0);
  const [newPortB, setNewPortB] = useState(0);
  const [portDifference, setPortDifference] = useState(0);

  const resetFields = () => {
    //resets all fields to initial state other than portRange
    setSidesArray(["A side", "Z side"]);
    setAsidePatchpanel("A side PP");
    setZsidePatchpanel("Z side PP");
    setOldAsidePorts(["000", "000"]);
    setOldZsidePorts(["000", "000"]);
    setNewPortA(0);
    setNewPortB(0);
    setPortDifference(0);
  };

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
    if (portRange == "") {
      resetFields();
    }
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
    } else return;
  };

  const calculatePortDifference = (a, b) => {
    const difference = Math.abs(parseInt(a) - parseInt(b));
    if (!difference) return;
    return difference;
  };

  const handlePortAChange = e => {
    const input = parseInt(e.target.value);
    setNewPortA(input);
    setNewPortB(input + 1);
  };

  const handlePortBChange = e => {
    const input = parseInt(e.target.value);
    setNewPortB(input);
    setNewPortA(input - 1);
  };

  useEffect(() => {
    try {
      updateFields();
    } catch (e) {
      console.log(e);
    }
  }, [portRange]);

  return (
    <div className={classes.paper}>
      <Grid container spacing={1} flexDirection="column" justify="space-evenly" alignItems="center" className={classes.container}>

        <img src={Logo} alt="Equinix logo" className={classes.logo} />

        <Grid item xs={12}>
          <Typography variant="h6">
            1. Paste structured cabling port range below:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
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
          <Typography variant="h6" color="textSecondary">Port Range Template:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">A and Z sides:</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            color="secondary"
            name="aSidePortRange"
            variant="outlined"
            value={sidesArray ? sidesArray[0] : "A side"}
            required
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={2} className={classes.separator}>
          <SettingsEthernetIcon />
        </Grid>

        <Grid item xs={5}>
          <TextField
            color="secondary"
            name="zSidePortRange"
            variant="outlined"
            value={sidesArray ? sidesArray[1] : "Z side"}
            required
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">Patch Panel:</Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            color="secondary"
            name="aSidePatchpanel"
            variant="outlined"
            value={aSidePatchpanel ? aSidePatchpanel : "A side PP"}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={2} className={classes.separator}>
          <SettingsEthernetIcon />
        </Grid>

        <Grid item xs={5}>
          <TextField
            color="secondary"
            name="zSidePatchpanel"
            variant="outlined"
            value={zSidePatchpanel ? zSidePatchpanel : "Z side PP"}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">Ports:</Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            color="secondary"
            name="aSidePortA"
            variant="outlined"
            value={oldAsidePorts ? oldAsidePorts[0] : "000"}
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
            value={oldAsidePorts ? oldAsidePorts[1] : "000"}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={2} className={classes.separator}>
          <SettingsEthernetIcon />
        </Grid>

        <Grid item xs={2}>
          <TextField
            color="secondary"
            name="zSidePortA"
            variant="outlined"
            value={oldZsidePorts ? oldZsidePorts[0] : "000"}
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
            value={oldZsidePorts ? oldZsidePorts[1] : "000"}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Port difference: {portDifference}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            2. Enter Port A to be calculated:
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            color="primary"
            name="aSidePortA"
            variant="outlined"
            value={newPortA >= 0 ? newPortA : 0}
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
            value={newPortB >= 0 ? newPortB : 0}
            onChange={handlePortBChange}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={2} className={classes.separator}>
          <SettingsEthernetIcon />
        </Grid>

        <Grid item xs={2}>
          <TextField
            color="primary"
            name="zSidePortA"
            variant="outlined"
            value={newPortA ? newPortA + portDifference : 0}
            type="number"
            fullWidth
            disabled
          />
        </Grid>
        <Typography variant="h6"> + </Typography>
        <Grid item xs={2}>
          <TextField
            color="primary"
            name="zSidePortB"
            variant="outlined"
            value={newPortB ? newPortB + portDifference : 0}
            type="number"
            disabled
            fullWidth
          />
        </Grid>

        <Grid item container spacing={1} direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h6">
              3. Copy new port range:
              </Typography>
            <TextField
              color="primary"
              name="newRange"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <Button variant="contained" size="large" color="primary" className={classes.button}><FileCopyIcon /></Button>
          </Grid>
        </Grid>
      </Grid>
      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </div>
  );
}
