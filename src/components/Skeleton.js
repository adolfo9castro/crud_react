import React from "react";
import {
    Skeleton,
    Typography,
    ListItem,
    ListItemText,
    Stack
} from '@mui/material';
import styles from "../styles"
const {
    skeletonStyles: {
        nameTask,
        buttons
    }
} = styles

const SkeletonComponent = () => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText>
                    <Typography variant="h5">
                        <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                    </Typography>
                </ListItemText>
                <Stack direction="row" spacing={2} style={{ width: "35%" }}>
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                </Stack>
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemText>
                    <Typography variant="h5">
                        <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                    </Typography>
                </ListItemText>
                <Stack direction="row" spacing={2} style={{ width: "35%" }}>
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                </Stack>
            </ListItem>
            <ListItem alignItems="flex-start">
                <ListItemText>
                    <Typography variant="h5">
                        <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                    </Typography>
                </ListItemText>
                <Stack direction="row" spacing={2} style={{ width: "35%" }}>
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                    <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width="150" />
                </Stack>
            </ListItem>
        </>
    )
}

export default SkeletonComponent