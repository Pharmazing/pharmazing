import { default as SignIn } from "../../app/signin";
import { useSession } from "../utils/context";

export const SecuredRoute = ({ children }: React.PropsWithChildren) => {
  const { session } = useSession();
  return session ? children : <SignIn />;
};
