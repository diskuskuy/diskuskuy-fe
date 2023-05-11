import "@/styles/globals.css";
import { muiTheme } from "@/styles/mui-theme";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <Toaster/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
