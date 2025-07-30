import { AppBar as RAppBar, TitlePortal } from "react-admin";
import { Link } from "react-router-dom";
import { Button } from "react-admin";
import { Box} from "@mui/system";
import type { AppBarProps } from "react-admin";

export default function AppBar(props: AppBarProps) {
    return (
        <RAppBar {...props}>
            <TitlePortal />
            <Box sx={{ display: "flex" }}>
                <Button component={Link} to="/">
                    Home
                </Button>
            </Box>
        </RAppBar>
    );
}