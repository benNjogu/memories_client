import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Like from "./Like";
import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const userId = (id) => id !== user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  const user = JSON.parse(localStorage.getItem("profile"));

  const openPost = () => navigate(`/posts/${post._id}`);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter(userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {user?.result?.googleId === post?.creator ||
            (user?.result?._id === post?.creator && (
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize="med" />
              </Button>
            ))}
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          variant="h5"
          gutterBottom
          component="h2"
          noWrap={true}
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Like user={user} post={post} />
        </Button>
        {user?.result?.googleId === post?.creator ||
          (user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;
