import Activity from "../../src/pages/Activity";
import { SecuredRoute } from "../../src/pages/SecuredRoute";

export default function Page() {
  return (
    <SecuredRoute>
      <Activity />
    </SecuredRoute>
  );
}
