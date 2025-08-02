import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';
import type { ThemeContextType } from '../types/types';
import type { ReactNode } from "react";
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

export default function PageLayout({ children }: { children: ReactNode }) {
    const themeContext = useContext(ThemeContext) as ThemeContextType;
    return (
        <>
            <Header />
            <Box
                component="main"
                sx={{
                    minHeight: '100vh',
                    width: '100%',
                    mt: {xs:"70px", md:"50px"},
                    textAlign: "center",
                    bgcolor: themeContext.theme === 'dark' ? '#374151' : '#dddfe4ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "center",
                    p: { xs: 1, md: 2 },
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: { xs: 600, md: 900, lg: 1200 },
                        bgcolor: themeContext.theme === 'dark' ? '#1f2937' : '#c2d7f3ff',
                        color: themeContext.theme === "dark" ? "secondary.main" : "primary.main",
                        border: `1px solid ${themeContext.theme === 'dark' ? '#374151' : '#93c5fd'}`,
                        borderRadius: 2,
                        p: { xs: 2, md: 4 },
                    }}
                >
                    {children}
                </Box>
            </Box>
            <Footer />
        </>
    );
}