import { createRoot } from "@wordpress/element";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer/MainContainer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IndexRoute from "./routes/IndexRoute/IndexRoute";
import PageRoute from "./routes/PageRoute/PageRoute";
import PostRoute from "./routes/PostRoute/PostRoute";
import PostsRoute from "./routes/PostsRoute/PostsRoute";
import "./main.css";

const isPage = wpData.isPage === "1";
const postsSlug = wpData.pageData.posts.post_name;

createRoot(document.getElementById("app")).render(
	<MainContainer header={<Header />} footer={<Footer />}>
		<BrowserRouter>
			<Routes>
				<Route index Component={IndexRoute} />
				<Route path="/*" Component={isPage ? PageRoute : PostRoute} />
				<Route path={`/${postsSlug}`} Component={PostsRoute} />
			</Routes>
		</BrowserRouter>
	</MainContainer>,
);
