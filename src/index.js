import { createRoot } from "@wordpress/element";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexRoute from "./routes/IndexRoute/IndexRoute";
import PageRoute from "./routes/PageRoute/PageRoute";
import PostRoute from "./routes/PostRoute/PostRoute";
import "./main.css";

const isPage = wpData.isPage === "1";

createRoot(document.getElementById("app")).render(
	<BrowserRouter>
		<Routes>
			<Route index Component={IndexRoute} />
			<Route path="/*" Component={isPage ? PageRoute : PostRoute} />
		</Routes>
	</BrowserRouter>,
);
