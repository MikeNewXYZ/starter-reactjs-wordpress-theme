import { createRoot } from "@wordpress/element";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import IndexRoute from "./routes/IndexRoute/IndexRoute";
import PageRoute from "./routes/PageRoute/PageRoute";
import PostRoute from "./routes/PostRoute/PostRoute";
import "./main.css";

const isPage = wpData.isPage === "1";

createRoot(document.getElementById("app")).render(
	<div className="flex min-h-dvh flex-col">
		<main className="flex-1">
			<BrowserRouter>
				<Routes>
					<Route index Component={IndexRoute} />
					<Route path="/*" Component={isPage ? PageRoute : PostRoute} />
				</Routes>
			</BrowserRouter>
		</main>
		<Footer />
	</div>,
);
