import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import type { ThemeContextType} from '../types/types';
import type { ReactNode } from "react";
import { Box } from '@mui/material';

export default function PageLayout(props: { children: ReactNode }) {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    return (
        <Box component="main" sx={{
            minHeight: '100vh', width: '100%', pt: '128px', mt: '40px',
            textAlign:"center",
            bgcolor: themeContext.theme === 'dark' ? '#374151' : '#dddfe4ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1, md: 2 }
        }}>
            <Box sx={{
                width: '100%', maxWidth: { xs: 600, md: 900, lg: 1200 },
                bgcolor: themeContext.theme === 'dark' ? '#1f2937' : '#c2d7f3ff',
                color: themeContext.theme === 'dark'? "cyan":"darkblue",
                border: `1px solid ${themeContext.theme === 'dark' ? '#374151' : '#93c5fd'}`,
                borderRadius: 2, p: { xs: 2, md: 4 }
            }}>
                {props.children}
            </Box>
        </Box>
    );
}