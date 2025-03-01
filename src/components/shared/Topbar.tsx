import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "sonner";

const Topbar = () => {
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
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src={"/assets/images/logo.svg"}
            alt="Logo"
            height={325}
            width={130}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant={"ghost"}
            className="shad-button_ghost"
            onClick={signOutHandler}
          >
            <img src={"/assets/icons/logout.svg"} alt="Logout logo" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/public/assets/images/profile.png"}
              alt="img"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
