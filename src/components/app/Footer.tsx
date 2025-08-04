

import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import type { ThemeContextType } from '../../types/types';
import { Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    const themeContext:ThemeContextType|null = useContext(ThemeContext);
    return (
        <Box component="footer" sx={{
            display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-around',
            minHeight: { xs: 80, md: 64 }, borderTop: `1px solid ${themeContext?.theme === 'dark' ? '#374151' : '#d1d5db'}`,
            bgcolor: themeContext?.theme === 'dark' ? '#111827' : '#6478b9ff', color: '#fff', width: '100%'
        }}>
            <Box sx={{ fontSize: { xs: 12, md: 14 }, mb: { xs: 1, md: 0 } }}>
                © 2025 Quiz App - daryldev. All Rights Reserved.
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <a href="https://www.linkedin.com/in/nfoye-djomo-daryl-dewilde-0ba897311/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon sx={{ color: '#0A66C2', fontSize: 28 }} />
                </a>
                <a href="https://wa.me/237699255753" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon sx={{ color: '#25D366', fontSize: 28 }} />
                </a>
                <a href="https://youtube.com/@daryldev" target="_blank" rel="noopener noreferrer">
                    <YouTubeIcon sx={{ color: '#FF0000', fontSize: 28 }} />
                </a>
                <a href="https://github.com/daryldewilde" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon sx={{ color: '#171515', fontSize: 28 }} />
                </a>
            </Box>  </Box>
    );
}