import { useContext } from "react";
import { authContext } from "../../contexts/authContext.js";
import { assets } from "../../api/assets.js";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(authContext);

  console.log(user);

  return (
    <div className="Profile">
      {user && (
        <>
          <aside>
            {user.avatar && <img src={`${assets}${user.avatar.id}`} alt="" />}
            <p className="name">
              {user.last_name && user.last_name} {user.first_name && user.first_name}
            </p>
            <p> {user.role && user.role.name}</p>
            <p>{user.title && user.title}</p>
          </aside>
          <section>
            <h2>Informations</h2>
            <hr />
            <div className="grid">
              {user && user.email && (
                <div className="item">
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
              )}

              {user && user.location && (
                <div className="item">
                  <h3>Localisation</h3>
                  <p>{user.location}</p>
                </div>
              )}

              {user && user.phone && (
                <div className="item">
                  <h3>Téléphone</h3>
                  <p>{user.phone}</p>
                </div>
              )}

              {user && user.url && (
                <div className="item">
                  <h3>Localisation</h3>
                  <p>{user.url}</p>
                </div>
              )}
            </div>

            <h2>Mes Formations</h2>
            <hr />
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;
