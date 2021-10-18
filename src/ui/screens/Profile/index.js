import React from "react";
import { connect } from "react-redux";
import Feed from "../Timeline";

function Profile({ email, user }) {
  return (
    <React.Fragment>
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body text-center">
            <h5 className="card-title text-center">Logged in as</h5>

            <img
              src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"
              className="mb-3"
              alt="user profile"
              height="50px"
            />
            <h3 className="font-weight-bold text-center">{user.username}</h3>
            <p className="card-title text-center">{email}</p>

            {/* <div className="row mt-4">
              <div className="col-sm-4">
                <p>Posts</p>
                <h3>0</h3>
              </div>
              <div className="col-sm-4">
                <p>Likes</p>
                <h3>0</h3>
              </div>
              <div className="col-sm-4">
                <p>Comments</p>
                <h3>0</h3>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Feed />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state?.authReducer?.user,
  email: state?.authReducer?.email,
});

export default connect(mapStateToProps)(Profile);
