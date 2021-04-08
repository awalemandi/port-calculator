import { createMuiTheme, colors } from '@material-ui/core/';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#E94957', //sizzling red
            light: '#EB5C68', //fiery rose
            dark: '#E63946', //imperial red
        },
        secondary: {
            light: '#f8f9fa', //cultured
            main: '#A8DADC', //powder blue
            dark: '#E9ECEF', //cultured dark
        },
    },
});



export { theme };