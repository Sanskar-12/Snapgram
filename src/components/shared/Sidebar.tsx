import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Sidebar = () => {
  const { checkAuthUser, user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutateAsync: signOut } = useSignOutAccountMutation();

  const signOutHandler = async () => {
    const session = await signOut();

    if (!session) {
      return toast("Sign out failed, Please try again.");
    }

    const isLoggedIn = await checkAuthUser();
    if (!isLoggedIn) {
      navigate("/sign-in");
    } else {
      return toast("Sign out failed, Please try again.");
    }
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src={"/assets/images/logo.svg"}
            alt="Logo"
            height={325}
            width={130}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile.png"}
            alt="img"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${
                  isActive && "bg-primary-500"
                } group`}
              >
                <NavLink
                  to={link.route}
                  className={"flex gap-4 items-center p-4"}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={signOutHandler}
      >
        <img src={"/assets/icons/logout.svg"} alt="Logout logo" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default Sidebar;
