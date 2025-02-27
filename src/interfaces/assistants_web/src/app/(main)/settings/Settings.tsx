'use client';

import { PropsWithChildren, useState, useEffect } from 'react';

import { MobileHeader } from '@/components/Global';
import {
  Button,
  DarkModeToggle,
  Icon,
  IconName,
  ShowCitationsToggle,
  ShowStepsToggle,
  Tabs,
  Text,
  Input,
  InputLabel,
  Dropdown,
  Box,
  Notification,
} from '@/components/UI';
import { TOOL_GITHUB_ID, TOOL_GMAIL_ID, TOOL_SHAREPOINT_ID, TOOL_SLACK_ID, SUPPORTED_LANGUAGES, LANGUAGE } from '@/constants';
import { cn } from '@/utils';
import { useUserPreferences } from '@/stores';

import { Connection } from './Connection';

const tabs: { key: string; icon: IconName; label: string }[] = [
  { key: 'connections', icon: 'users-three', label: 'Connections' },
  { key: 'appearance', icon: 'sun', label: 'Appearance' },
  { key: 'advanced', icon: 'settings', label: 'Advanced' },
  { key: 'profile', icon: 'profile', label: 'Profile' },
];

export const Settings: React.FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-grow flex-col overflow-y-auto rounded-lg border border-marble-950 bg-marble-980 dark:border-volcanic-100 dark:bg-volcanic-100 md:ml-0">
      <header
        className={cn(
          'border-b border-marble-950 bg-cover dark:border-volcanic-200',
          'px-4 py-6 lg:px-10 lg:py-10',
          'flex flex-col gap-y-3'
        )}
      >
        <MobileHeader />
        <div className="flex items-center gap-2">
          <Text styleAs="h4" className="text-volcanic-400 dark:text-mushroom-950">
            Settings
          </Text>
        </div>
      </header>
      <section className="p-8">
        <Tabs
          tabs={tabs.map((tab) => (
            <div className="flex items-center gap-2" key={tab.key}>
              <Icon name={tab.icon} kind="outline" />
              <Text>{tab.label}</Text>
            </div>
          ))}
          selectedIndex={selectedTabIndex}
          onChange={setSelectedTabIndex}
          tabGroupClassName="h-full"
          tabClassName="pt-2.5"
          panelsClassName="pt-7 lg:pt-7 px-0 flex flex-col rounded-b-lg md:rounded-b-none"
          fitTabsContent
        >
          <Connections />
          <Appearance />
          <Advanced />
          <Profile />
        </Tabs>
      </section>
    </div>
  );
};

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="max-w-screen-xl flex-grow overflow-y-auto">{children}</div>
);

const Appearance: React.FC = () => (
  <Wrapper>
    <Text styleAs="h5" className="mb-6">
      Mode
    </Text>
    <DarkModeToggle />
  </Wrapper>
);

const Advanced: React.FC = () => (
  <Wrapper>
    <Text styleAs="h5" className="mb-6">
      Advanced
    </Text>
    <ShowStepsToggle />
    <ShowCitationsToggle />
  </Wrapper>
);

const Profile: React.FC = () => {
  const { name, language, setName, setLanguage } = useUserPreferences();
  const [nameInput, setNameInput] = useState(name || '');
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE | null>(language);
  const [showUpdateNotif, setShowUpdateNotif] = useState(false);

  useEffect(() => {
    setNameInput(name || '');
    setSelectedLanguage(language);
  }, [name, language]);

  const handleUpdate = () => {
    if (nameInput.trim()) {
      setName(nameInput.trim());
    }
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
    setShowUpdateNotif(true);
    setTimeout(() => setShowUpdateNotif(false), 3000);
  };

  return (
    <>
      <Notification 
        show={showUpdateNotif}
        onHide={() => setShowUpdateNotif(false)}
        theme="default"
        duration={2000}
      >
        Profile settings updated
      </Notification>

      <Wrapper>
        <Text styleAs="h5" className="mb-6">
          User Profile
        </Text>

        <Box>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <InputLabel label="What should we call you?" />
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Language Selection */}
              <div>
                <InputLabel label="Preferred Language" />
                <Dropdown
                  value={selectedLanguage?.code}
                  onChange={(value) => {
                    const lang = SUPPORTED_LANGUAGES.find(l => l.code === value);
                    if (lang) setSelectedLanguage(lang);
                  }}
                  options={SUPPORTED_LANGUAGES.map(lang => ({
                    value: lang.code,
                    label: `${lang.flag} ${lang.name} (${lang.nativeName})`
                  }))}
                  placeholder="Select a language"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end pt-4">
              <Button 
                label="Update Profile" 
                onClick={handleUpdate} 
                kind="primary"
                theme="default"
                className="rounded-full px-6 !text-white"
                disabled={
                  !nameInput.trim() ||
                  !selectedLanguage || 
                  (nameInput.trim() === name && selectedLanguage === language)
                }
              />
            </div>
          </div>
        </Box>

        {/* Logout Button */}
        <div className="flex mt-8">
          <Button 
            label="Log out" 
            href="/logout" 
            kind="secondary" 
            icon="sign-out" 
            theme="default" 
          />
        </div>
      </Wrapper>
    </>
  );
};

const Connections: React.FC = () => (
  <Wrapper>
    <Text styleAs="h5" className="mb-6">
      Connections your assistants can access
    </Text>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <GoogleDriveConnection />
      <SlackConnection />
      <GmailConnection />
      <GithubConnection />
      <SharepointConnection />
    </div>
  </Wrapper>
);

const GoogleDriveConnection: React.FC = () => (
  <Connection
    toolId="google_drive"
    toolName="Google Drive"
    iconName="google-drive"
    description="Connect to Google Drive and add files to the assistant"
    showSyncButton={true}
  />
);

const SlackConnection: React.FC = () => (
  <Connection
    toolId={TOOL_SLACK_ID}
    toolName="Slack"
    iconName="slack"
    description="Connect to Slack"
    showSyncButton={false}
  />
);

const GmailConnection: React.FC = () => (
  <Connection
    toolId={TOOL_GMAIL_ID}
    toolName="Gmail"
    iconName="gmail"
    description="Connect to Gmail"
    showSyncButton={false}
  />
);

const GithubConnection: React.FC = () => (
  <Connection
    toolId={TOOL_GITHUB_ID}
    toolName="Github"
    iconName="github"
    description="Connect to Github"
    showSyncButton={false}
  />
);

const SharepointConnection: React.FC = () => (
  <Connection
    toolId={TOOL_SHAREPOINT_ID}
    toolName="Sharepoint"
    iconName="sharepoint"
    description="Connect to Sharepoint"
    showSyncButton={false}
  />
);
