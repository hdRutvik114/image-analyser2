import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-600 text-white px-6 py-5 flex justify-between items-center">
      <h1 className="text-[25px] font-bold">ImageAnalyser</h1>
      <div className="space-x-4 flex gap-1">
         <li className="list-none"><Link to="/"    className="hover:underline " > Home</Link>  </li>
         <li className="list-none"><Link to="/Work"    className="hover:underline " > Work</Link>  </li>
         <li className="list-none"><Link to="/About"   className="hover:underline " > About</Link>  </li>
         <li className="list-none"><Link to="/contact" className="hover:underline " > Contact</Link>  </li>

      </div>
    </nav>
  );

}
export default Navbar;