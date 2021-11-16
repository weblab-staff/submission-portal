import React from "react";
import { Navigate } from "react-router-dom";
import { get, post } from "../../utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Nav from "../StudentView/StudentNav";
import Back from "../ui/Back";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      isCompeting: "",
      redirect: false,
      newTeam: "",
      error: false,
    };
  }

  handleChange = (event) => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value,
    });
  };

  handleSubmit = (event) => {
    const { teamName, isCompeting } = this.state;
    event.preventDefault();
    post(`/api/teams/`, {
      team_name: teamName,
      is_competing: isCompeting,
    })
      .then((response) => {
        console.log(response);
        get(`/api/teams/${response._id}`)
          .then((teamObj) => {
            this.setState({
              redirect: true,
              newTeam: teamObj,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err);
      });
  };

  validateName = (name) => {
    if (name.length > 50) return "team name is too long";

    // accept all ascii except backslash
    if (/^[\x20-\x5b\x5d-\x7F]*$/.test(name)) return;
    return "team name contains illegal characters";
  };

  render() {
    const { teamName, isCompeting, redirect, newTeam } = this.state;

    if (redirect) {
      return (
        <Navigate to="/" />
      );
    }
    return (
      <>
        <Nav loggedIn />
        <div className="StudentView-container">
          <h1 className="StudentView-greetingHeader u-positionRelative">
            <Back absolute to="/" />
            Create Team
          </h1>
          <Formik
            enableReinitialize={true}
            initialValues={{
              teamName,
              isCompeting,
            }}
            validate={(values) => {
              let errors = {};
              if (!values.teamName) {
                errors.teamName = "Required";
              }
              if (!values.isCompeting) {
                errors.isCompeting = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { teamName, isCompeting } = values;
              console.log(teamName, isCompeting);
              event.preventDefault();
              post(`/api/teams/`, {
                team_name: teamName,
                is_competing: isCompeting,
              })
                .then((response) => {
                  console.log(response);
                  get(`/api/teams/${response._id}`)
                    .then((teamObj) => {
                      this.setState({
                        redirect: true,
                        newTeam: teamObj,
                      });
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => {
                  this.setState({ error: true });
                  console.log(err);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="u-marginBottom-md">
                  <div className="Register-label">team name</div>
                  <Field
                    className="formInput"
                    type="text"
                    name="teamName"
                    validate={this.validateName}
                  />
                  <ErrorMessage className="formError" name="teamName" component="div" />
                </div>
                <div className="u-positionRelative u-marginBottom-md">
                  <label className="Register-label">is your team competing?</label>
                  <div className="formInput-select--arrow">
                    <Field className="formInput-select" component="select" name="isCompeting">
                      <option disabled value="">
                        -- select an option --
                      </option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Field>
                    <ErrorMessage className="formError" name="isCompeting" component="div" />
                  </div>
                </div>
                <button className="Register-button" type="submit" disabled={isSubmitting}>
                  create
                </button>
                {this.state.error && (
                  <span>Team name invalid or already taken! Refresh and try a different one.</span>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}

export default CreateTeam;
