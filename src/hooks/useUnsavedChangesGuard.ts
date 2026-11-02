import { usePreventRemove } from 'expo-router';
import { useCallback, useState } from 'react';
import { appAlert } from '@/utils/appAlert';

type GuardCopy = {
  title: string;
  message: string;
  discardLabel?: string;
};

export function useUnsavedChangesGuard(
  hasUnsavedChanges: boolean,
  { title, message, discardLabel = 'Discard' }: GuardCopy,
) {
  const [bypass, setBypass] = useState(false);

  const disablePrevention = usePreventRemove(
    hasUnsavedChanges && !bypass,
    ({ repeat }) => {
      appAlert(title, message, [
        { text: 'Keep editing', style: 'cancel' },
        {
          text: discardLabel,
          style: 'destructive',
          onPress: () => {
            setBypass(true);
            repeat();
          },
        },
      ]);
    },
  );

  return useCallback(() => {
    setBypass(true);
    disablePrevention();
  }, [disablePrevention]);
}
