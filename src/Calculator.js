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
  Tooltip,
  Snackbar
} from "@material-ui/core";

import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Logo from "./images/equinixLogo.png";

//copyright component
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    background: "transparent",
    // backgroundColor: theme.palette.secondary.light,
    width: "100%",
    height: "100%"
  },
  steps: {
    marginBottom: theme.spacing(1)
  },
  logo: {
    margin: theme.spacing(5),
    width: 110,
    height: "auto",
    alignContent: "center"
  },
  container: {
    width: "45%",
    alignSelf: "center",
    [theme.breakpoints.down("md")]: {
      width: "70%"
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    }
  },
  separator: {
    textAlign: "center"
  },
  buttonContainer: {
    textAlign: "center"
  },
  button: {
    marginTop: theme.spacing(4),
    maxWidth: 70,
    height: "100%"
  },
  copyright: {
    margin: theme.spacing(3)
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
  const [newPortRange, setNewPortRange] = useState("");

  const [open, setOpen] = useState(false);

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
    setNewPortRange("");
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
    if (a == b) return 0;
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

  const getNewPortRange = (aPatchpanel, aPortA, aPortB, zPatchpanel) => {
    let newRange = `${aPatchpanel}${padNumber(aPortA)}+${padNumber(
      aPortB
    )} to ${zPatchpanel}${padNumber(getNewZPort("A"))}+${padNumber(getNewZPort("B"))}`;
    setNewPortRange(newRange);
  };

  //adds zeros infront of new ports for naming convention
  const padNumber = num => {
    let paddedNum = ("000" + num).slice(-3);
    return paddedNum;
  };

  //calculate new Z side ports based on new A side ports and port difference
  const getNewZPort = (port = "A" | "B") => {
    if (port == "A") {
      return newPortA ? newPortA + portDifference : 0;
    }
    if (port == "B") {
      return newPortB ? newPortB + portDifference : 0;
    }
  };

  //copies new port range to clopboard
  const copyToClipboard = input => {
    navigator.clipboard.writeText(input);
  };

  const openSnack = () => {
    setOpen(true);
  };

  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    try {
      updateFields();
      if (portRange !== "" && newPortA !== 0) {
        getNewPortRange(aSidePatchpanel, newPortA, newPortB, zSidePatchpanel);
      }
    } catch (e) {
      console.log(e);
    }
  }, [portRange, newPortA, newPortB]);

  return (
    <div className={classes.paper}>
      <Grid
        container
        spacing={1}
        flexDirection="column"
        justify="space-evenly"
        alignItems="center"
        className={classes.container}
      >
        <img src={Logo} alt="Equinix logo" className={classes.logo} />

        <Grid item xs={12} className={classes.steps}>
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
          <Typography variant="h6" color="textSecondary">
            Port Range Template:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">
            A and Z sides:
          </Typography>
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
          <Typography variant="subtitle1" color="textSecondary">
            Patch Panel:
          </Typography>
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
          <Typography variant="subtitle1" color="textSecondary">
            Ports:
          </Typography>
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
        <Grid item xs={1} className={classes.separator}>
          <Typography variant="h6"> - </Typography>
        </Grid>
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
        <Grid item xs={1} className={classes.separator}>
          <Typography variant="h6"> - </Typography>
        </Grid>
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
          <Typography variant="h6" color="primary">
            Port difference: {portDifference}
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.steps}>
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
        <Grid item xs={1} className={classes.separator}>
          <Typography variant="h6"> + </Typography>
        </Grid>
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
            value={getNewZPort("A")}
            type="number"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={1} className={classes.separator}>
          <Typography variant="h6"> + </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            color="primary"
            name="zSidePortB"
            variant="outlined"
            value={getNewZPort("B")}
            type="number"
            disabled
            fullWidth
          />
        </Grid>

        <Grid
          item
          container
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Typography variant="h6" className={classes.steps}>
              3. Copy new port range:
            </Typography>
            <TextField
              color="primary"
              name="newPortRange"
              variant="outlined"
              value={newPortRange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} className={classes.buttonContainer}>
            <Tooltip title="Copy to clipboard">
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
                onClick={() => {
                  copyToClipboard(newPortRange);
                  openSnack();
                }}
              >
                <FileCopyIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={closeSnack}
        message="Copied to clipboard!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="primary"
            onClick={closeSnack}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      <Box className={classes.copyright}>
        <Copyright />
      </Box>
    </div>
  );
}
