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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Set this to "/" to render Home at the base URL
        element: <Home />,
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
