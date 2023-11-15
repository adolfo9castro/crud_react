import React from "react";
import {
    Skeleton,
    Typography,
    ListItem,
    Card,
    CardContent,
    CardActions
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

            <ListItem alignItems="flex-start" >
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography variant="h5">
                            <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                    </CardActions>
                </Card>
            </ListItem>
            <ListItem alignItems="flex-start" >
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography variant="h5">
                            <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                    </CardActions>
                </Card>
            </ListItem>
            <ListItem alignItems="flex-start" >
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography variant="h5">
                            <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} />
                    </CardActions>
                </Card>
            </ListItem>
            <ListItem alignItems="flex-start" >
                <Card sx={{ width: "100%" }}>
                    <CardContent>
                        <Typography variant="h5">
                            <Skeleton style={nameTask} animation="pulse" variant="text" height={40} width="100%" />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width={100} />
                        <Skeleton style={buttons} animation="pulse" variant="rounded" height={40} width={100} />
                    </CardActions>
                </Card>
            </ListItem>
        </>
    )
}

export default SkeletonComponent