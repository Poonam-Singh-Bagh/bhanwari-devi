import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useStyles from "./styles";
import { breakpoints } from "../../theme/constant";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS, interpolatePath, dateTimeFormat } from "../../constant";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import AlertDialog from "./dilog";
import axios from "axios";
import { useSelector } from "react-redux";
// import { Button } from "framework7-react";
import { METHODS } from "../../services/api";
import CheckMoreBatches from "./CheckMoreBatches";
import CourseEnroll from "./NotEnrolledinCourse/EnrollInCourse";
import RevisionClass from "./Revision/RevisionClassExerciseComponent";
import { useHistory } from "react-router-dom";
const UpcomingCourse = (props) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [upcomingBatchesOpen, setUpcomingBatchesOpen] = React.useState(false);
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  // const user = useSelector(({ User }) => User);
  const { upcomingBatchesData } = props;
  const [BatchData, setBatchData] = useState(upcomingBatchesData[0]);
  const user = useSelector(({ User }) => User);
  useEffect(() => {
    setBatchData(upcomingBatchesData[0]);
  }, [upcomingBatchesData]);

  const handleClickOpen = () => {
    if (user?.data?.token) {
      setOpen(!open);
    } else {
      history.push(interpolatePath(PATHS.LOGIN));
    }
  };

  const close = () => {
    setOpen(false);
  };
  const handleUpcomingBatchesClickOpen = () => {
    setUpcomingBatchesOpen(true);
  };
  const handleUpcomingBatchesClickClose = () => {
    setUpcomingBatchesOpen(false);
  };

  return BatchData ? (
    <>
      <Container maxWidth="lg">
        <Box align="right" mt={1} maxWidth={500} mb={10}>
          <Card elevation={2} pl={10}>
            <CardContent>
              <Typography gutterBottom variant="h5" align="start">
                {BatchData?.title}
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  padding: "10px 0",
                }}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/calender.svg")}
                  alt="Students Img"
                />
                From {dateTimeFormat(BatchData?.start_time).finalDate} -{" "}
                {dateTimeFormat(BatchData?.end_time).finalDate}
              </Typography>
              <Typography
                variant="body1"
                mb={1}
                style={{
                  display: "flex",
                  // padding: "10px 0",
                }}
              >
                <img
                  className={classes.icons}
                  src={require("./assets/degree.svg")}
                  alt="Students Img"
                />
                Access to live classes
              </Typography>
              <Button variant="contained" onClick={handleClickOpen} fullWidth>
                Enroll Batch
              </Button>
              <AlertDialog
                open={open}
                close={close}
                title={BatchData?.title}
                start_time={BatchData?.start_time}
                end_time={BatchData?.end_time}
                id={BatchData?.id}
              />
              <Typography
                style={{ display: "flex" }}
                mt={2}
                align="start"
                variant="body2"
              >
                Can’t start on {dateTimeFormat(BatchData?.start_time).finalDate}
                {" ? "}
                <section
                  className={classes.link}
                  onClick={handleUpcomingBatchesClickOpen}
                >
                  Check out our other batches
                </section>
                <CheckMoreBatches
                  open={upcomingBatchesOpen}
                  handleUpcomingBatchesClickOpen={
                    handleUpcomingBatchesClickOpen
                  }
                  handleUpcomingBatchesClickClose={
                    handleUpcomingBatchesClickClose
                  }
                  upcomingBatchesData={upcomingBatchesData}
                />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  ) : (
    ""
  );
};
export default UpcomingCourse;
