import * as React from 'react';
import { styled, alpha, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from '../../redux/themeAction';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';

// Define your theme here
const theme = {
  palette: {
    mode: 'light', // Set initial mode if needed
    // Add other theme properties as needed
  },
};

// Your HeaderTop component remains the same

const HeaderTop = () => {
    const { palette } = useTheme();
    const dispatch = useDispatch();

    return (
        <Box className="flex-grow">
            <AppBar position="static" className="shadow-none bg-primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className="mr-2"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        className="flex-grow hidden sm:block"
                    >
                        HR APP
                    </Typography>

                    {/* toggle dark theme */}
                    <IconButton className="mr-4" onClick={() => dispatch(toggleActionTheme())}>
                        {palette && palette.mode === "dark" ? (
                            <DarkMode className="text-white text-xl" />
                        ) : (
                            <LightMode className="text-white text-xl" />
                        )}
                    </IconButton>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

// Wrap your HeaderTop component with ThemeProvider and provide the theme
const ThemedHeaderTop = () => (
  <ThemeProvider theme={theme}>
    <HeaderTop />
  </ThemeProvider>
);

export default ThemedHeaderTop;
