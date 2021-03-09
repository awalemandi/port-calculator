import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>Equinix Logo</Avatar>
        <Typography component="h2" variant="h5">
          Enter Port Range
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              color="secondary"
              autoComplete="port"
              name="firstPort"
              variant="outlined"
              required
              fullWidth
              id="firstPort"
              placeholder="1"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">becomes</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              color="secondary"
              variant="outlined"
              required
              fullWidth
              id="lastPort"
              name="lastPort"
              placeholder="49"
            />
          </Grid>
        </Grid>
        <Typography component="h2" variant="h5">
          Port to calculate
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              color="secondary"
              autoComplete="port"
              name="firstPort"
              variant="outlined"
              required
              fullWidth
              id="firstPort"
              placeholder="29"
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">becomes</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              color="primary"
              variant="outlined"
              required
              fullWidth
              id="lastPort"
              name="lastPort"
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
