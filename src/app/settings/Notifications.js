import React, { Component } from "react";
import {
  Divider,
  Button,
  Checkbox,
  Segment,
  Header,
  Form,
  Icon
} from "semantic-ui-react";
import { Loading } from "../../components";

import * as api from "./userActions";

class Notifications extends Component {
  state = { prefs: {}, loading: true };

  componentDidMount() {
    this.fetchUser();
  }

  onEmailToggle = (event, data) => {
    this.setState(({ prefs }) => ({
      prefs: { ...prefs, emailNotifs: data.checked }
    }));
  };

  fetchUser = () => {
    api.fetchUser().then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ name, email, prefs, loading: false });
    });
  };

  editNotifs = () => {
    const { name, email, prefs } = this.state;
    this.setState({ loading: true });
    api.editUser({ name, email, prefs }).then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ name, email, prefs, loading: false });
    });
  };

  render() {
    const { prefs, loading } = this.state;
    const isEmailOn = prefs.emailNotifs;

    if (loading) {
      return <Loading />;
    }

    return (
      <Segment padded>
        <Header>
          <Header.Content>Notifications</Header.Content>
          <Header.Subheader>
            Update notification settings for your account.
          </Header.Subheader>
        </Header>
        <Divider />
        <Form>
          <Form.Field>
            <Checkbox
              onChange={this.onEmailToggle}
              checked={isEmailOn}
              name="emailNotifs"
              label={
                <label>
                  <Header size="small">
                    Send me email notifications
                    <Header.Subheader>
                      <Icon color="blue" name="info circle" />Emails are only
                      sent when cards need to be reviewed
                    </Header.Subheader>
                  </Header>
                </label>
              }
            />
          </Form.Field>
          <Form.Field>
            <Button onClick={this.editNotifs} primary>
              Update
            </Button>
          </Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default Notifications;
