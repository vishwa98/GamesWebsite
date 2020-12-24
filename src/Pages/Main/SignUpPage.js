import React from "react";
import Content from "../customer/Content";
import { useHistory } from "react-router-dom";
import { SetValuesOnStorage } from "../../Util";
import UserType from "../../Util/UserType";

const prefix =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_LOCAL_BASE_SERVER_URL + "/"
    : "";
const URL = prefix + "api/auth/register";

export default function SignUpPage() {
  const errorAlert = (msg) => {
    return (
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    );
  };
  const history = useHistory();
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [rePassword, setRePassword] = React.useState("");
  const [showPassFeedBack, setShowPassFeedBack] = React.useState(false);
  const [error, setError] = React.useState("");

  const register = (e, newUser) => {
    // prevent submission
    e.preventDefault();

    // send the post request
    console.log("Sending the register request: " + URL);

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.response);
        } else {
          // successfully signed up
          setError("");

          alert("Registration successful. Click ok to proceed");
          
          console.log(data);
          // redirect to the correct page according to the user dashboard
          history.push("/signin");
        }
      })
      .catch((err) => setError(err));
  };

  const setValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const setRePasswordValid = (e) => {
    if (e.target.value.length > 0 && user.password.length > 0) {
      setShowPassFeedBack(true);
    }
    console.log("test: " + showPassFeedBack);
    setRePassword(e.target.value);
  };

  return (
    <Content>
      <div className="container mt-5">
        {error && errorAlert(error)}
        <form onSubmit={register}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="Charlie"
                name="firstName"
                value={user.firstName}
                onChange={setValue}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputLastName"
                placeholder="Smith"
                name="lastName"
                value={user.lastName}
                onChange={setValue}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={setValue}
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={setValue}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputConfirmPassword">Confirm Password</label>
              <input
                type="password"
                className={
                  "form-control" +
                  (showPassFeedBack
                    ? rePassword === user.password
                      ? " is-valid"
                      : " is-invalid"
                    : "")
                }
                id="inputConfirmPassword"
                placeholder="Password"
                value={rePassword}
                onChange={setRePasswordValid}
              />
              <div className="invalid-feedback">Password does not match!</div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Content>
  );
}
