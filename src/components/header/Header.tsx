import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-green-900 text-white">
        <div className="container flex justify-between text-lg mx-8">
          <div className="font-bold text-xl">
            <Link to="/">Receitas.com</Link>{" "}
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link to="/receitas" className="hover:text-green-200 transition">
              Receitas
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
