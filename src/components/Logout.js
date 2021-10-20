import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { MdOutlineLogout } from "react-icons/md";

function Logout() {
  const { user } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    if (user) {
      await auth.signOut();
      history.push("/");
    }
  };
  return (
    <button type="button" onClick={handleLogout} className="logout-btn">
      Logout
      <span className="icon">
        <MdOutlineLogout aria-hidden="true" />
      </span>
    </button>
  );
}

export default Logout;
