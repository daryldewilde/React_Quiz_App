
import logo from '../assets/logo.png';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import type { ThemeContextType } from '../types/types';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, IconButton, Button as MUIButton } from '@mui/material';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

// Header component with navigation and theme toggle
export default function Header() {
    const themeContext:ThemeContextType|null = useContext(ThemeContext);
    
    // Toggle between light and dark themes
    function switchTheme() {
        if (themeContext?.theme === "light") {
            localStorage.setItem("theme", "dark")
            themeContext.setTheme("dark");
        } else {
            localStorage.setItem("theme","light")
            themeContext?.setTheme("light");
        }
    }
    
    return(<AppBar
        position="fixed"
        sx={{
            bgcolor: themeContext?.theme === "dark" ? '#111827' : '#6478b9ff',
            borderBottom: `1px solid ${themeContext?.theme === "dark" ? '#374151' : '#486591ff'}`,
            color: '#fff',
            zIndex: 10
        }}
    >
        <Toolbar sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 0 } }}>
                <img src={logo} alt='logo' style={{ height: 40, marginRight: 12 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: 18, md: 22 } }}>Quiz App</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: { xs: 0, md: 2 }, flexWrap:"wrap"}}>
                 <MUIButton component={NavLink} to="/" sx={{ color: '#fff', fontSize: { xs: 10, md: 16 }, '&.active': { color: themeContext?.theme === "dark" ? "secondary.main" : "darkblue" } }}>Home</MUIButton>
                    <MUIButton component={NavLink} to="/subjects" sx={{ color: '#fff', fontSize: { xs: 10, md: 16 }, '&.active': { color: themeContext?.theme === "dark" ? "secondary.main" : "darkblue" } }}>Subjects</MUIButton>
                    <MUIButton component={NavLink} to="/leaderboard" sx={{ color: '#fff', fontSize: { xs: 10, md: 16 }, '&.active': { color: themeContext?.theme === "dark" ? "secondary.main" : "darkblue" } }}>Leaderboard</MUIButton>
                    <MUIButton component={NavLink} to="/admin" sx={{ color: '#fff', fontSize: { xs: 10, md: 16 }, '&.active': { color: themeContext?.theme === "dark" ? "secondary.main" : "darkblue" } }}>Admin</MUIButton>
                <IconButton onClick={switchTheme} sx={{ p: 1.2, borderRadius: 2, '&:hover': { bgcolor: '#374151' } }}>
                    {themeContext?.theme === "light" ? (
                        <Brightness2Icon sx={{ fontSize: 24, color: '#fff' }} />
                    ) : (
                        <WbSunnyIcon sx={{ fontSize: 24, color: '#fff' }} />
                    )}
                </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    );
}