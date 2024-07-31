import React from 'react';
import { isAndroid, isIOS } from '../utils';
import { ActivityMobile } from '../components/organisms';

export default function ActivityLayout() {
  return <>{(isIOS || isAndroid) && <ActivityMobile />}</>;
}
