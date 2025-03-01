import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Sidebar = () => {
  const { checkAuthUser, user } = useUserContext();
  const navigate = useNavigate();

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
            src={user.imageUrl || "/public/assets/images/profile.png"}
            alt="img"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
