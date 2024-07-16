import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Photo from "./pages/Photo";
import Artist from "./pages/Artist";
import Photographer from "./pages/Photographer";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import AddArtist from "./pages/admin/AddArtist";
import UpdateArtist from "./pages/admin/UpdateArtist";
import RemoveArtist from "./pages/admin/RemoveArtist";
import AddArtwork from "./pages/admin/AddArtwork";
import UpdateArtwork from "./pages/admin/UpdateArtwork";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import RemoveUser from "./pages/admin/RemoveUser";
import UpdateStatusUser from "./pages/admin/UpdateStatusUser";

// Fonction pour obtenir les paramètres de l'URL
const getIdFromSearchParams = (searchParams) => searchParams.get("id");
console.info(getIdFromSearchParams);

export const userLoader = async () => {
  const [artwork, artist] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/api/artworks/home/`).then((res) =>
      res.json()
    ),
    fetch(`${import.meta.env.VITE_API_URL}/api/artists/home/`).then((res) =>
      res.json()
    ),
  ]);

  return { artwork, artist };
};

export const artistArtworkLoader = async () => {
  const [artwork, artist] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/api/artworks/`).then((res) =>
      res.json()
    ),
    fetch(`${import.meta.env.VITE_API_URL}/api/artists/`).then((res) =>
      res.json()
    ),
  ]);

  return { artwork, artist };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => userLoader(),
      },
      {
        path: "gallery",
        element: <Gallery />,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/artworks/`).then(
            (response) => response.json()
          ),
      },
      {
        path: "photo",
        element: <Photo />,
        loader: ({ request }) => {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          return fetch(
            `${import.meta.env.VITE_API_URL}/api/artworks/${id}`
          ).then((response) => response.json());
        },
      },
      {
        path: "artist",
        element: <Artist />,
        loader: () =>
          fetch(`${import.meta.env.VITE_API_URL}/api/artists/`).then(
            (response) => response.json()
          ),
      },
      {
        path: "photographer",
        element: <Photographer />,
        loader: ({ request }) => {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          return fetch(
            `${import.meta.env.VITE_API_URL}/api/artists/${id}`
          ).then((response) => response.json());
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "admin/",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <HomeAdmin />,
          },
          {
            path: "add-artist",
            element: <AddArtist />,
          },
          {
            path: "update-artist",
            element: <UpdateArtist />,
            loader: () =>
              fetch(`${import.meta.env.VITE_API_URL}/api/artists/`).then(
                (response) => response.json()
              ),
          },
          {
            path: "remove-artist",
            element: <RemoveArtist />,
          },
          {
            path: "add-artwork",
            element: <AddArtwork />,
            loader: () =>
              fetch(`${import.meta.env.VITE_API_URL}/api/artworks/`).then(
                (response) => response.json()
              ),
          },
          {
            path: "update-artwork",
            element: <UpdateArtwork />,
            loader: () =>
              fetch(`${import.meta.env.VITE_API_URL}/api/artworks/`).then(
                (response) => response.json()
              ),
          },
          {
            path: "remove-artwork",
            element: <RemoveArtist />,
          },
          {
            path: "add-user",
            element: <AddUser />,
          },
          {
            path: "update-user",
            element: <UpdateUser />,
          },
          {
            path: "remove-user",
            element: <RemoveUser />,
          },
          {
            path: "update-status-user",
            element: <UpdateStatusUser />,
          },
        ],
      },
    ],
  },
]);

export default router;
