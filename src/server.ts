import App from "app";
import PostRoute from "domain/post/post.route";
import UserRoute from "domain/user/user.route";

const app = new App([new UserRoute(), new PostRoute()]);

app.run();
