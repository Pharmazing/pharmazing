import { isAndroid, isIOS } from "../../src/utils";
import SetLocationLayout from "../../src/pages/SetLocation";

export default function Page() {
  return (isIOS || isAndroid) && <SetLocationLayout />;
}
