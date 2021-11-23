import React from "react";
import { Navigate } from "react-router-dom";
import { get, post } from "../utils";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Register.css";

const DEFAULT_EXPERIENCE = 1;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      firstName: "",
      lastName: "",
      email: "",
      pronouns: "",
      classYear: "",
      livingGroup: "",
      priorExp: "",
      forCredit: "",
      shirtSize: "",
      redirect: false,
      experience: 3,
      mitId: "",
      kerb: "",
    };
    this.sliderRef = React.createRef();
  }

  componentDidMount() {
    this.getUser();
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  getUser = () => {
    get("/api/whoami")
      .then((userObj) => {
        this.setState({
          currentUser: userObj,
          firstName: userObj.first_name ? userObj.first_name : "",
          lastName: userObj.last_name ? userObj.last_name : "",
          errRedirect: !userObj || !userObj._id,
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
  };

  handleSubmit = (event) => {
    const {
      currentUser,
      firstName,
      lastName,
      email,
      pronouns,
      livingGroup,
      experience,
      forCredit,
      mitId,
      kerb,
      classYear,
    } = this.state;
    event.preventDefault();
    post(`/api/users/${currentUser._id}/update`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      for_credit: forCredit,
      statistics: {
        pronouns: pronouns,
        class_year: Number.parseInt(classYear),
        experience: experience,
        living_group: livingGroup,
        mit_id: Number.parseInt(mitId),
        kerb: kerb,
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
    if (!this.sliderRef.current) {
      return;
    }
    const bbox = this.sliderRef.current.getBoundingClientRect();
    this.sliderRef.current.style.setProperty("--tick-distance", `${(bbox.width - 20) / 4}px`);
  };

  render() {
    const { redirect, firstName, lastName, email, forCredit, shirtSize, errRedirect } = this.state;

    if (errRedirect || redirect) {
      return <Navigate to="/" />;
    }

    return (
      <div className="u-flex u-flexColumn u-flexCenter Register-container">
        <h1 className="Register-header">
          register for web<span className="Register-yellow">.</span>lab
        </h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName,
            lastName,
            email,
            forCredit,
            shirtSize,
            experience: DEFAULT_EXPERIENCE,
          }}
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
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.edu$/i.test(values.email)) {
              errors.email = "Invalid university email address";
            }
            if (values.mitId) {
              const idNum = Number.parseInt(values.mitId);
              if (Number.isNaN(idNum) || idNum.toString().length !== 9) {
                errors.mitId = "If provided, MIT ID # must be valid";
              }
            }
            if (values.classYear && (Number.parseInt(values.classYear).toString().length !== 4
              || Number.parseInt(values.classYear) < 1900)) {
              errors.classYear = "If provided, must be a valid year";
            }
            if (values.forCredit === "") {
              errors.forCredit = "Required";
            }
            if (values.shirtSize === "") {
              errors.shirtSize = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { currentUser } = this.state;
            const {
              firstName,
              lastName,
              email,
              pronouns,
              livingGroup,
              experience,
              forCredit,
              shirtSize,
              classYear,
              mitId,
              kerb,
            } = values;
            post(`/api/users/${currentUser._id}/update`, {
              first_name: firstName,
              last_name: lastName,
              email: email,
              for_credit: forCredit,
              statistics: {
                pronouns: pronouns,
                class_year: Number.parseInt(classYear),
                experience: experience,
                living_group: livingGroup,
                shirt_size: shirtSize,
                mit_id: Number.parseInt(mitId),
                kerb: kerb,
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
            <Form className="Register-formContainer">
              <div className="formGroup-two u-marginBottom-md">
                <div>
                  <div className="Register-label u-marginBottom-sm">first name</div>
                  <div>
                    <Field className="formInput" type="input" name="firstName" />
                    <ErrorMessage className="formError" name="firstName" component="div" />
                  </div>
                </div>
                <div>
                  <div className="Register-label u-marginBottom-sm">last name</div>
                  <div>
                    <Field className="formInput" type="input" name="lastName" />
                    <ErrorMessage className="formError" name="lastName" component="div" />
                  </div>
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="Register-label u-marginBottom-sm">university email address</div>
                <div>
                  <Field className="formInput" type="email" name="email" />
                  <ErrorMessage className="formError" name="email" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="Register-label u-marginBottom-sm">mit id # (if applicable)</div>
                <div>
                  <Field className="formInput" type="number" name="mitId" />
                  <ErrorMessage className="formError" name="mitId" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="Register-label u-marginBottom-sm">mit kerb (if not the same as email)</div>
                <div>
                  <Field className="formInput" type="input" name="kerb" />
                  <ErrorMessage className="formError" name="kerb" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="Register-label u-marginBottom-sm">
                  are you taking this class for mit course credit?
                </div>
                <div className="formInput-select--arrow">
                  <Field className="formInput-select" component="select" name="forCredit">
                    <option disabled value="">
                      -- select an option --
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Field>
                  <ErrorMessage className="formError" name="forCredit" component="div" />
                </div>
              </div>
              <div className="formGroup-two u-marginBottom-md u-positionRelative">
                <div>
                  <div className="Register-label u-marginBottom-sm">t-shirt size</div>
                  <div className="formInput-select--arrow">
                    <Field className="formInput-select" component="select" name="shirtSize">
                      <option disabled value="">
                        -- select an option --
                      </option>
                      <option value="xs">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </Field>
                    <ErrorMessage className="formError" name="shirtSize" component="div" />
                  </div>
                </div>
                <div>
                  <div className="Register-label u-marginBottom-sm">pronouns</div>
                  <div className="formInput-select--arrow">
                    <Field
                      className="formInput-select"
                      component="select"
                      name="pronouns"
                      defaultValue="filler"
                    >
                      <option disabled value="filler">
                        -- select an option --
                      </option>
                      <option value="he/him">he/him</option>
                      <option value="she/her">she/her</option>
                      <option value="they/them">they/them</option>
                      <option value="other">other</option>
                      <option value="prefer not">prefer not to say</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="Register-label u-marginBottom-sm">living group</div>
                <div className="formInput-select--arrow">
                  <Field
                    className="formInput-select"
                    component="select"
                    name="livingGroup"
                    defaultValue="filler"
                  >
                    <option disabled value="filler">
                      -- select an option --
                    </option>
                    <option value="baker">Baker</option>
                    <option value="bc">Burton-Conner</option>
                    <option value="ec">East Campus</option>
                    <option value="macgregor">MacGregor</option>
                    <option value="maseeh">Maseeh</option>
                    <option value="mcc">McCormick</option>
                    <option value="new">New House</option>
                    <option value="newvassar">New Vassar</option>
                    <option value="next">Next House</option>
                    <option value="random">Random Hall</option>
                    <option value="simmons">Simmons</option>
                    <option value="fsilg">FSILG</option>
                    <option value="offcampus">Off Campus</option>
                  </Field>
                </div>
              </div>
              <div className="u-marginBottom-md">
                <div className="Register-label u-marginBottom-sm">graduation year (e.g. 2023)</div>
                <div>
                  <Field className="formInput" type="number" name="classYear" />
                  <ErrorMessage className="formError" name="classYear" component="div" />
                </div>
              </div>
              <div className="u-marginBottom-md u-positionRelative">
                <div className="Register-label u-marginBottom-sm">prior experience</div>
                <div className="formInput-rangeContainer" ref={this.sliderRef}>
                  <Field
                    type="range"
                    min="1"
                    max="5"
                    name="experience"
                    className="formInput-range"
                  />
                </div>
                <div className="u-fontSm Register-label u-flex u-flexJustifyBetweeen u-marginTop-sm">
                  <div>none</div>
                  <div className="u-textRight">expert</div>
                </div>
              </div>
              <button className="Register-button" type="submit" disabled={isSubmitting}>
                register
              </button>
            </Form>
          )}
        </Formik>
        <div className="Register-help">
          Have any questions? Email <a href="mailto:weblab-staff@mit.edu">weblab-staff@mit.edu</a>
        </div>
      </div>
    );
  }
}

export default Register;
