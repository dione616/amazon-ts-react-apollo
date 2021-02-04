import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { MenuItems } from "./menuItems";
import { Viewer } from "../../lib/types";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Header } = Layout;

export const AppHeader: React.FC<Props> = ({ viewer, setViewer }) => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Google_-G-_Logo.svg.png/600px-Google_-G-_Logo.svg.png"
              alt="Google Logo"
              className="log-in-card__google-button-logo"
            />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Header>
  );
};
