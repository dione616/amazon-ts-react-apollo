import React from "react";
import { Avatar, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeTwoTone } from "@ant-design/icons";
import { Viewer } from "../../../lib/types";
import { useMutation } from "react-apollo";
import { LOG_OUT } from "../../../lib/graphql/mutations/logout";
import { LogOut as LogOutData } from "../../../lib/graphql/mutations/logout/__generated__/LogOut";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../lib/components/utils/";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems: React.FC<Props> = ({ viewer, setViewer }) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
      }
    },
    onError: (data) => {
      displayErrorMessage(`Sorry! Failed! ${data}`);
    },
  });

  const handleLogOut = () => {
    logOut();
    displaySuccessNotification("You have successfully loged out!");
  };

  const subMenuLogin = viewer.id ? (
    <SubMenu title={<Avatar />}>
      <Item key="/user" title="Profile">
        Profile
      </Item>
      <Item key="/logout" title="LogOut" onClick={handleLogOut}>
        Log Out
      </Item>
    </SubMenu>
  ) : (
    <Item>
      <Link to="/login">
        <Button type="primary">Sing In</Button>
      </Link>
    </Item>
  );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="host">
        <Link to="/host">
          <HomeTwoTone type="home">Host</HomeTwoTone>
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
