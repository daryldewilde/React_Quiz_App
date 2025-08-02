
import type { ButtonComponentProps } from '../types/types';
import { Button as MUIButton } from '@mui/material';
import { useThemeContext } from '../hooks/useThemeContext';

export default function Button({ text, ...props }: ButtonComponentProps) {
    const themeContext = useThemeContext()
    return (
        <MUIButton
            {...props}
            sx={{
                color:"white",
                backgroundColor: themeContext.theme === "dark" ? "secondary.main" : "primary.main",
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 2,
                fontWeight: 500,
                fontSize: { xs: 14, md: 16 },
            }}
        >
            {text}
        </MUIButton>
    );
}