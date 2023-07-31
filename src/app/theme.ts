import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        primary: '#fff',
        secondary: '#000',
        text: '#fff',
        shadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    },
    fontSizes: {
        medium: '15px',
        h1: '32px',
        h2: '26px'
    }
})