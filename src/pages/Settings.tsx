import { SettingsMobile } from '../components/organisms';
import { isAndroid, isIOS } from '../utils';

export default function SettingsLayout() {
  return <>{(isIOS || isAndroid) && <SettingsMobile />}</>;
}
