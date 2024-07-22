import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { UserConnectionContext } from "../contexts/UserConnectionProvider";
import "../style/header.css";

function Header() {
  const isAdmin = localStorage.getItem("is_admin");
  const { disconnect, connect } = useContext(UserConnectionContext);
  const [value, setValue] = useState(1);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const measureHeight = () => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    // revalidator.revalidate();
    // Measure height whenever the content of the menu changes
    measureHeight();
  }, [connect]);

  const openMenu = () => {
    const menu = document.querySelector(".open-menu");
    if (value === 1) {
      setValue(0);
      menu.style.visibility = "visible";
      menu.style.height = `${height}px`;
    } else {
      setValue(1);
      menu.style.height = "0px";
      setTimeout(() => {
        menu.style.visibility = "hidden";
      }, 300); // Durée de l'animation de fermeture
    }
  };

  return (
    <header>
      <nav>
        <NavLink to="./">
          <img src="../images/logos/logonavbar.png" alt="Logo" />
        </NavLink>
        <button type="button" onClick={openMenu}>
          <img src="../images/images/menu-burger.png" alt="Ouverture du menu" />
        </button>
        <ul
          className="open-menu"
          ref={containerRef}
          style={{
            height: "0px",
            overflow: "hidden",
            transition: "height 0.3s ease",
          }}
        >
          <li>
            <NavLink to="/" onClick={openMenu}>
              ACCUEIL
            </NavLink>
          </li>
          <li>
            <NavLink to="gallery" onClick={openMenu}>
              GALLERIE
            </NavLink>
          </li>
          <li>
            <NavLink to="artist" onClick={openMenu}>
              ARTISTE
            </NavLink>
          </li>
          <li>
            <NavLink to="about" onClick={openMenu}>
              &Agrave;&nbsp;PROPOS
            </NavLink>
          </li>

          {!connect ? (
            <>
              <li>
                <NavLink to="login" onClick={openMenu}>
                  CONNEXION
                </NavLink>
              </li>
              <li>
                <NavLink to="register" onClick={openMenu}>
                  INSCRIPTION
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="login" onClick={`${disconnect} ${openMenu}`}>
                DÉCONNEXION
              </NavLink>
            </li>
          )}
          {connect && isAdmin === "1" && (
            <li>
              <NavLink to="admin" onClick={openMenu}>
                ADMIN
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
