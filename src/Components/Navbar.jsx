import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Navbar = () => {
  return (
    <>
      <nav className="bg-zinc-100 body-font fixed tpo-0 z-10 w-full">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <Link to="/" className="flex items-center space-x-4 title-font font-bold mb-4 md:mb-0">
          <img src={logo} alt="logo" className='w-10' />
            <p className="text-2xl">NEWS <span className='text-red-500'>MARK</span></p>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;