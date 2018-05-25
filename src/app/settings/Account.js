import React, { Component } from "react";
import {
  Button,
  Divider,
  Header,
  Form,
  Input,
  Segment
} from "semantic-ui-react";
import { DeleteUserModal, MODAL_TYPES } from "../../components/modals";
import { Loading } from "../../components";

import * as api from "./userActions";

class Account extends Component {
  state = {
    user: { name: "", email: "", prefs: {} },
    showModalType: undefined,
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchUser();
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState(({ user }) => ({ user: { ...user, [name]: value } }));
  };

  onCloseModal = () => this.setState({ showModalType: undefined });

  onShowModal = (event, data) => this.setState({ showModalType: data.value });

  fetchUser = () => {
    api.fetchUser().then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ user: { name, email, prefs }, isLoading: false });
    });
  };

  editUser = () => {
    const { user } = this.state;
    this.setState({ isLoading: true });
    api.editUser(user).then(({ data }) => {
      const { name, email, prefs } = data;
      this.setState({ user: { name, email, prefs }, isLoading: false });
    });
  };

  deleteUser = () => {
    // isLoading never gets set back to false since the component unmounts after deletion
    this.setState({ isLoading: true });
    api.deleteUser().then(response => {
      this.props.history.push("/logout");
    });
  };

  render() {
    const { user, showModalType, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        <DeleteUserModal
          open={showModalType === MODAL_TYPES.DELETE_USER}
          onClose={this.onCloseModal}
          onSubmit={this.deleteUser}
        />
        <Segment padded>
          <Form>
            <Header>
              <Header.Content>Profile</Header.Content>
              <Header.Subheader>
                Update profile information for your account
              </Header.Subheader>
            </Header>
            <Divider />
            <Form.Field>
              <label>Name</label>
              <Input
                onChange={this.onChange}
                name="name"
                placeholder="Enter full name"
                value={user.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                onChange={this.onChange}
                name="email"
                placeholder="Enter email"
                value={user.email}
              />
            </Form.Field>
            <Form.Field className="mt-4">
              <Button onClick={this.editUser} primary>
                Update
              </Button>
            </Form.Field>
          </Form>
        </Segment>
        <Segment className="mt-5" color="red" padded>
          <Header>Delete your account</Header>
          <p>
            Do you wish to delete your account? This is permament and all your
            data will be permanently erased?
          </p>
          <Button
            negative
            onClick={this.onShowModal}
            basic
            value={MODAL_TYPES.DELETE_USER}
          >
            Delete
          </Button>
        </Segment>
      </div>
    );
  }
}

export default Account;
