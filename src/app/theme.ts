import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        primary: '#7973C9',
        secondary: '#fff',
        text: '#706D70',
        shadow: 'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;'
    },
    fontSizes: {
        medium: '15px',
        h1: '32px',
        h2: '26px'
    }
})