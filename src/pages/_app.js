import "@/styles/globals.css";
import { muiTheme } from "@/styles/mui-theme";
import { ThemeProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
