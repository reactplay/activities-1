import styles from "../../styles/idea.module.css";
import Image from "next/image";
import { Grid, Card, Typography } from "@mui/material";
import InProgress from "/public/Idea-List/inProgress.svg";
import Complted from "/public/Idea-List/completed.svg";
import NotStarted from "/public/Idea-List/notStart.svg";
import React from "react";

const IdeaCard = ({ data, onClick }) => {
  const [image, color] =
    data.status === "Submitted"
      ? [Complted, "#68FDC6"]
      : data.status === "Not Started"
      ? [NotStarted, "#FD6868"]
      : data.status === "In Progress"
      ? [InProgress, "#FDC668"]
      : [NotStarted, "#FD6868"];

  const onCardClicked = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Card
      className={styles.card}
      variant="outlined"
      onClick={() => onCardClicked()}
    >
      <Grid container columns={{ xs: 1 }} className={" pt-12 px-8 h-72"}>
        <Grid item xs={1} className={""}>
          <Typography
            variant="h5"
            className={`${styles.title} `}
            color="#00F2FE"
          >
            {data.title}
          </Typography>
        </Grid>
        <Grid item xs={1} className="">
          <div
            className={`${styles.cardDescription}`}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </Grid>
        <Grid item xs={1} alignSelf={"flex-end"}>
          <Grid columns={12} container>
            <Grid item className="flex" xs={6}>
              {data.avatarUrl.map((value, index) => {
                const styleAvaratr =
                  index === 1
                    ? `${styles.cardAvatar2nd}  justify-self-center`
                    : `${styles.cardAvatar} justify-self-center`;
                return (
                  <React.Fragment key={index}>
                    {value && (
                      <Image
                        key={value + index.toString()}
                        className={
                          data.avatarUrl.includes(undefined)
                            ? styles.cardAvatarSingle
                            : styleAvaratr
                        }
                        height={50}
                        width={50}
                        layout={"fixed"}
                        src={data.avatarUrl[index]}
                        alt={"user avatar"}
                        aria-label="user avatar"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </Grid>
            <Grid
              item
              xs={6}
              className="flex flex-row justify-center gap-2 items-center "
            >
              {image !== null ? (
                <Image
                  src={image}
                  alt={`status ${data.status || "Not Started"}`}
                />
              ) : null}

              <Typography variant={"body2"} color={color}>
                {data.status || "Not Started"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default IdeaCard;
