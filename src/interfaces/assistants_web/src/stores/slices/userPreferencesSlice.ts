import { StateCreator } from 'zustand';
import { LANGUAGE } from '@/constants';

type State = {
  name: string;
  language: LANGUAGE | null;
};

type Actions = {
  setName: (name: string) => void;
  setLanguage: (language: LANGUAGE) => void;
};

export type UserPreferencesStore = {
userPreferences: State;
} & Actions;

const INITIAL_STATE: State = {
  name: '',
  language: null,
};

export const createUserPreferencesSlice: StateCreator<UserPreferencesStore, [], [], UserPreferencesStore> = (set) => ({
  userPreferences: INITIAL_STATE,
  
  setName: (name: string) => 
    set((state) => ({
      userPreferences: {
        ...state.userPreferences,
        name,
      },
    })),
    
  setLanguage: (language: LANGUAGE) => 
    set((state) => ({
      userPreferences: {
        ...state.userPreferences,
        language,
      },
    })),
}); 