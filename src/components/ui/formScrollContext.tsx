import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  type RefObject,
} from 'react';
import type { ScrollViewInstance, ViewInstance } from 'react-native';

import { SPACING } from '@/constants/theme';

type FormScrollContextValue = {
  scrollToView: (target: ViewInstance | null) => void;
};

const FormScrollContext = createContext<FormScrollContextValue | null>(null);

export function useFormScroll() {
  return useContext(FormScrollContext);
}

type FormScrollCoordinatorProps = {
  scrollRef: RefObject<ScrollViewInstance | null>;
  contentRef: RefObject<ViewInstance | null>;
  children: ReactNode;
};

export function FormScrollCoordinator({
  scrollRef,
  contentRef,
  children,
}: FormScrollCoordinatorProps) {
  const scrollToView = useCallback(
    (target: ViewInstance | null) => {
      const scrollNode = scrollRef.current;
      const contentNode = contentRef.current;

      if (!target || !scrollNode || !contentNode) {
        return;
      }

      requestAnimationFrame(() => {
        target.measureLayout(
          contentNode,
          (_x, y) => {
            scrollRef.current?.scrollTo({
              y: Math.max(0, y - SPACING.lg),
              animated: true,
            });
          },
          () => {
            // Layout measurement can fail before mount; ignore.
          },
        );
      });
    },
    [contentRef, scrollRef],
  );

  const value = useMemo(() => ({ scrollToView }), [scrollToView]);

  return (
    <FormScrollContext.Provider value={value}>{children}</FormScrollContext.Provider>
  );
}
