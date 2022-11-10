export default function Header({ navigate }) {
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div id="header_wrapper">
      <div id="header">
        <li id="sitename">
          <a href="/login">Acebook</a>
        </li>
        <li>
          <p class='logout-btn' onClick={logout}>
            Logout <i className="fa-solid fa-right-from-bracket"></i>
          </p>
        </li>
      </div>
    </div>
  );
}
