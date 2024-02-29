import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
//import sidebar hook
import { useProSidebar } from 'react-pro-sidebar';
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from '../../redux/themeAction';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    '@media (min-width: 600px)': {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '@media (min-width: 600px)': {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const HeaderTop = () => {
    const { collapseSidebar } = useProSidebar();
    const { palette } = useTheme();
    const dispatch = useDispatch();

    return (
        <Box className="flex-grow">
            <AppBar position="static" className="shadow-none bg-primary">
                <Toolbar>
                    <IconButton onClick={() => collapseSidebar()}
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
                        {palette.mode === "dark" ? (
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

export default HeaderTop;
