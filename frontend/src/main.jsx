import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Video from "./pages/Video.jsx";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/Signup.jsx";
import Channel from "./pages/Channel.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import VideoUpload from "./components/VideoUpload.jsx";
import ChannelComponent from "./components/Channel.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default route at "/"
        element: <Home type="random" />, // Random videos at the base path
      },
      {
        path: "trend", // Route for trending videos
        element: <Home type="trend" />,
      },
      {
        path: "Subscriptions", // Route for subscribed videos
        element: <Home type="Subscriptions" />,
      },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/channel",
        element: <Channel />,
      },
      {
        path: "/userChannel/:channelId",
        element: <ChannelComponent />,
      },
      {
        path: "/upload",
        element: <VideoUpload />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
