import ActivityLayout from "../../src/pages/Activity";
import { SecuredRoute } from "../../src/pages/SecuredRoute";

export default function Page() {
  return (
    <SecuredRoute>
      <ActivityLayout />
    </SecuredRoute>
  );
}
