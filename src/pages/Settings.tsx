import SettingsMobile from "../components/organisms/Settings/Settings.mobile";
import { isAndroid, isIOS } from "../utils";

export default function SettingsLayout() {
  return <>{(isIOS || isAndroid) && <SettingsMobile />}</>;
}
