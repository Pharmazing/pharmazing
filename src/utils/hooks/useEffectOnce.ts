import React from "react";

export const useEffectOnce = (effect: React.EffectCallback, [...deps]) => {
  const [needToCall, setNeedToCall] = React.useState(false);
  React.useEffect(() => {
    if (needToCall) {
      effect();
    } else {
      setNeedToCall(true);
    }
  }, [needToCall, ...deps]);
};
