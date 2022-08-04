import React, {useState, useEffect, createRef} from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import useStyles from "./NewsCardStyles";

const NewsCard = ({
  article: {
    author,
    content,
    description,
    publishedAt,
    source,
    title,
    url,
    urlToImage,
  },
  i,
  activeArticle
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  function scrollToRef(ref) {
    return window.scroll(0, ref.current.offsetTop - 50);
  }

  useEffect(() => {
    setElRefs((refs) => Array(20).fill().map((_, i) => refs[i]  || createRef()));
  }, [])

  useEffect(() => {
    if(activeArticle === i && elRefs[activeArticle]){
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs])

  let cardClasses = [classes.card];

  if(activeArticle === i ) cardClasses.push(classes.activeCard);

  return (
    <Card ref={elRefs[i]}  className={cardClasses.join(" ")}>
      <CardActionArea href={url} target="_blank">
        <CardMedia image={urlToImage} className={classes.media} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2" className={classes.title}>
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography variant="h5" gutterBottom style={{paddingLeft: '15px', paddingRight: '15px'}}>
        {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size="small" color="primary" href={url} target="_blank">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;