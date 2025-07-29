
import type { ButtonComponentProps } from '../types/types';
import { Button as MUIButton } from '@mui/material';

export default function Button({ text, ...props }: ButtonComponentProps) {
    return (
        <MUIButton
            {...props}
            sx={{
                color:"white",
                backgroundColor: '#ec4899',
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 2,
                fontWeight: 500,
                fontSize: { xs: 14, md: 16 },
                textTransform: 'none',
                '&:hover': { backgroundColor: '#db2777' }
            }}
        >
            {text}
        </MUIButton>
    );
}