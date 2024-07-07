import { createRoot } from "@wordpress/element";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexRoute />,
	},
	{
		path: "/*",
		element: isPage ? <PageRoute /> : <PostRoute />,
	},
	{
		id: "posts",
		path: `/${postsSlug}`,
		element: <PostsRoute />,
		loader: async ({ params }) => {
			if (!params?.index) return fetch("/wp-json/wp/v2/posts");

			const offset = (parseInt(params.index) - 1) * 10;
			return fetch(`/wp-json/wp/v2/posts?offset=${offset}`);
		},
		children: [
			{
				path: `/${postsSlug}/page/:index`,
				element: <PostsRoute />,
			},
		],
	},
]);

createRoot(document.getElementById("app")).render(
	<MainContainer header={<Header />} footer={<Footer />}>
		<RouterProvider router={router} />
	</MainContainer>,
);
