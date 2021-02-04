import React, { useEffect /* , useRef */, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Card, Layout, Spin, Typography } from "antd";
import { LOG_IN } from "../../lib/graphql/mutations/login";
import { AUTH_URL } from "../../lib/graphql/queries/authUrl";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/login/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/authUrl/__generated__/AuthUrl";
import { Viewer } from "../../lib/types";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../lib/components/utils/index";
import { ErrorBanner } from "../../lib/components/errorBanner";

interface Props {
  setViewer: (value: React.SetStateAction<Viewer>) => void;
  viewer: Viewer;
}

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = ({ setViewer, viewer }: Props) => {
  console.log(viewer);
  console.log(setViewer);

  const client = useApolloClient();
  const [
    logIn,
    { data: LogInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        /* sessionStorage.setItem("token", data.logIn.token) */

        displaySuccessNotification("You have successfully logged in!");
      }
    },
  });

  const loginRef = useRef(logIn);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code"); //retrurn valuea from href

    if (code) {
      loginRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      window.location.href = data.authUrl;
    } catch (error) {
      displayErrorMessage(
        "Sorry. Wawern't able to log you in. Please try  again later!"
      );
    }
  };

  if (LogInData && LogInData.logIn) {
    const { id: viewerId } = LogInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  if (logInLoading) {
    return (
      <Content>
        <Spin size="large" tip="Logging in ..." />
      </Content>
    );
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null;

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to TinyHouse!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Google_-G-_Logo.svg.png/600px-Google_-G-_Logo.svg.png"
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};
