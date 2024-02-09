import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const UserAuthenticatedLayout = ({ children }) => {
  const token = Cookies.get("access-token");

  if (!token) {
    redirect("/auth/login");
  }

  return (
    <div>
      <span>{token}</span>
      {children}
    </div>
  );
};

export default UserAuthenticatedLayout;
