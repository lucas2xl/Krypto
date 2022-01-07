import React, { useState } from 'react';

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../images/logo.png';

interface INavbarProps {}
interface INavBarItemProps {
  title: string;
  classProps?: any;
}
interface INaveBarItems {
  title: string;
  id: string;
}

const NavbarItem = ({ title, classProps }: INavBarItemProps) => (
  <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
);

export const Navbar = (props: INavbarProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [animated, setAnimated] = useState('animate-slide-in');

  const naveBarItems: INaveBarItems[] = [
    { title: 'Market', id: '0001' },
    { title: 'Exchange', id: '0002' },
    { title: 'Tutorials', id: '0003' },
    { title: 'Wallets', id: '0004' },
  ];

  return (
    <div className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {naveBarItems.map((item) => (
          <NavbarItem key={item.id} title={item.title} />
        ))}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg[#2546bf]">
          Login
        </li>
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => {
              setAnimated('animate-slide-in');
              setTimeout(() => setToggleMenu(true));
            }}
          />
        )}
        {toggleMenu && (
          <ul
            className={`z-10 fixed top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl
            md:hidden list-none flex flex-col justify-start items-end rounded-md
            blue-glassmorphism text-white ${animated}`}>
            <li className="text-xl w-full my-2 cursor-pointer">
              <AiOutlineClose
                onClick={() => {
                  setAnimated('animate-slide-out');
                  setTimeout(() => setToggleMenu(false), 500);
                }}
              />
            </li>
            {naveBarItems.map((item) => (
              <NavbarItem
                key={item.id}
                title={item.title}
                classProps="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
