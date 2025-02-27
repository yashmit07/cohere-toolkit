'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import { SettingsStore, createSettingsSlice } from '@/stores/slices/settingsSlice';
import { UserPreferencesStore, createUserPreferencesSlice } from '@/stores/slices/userPreferencesSlice';

type PersistedStore = SettingsStore & UserPreferencesStore;

const useEmptyPersistedStore = create<PersistedStore>((...a) => ({
  ...createSettingsSlice(...a),
  ...createUserPreferencesSlice(...a),
}));

const usePersistedStore = create<PersistedStore>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createUserPreferencesSlice(...a),
    }),
    {
      name: 'persisted-store',
      version: 2,
    }
  )
);
/**
 * Wrap usePersistedStore with a hook that returns an empty store until the persisted store is hydrated.
 * This avoids an issue where the server-rendered HTML does not match with the first client render,
 * since the server cannot load from localStorage and renders with an empty store, while the client
 * would load from localStorage and render with a hydrated store.
 *
 * By waiting until after a useEffect completes for the client render, the first render will use
 * an empty store and match the server.
 *
 * @see https://github.com/pmndrs/zustand/issues/1145#issuecomment-1207233036
 */
const usePersistedStoresWithHydration = ((selector, compare) => {
  const emptyStore = useEmptyPersistedStore(selector, compare);
  const store = usePersistedStore(selector, compare);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return hydrated ? store : emptyStore;
}) as typeof usePersistedStore;

export const useSettingsStore = () => {
  return usePersistedStoresWithHydration(
    (state) => ({
      disabledAssistantKnowledge: state.disabledAssistantKnowledge,
      isLeftPanelOpen: state.isLeftPanelOpen,
      isRightPanelOpen: state.isRightPanelOpen,
      showSteps: state.showSteps,
      showCitations: state.showCitations,
      setLeftPanelOpen: state.setLeftPanelOpen,
      setRightPanelOpen: state.setRightPanelOpen,
      setUseAssistantKnowledge: state.setUseAssistantKnowledge,
      setShowSteps: state.setShowSteps,
      setShowCitations: state.setShowCitations,
      isHotKeysDialogOpen: state.isHotKeysDialogOpen,
      setIsHotKeysDialogOpen: state.setIsHotKeysDialogOpen,
    }),
    shallow
  );
};

export const useUserPreferences = () => {
  return usePersistedStoresWithHydration(
    (state) => ({
      name: state.userPreferences.name,
      language: state.userPreferences.language,
      setName: state.setName,
      setLanguage: state.setLanguage,
    }),
    shallow
  );
};

export { usePersistedStore };