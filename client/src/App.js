import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StreamList from "./componenets/StreamList";
import StreamShow from "./componenets/StreamShow";
import StreamCreate from "./componenets/StreamCreate";
import StreamEdit from "./componenets/StreamEdit";
import StreamDelete from "./componenets/StreamDelete";
import Header from "./componenets/Header";
import 'semantic-ui-css/semantic.min.css'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" exacct element={<StreamList />} />
				<Route path="/streams/new" exacct element={<StreamCreate />} />
				<Route path="/streams/edit/:id" exacct element={<StreamEdit />} />
				<Route path="/streams/delete/:id" exacct element={<StreamDelete />} />
				<Route path="/streams/:id" exacct element={<StreamShow />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
