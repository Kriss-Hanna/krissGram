import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return(
    <nav className="leftsidebar">
    <div className="flex flex-col gap-11" >
    <Link to="/" className="flex-between gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

      <Link to={`/profile/${user.id}`} className="flex gap-3 items-center"> 
      <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full"  />
      <div className="flex flex-col">
        <p className="body-bold">{user.name}</p>
        <p className="small-regula text-light-3">@{user.username}</p>
      </div>
      </Link>

      <ul className="flex flex-col gap-6">
       {sidebarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route

        return (
          <li key={link.label} className={`${isActive && 'bg-primary-500'} leftsidebar-link group`}>
            <NavLink to={`${link.route}`} className="flex gap-4 items-center p-4" >
              <img src={link.imgURL } alt={link.label} className={`${isActive && 'invert-white'} group-hover:invert-white`}  />
               {link.label}
              </NavLink>
          </li>
        )   
       })}
      </ul>
    </div>  
  </nav>
  ) 
};

export default LeftSidebar;
