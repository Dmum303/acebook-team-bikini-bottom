export default function Header({ navigate, title }) {
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
          <h2 className='feed-title'>{ title }</h2>
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
