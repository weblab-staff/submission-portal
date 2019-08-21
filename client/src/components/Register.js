import React from "react";
import { Redirect } from "react-router-dom";
import { get, post } from "../utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./../css/register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      // classYear: "", TODO add class year
      livingGroup: "",
      priorExp: "",
      forCredit: true,
      redirect: false,
      experience: 3,
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    get("/api/whoami")
      .then((userObj) => {
        this.setState({
          currentUser: userObj,
          firstName: userObj.first_name ? userObj.first_name : "",
          lastName: userObj.last_name ? userObj.last_name : "",
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value,
    });
  };

  handleRangeChange = (event) => {
    const value = event.target.value;
    this.setState({ experience: value });
    this.handleResize();
  };

  handleSubmit = (event) => {
    const {
      currentUser,
      firstName,
      lastName,
      email,
      gender,
      livingGroup,
      experience,
      forCredit,
    } = this.state;
    event.preventDefault();
    post(`/api/users/${currentUser._id}/update`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      for_credit: forCredit,
      statistics: {
        gender: gender,
        // class_year: Number,
        experience: experience,
        living_group: livingGroup,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          redirect: response === 204,
        });
      })
      .catch((err) => console.log(err));
  };

  handleResize = () => {
    //TODO: find out where this should actually be called
    if (!this.sliderRef.current) {
      return;
    }
    const bbox = this.sliderRef.current.getBoundingClientRect();
    this.sliderRef.current.style.setProperty(
      "--tick-distance",
      `${(bbox.width - 20) / 4}px`
    );
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="browserContainer u-flex u-flexCenter">
        <Formik
          enableReinitialize={true}
          initialValues={this.state}
          validate={(values) => {
            let errors = {};
            if (!values.firstName) {
              errors.firstName = "Required";
            }
            if (!values.lastName) {
              errors.lastName = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i.test(values.email)
            ) {
              errors.email = "Invalid university email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { currentUser } = this.state;
            const {
              firstName,
              lastName,
              email,
              gender,
              livingGroup,
              experience,
              forCredit,
            } = values;
            post(`/api/users/${currentUser._id}/update`, {
              first_name: firstName,
              last_name: lastName,
              email: email,
              for_credit: forCredit,
              statistics: {
                gender: gender,
                // class_year: classYear,
                experience: experience,
                living_group: livingGroup,
              },
            })
              .then((response) => {
                console.log(response);
                this.setState({
                  redirect: response === 204,
                });
              })
              .catch((err) => console.log(err));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="register-formContainer">
              <div className="u-marginBottom-md">
                <div className="u-formLabel u-marginBottom-sm">first name</div>
                <div>
                  <Field className="formInput" type="input" name="firstName" />
                  <ErrorMessage name="firstName" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="u-formLabel u-marginBottom-sm">last name</div>
                <div>
                  <Field className="formInput" type="input" name="lastName" />
                  <ErrorMessage name="lastName" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="u-formLabel u-marginBottom-sm">
                  university email address
                </div>
                <div>
                  <Field className="formInput" type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="u-formLabel u-marginBottom-sm">
                  Are you taking this class for credit?
                </div>
                <div className="formInput-select--arrow">
                  <Field
                    className="formInput-select"
                    component="select"
                    name="forCredit"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Field>
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="u-formLabel u-marginBottom-sm">gender</div>
                <div className="formInput-select--arrow">
                  <Field
                    className="formInput-select"
                    component="select"
                    name="gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="u-formLabel u-marginBottom-sm">
                  living group
                </div>
                <div>
                  <Field className="formInput" name="livingGroup" />
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="u-formLabel u-marginBottom-sm">
                  prior experience
                </div>
                <div className="formInput-rangeContainer" ref={this.sliderRef}>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    name="experience"
                    value={this.state.experience}
                    onChange={this.handleRangeChange}
                    className="formInput-range"
                  />
                </div>
                <div className="u-fontSm u-formLabel u-flex u-flexJustifyBetweeen u-marginTop-sm">
                  <div>none</div>
                  <div className="u-textRight">expert</div>
                </div>
              </div>
              {/* <div className="u-marginBottom-md">
                <div className="u-formLabel u-marginBottom-sm">experience</div>
                <div>
                  <Field type="radio" name="experience" value="0" />
                  <Field type="radio" name="experience" value="1" />
                  <Field type="radio" name="experience" value="2" />
                  <Field type="radio" name="experience" value="3" />
                  <Field type="radio" name="experience" value="4" />
                </div>
              </div> */}
              <button
                className="studentButton"
                type="submit"
                disabled={isSubmitting}
              >
                register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Register;
