import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
  const [newPortA, setNewPortA] = useState(null);


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
              onChange={(e)=> {setASide(e.target.value)}}
              required
              fullWidth
              placeholder="SY4:010050:1109-A..."
              autoFocus
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="zSidePortRange"
              variant="outlined"
              value={zSide}
              onChange={(e)=> {setZSide(e.target.value)}}
              required
              fullWidth
              placeholder="SY4:010010:0123..."
            />
          </Grid>
        </Grid>

        <Typography variant="h6">Port Range Template:</Typography>
        <Typography variant="h7">Patch Panel:</Typography>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="aSidePP"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={5}>
            <TextField
              color="secondary"
              name="zSidePP"
              variant="outlined"
              fullWidth
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
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="aSidePortB"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6"> TO </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="zSidePortA"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Typography variant="h6"> + </Typography>
          <Grid item xs={2}>
            <TextField
              color="secondary"
              name="zSidePortB"
              variant="outlined"
              fullWidth
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
          <Grid item xs={2}>
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
