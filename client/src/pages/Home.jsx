// import { useState } from "react";
import { NavLink, useLoaderData, useOutletContext } from "react-router-dom";

import "../style/home.css";

function Home() {
  const { user } = useOutletContext;
  const data = useLoaderData();
  const photographer = data.artist;
  const photo = data.artwork;

  return (
    <>
      <figure className="logo">
        <img src="images/logos/logo.png" alt="" />
      </figure>
      <header>
        <h1>AFAC 974</h1>
      </header>
      {user && (
        <p>
          bonjour {user.firstname} {user.lastname}
        </p>
      )}
      <section>
        <h2>{photo[0].title}</h2>
        <h3>
          Nom de l&apos;auteur: {photo[0].firstname} {photo[0].lastname}.
        </h3>
        <div className="text-img">
          <figure>
            <img
              src={`images/photos/photographer3/${photo[0].image}`}
              alt={photo[0].alt_artwork}
            />
          </figure>
          <article>
            <p>{`${photo[0].description_artwork}`}</p>
            <ul>
              {photo.map((value) => (
                <li key={value.id_artist}>
                  <img
                    src={`images/photos/photographer${value.id_artist}/thumbnails/${value.image}`}
                    alt={value.alt_artwork}
                  />
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
      <section className="picture-photograph">
        {photographer.map((value) => (
          <article key={value.id_artist}>
            <figure>
              <NavLink to="photographer">
                <img
                  src={`images/photos/photographer${value.id}/thumbnails/photographer.jpg`}
                  alt={value.alt_artist}
                />
              </NavLink>
            </figure>
            <h3>
              {value.firstname} {value.lastname}
            </h3>
            <p className="link-photo">
              <NavLink to="photo">plus d&apos;info</NavLink>
            </p>
          </article>
        ))}
      </section>
    </>
  );
}

export default Home;
