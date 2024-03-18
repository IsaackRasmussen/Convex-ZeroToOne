import { useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { SpeedInsights } from "@vercel/speed-insights/react"

import MessagesMailView from "./MessagesMailView";
import TeamsView from "./TeamsView"

export default function App() {
  return (
    <div className="app border-1 surface-border gap-2 ">
      <Authenticated>
        <TabView className="content">
          <TabPanel header="Welcome" className="flex">
            <CreateTeamCard />
          </TabPanel>
          <TabPanel header="Teams">
            <TeamsView></TeamsView>
          </TabPanel>
          <TabPanel header="E-mails">
            <MessagesMailView></MessagesMailView>
          </TabPanel>
        </TabView>
      </Authenticated>

      <Unauthenticated>
        <TabView className="content">
          <TabPanel header="Sign-in">
            <p className="m-0">
              Do you already have a login?
            </p>
            <p>
              <SignInButton mode="modal">
                <Button label="Sign-in or create new user" />
              </SignInButton>
            </p>
          </TabPanel>
        </TabView>

      </Unauthenticated>
      <AuthLoading><ProgressSpinner /></AuthLoading>
      <SpeedInsights />
    </div>
  );
}

function CreateTeamCard() {
  const addTeam = useMutation(api.teams.addTeam);
  const listTeams = useQuery(api.teams.listTeams, { parentId: undefined }) || [];
  const { user } = useUser();

  const [newTeamName, setNewTeamName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [isNewTeamNameValid, setIsNewTeamNameValid] = useState(true);

  return (
    <Card title="Collab team">
      <p className="m-0">
        If you don't have one already, you can now create a group email to start collaborating.
      </p>
      <p>Note. your email address will not be saved but your name will be saved for the chart. All data will be deleted after the hackaton</p>
      <p>Enter a team name and it will be created as team-name@kaka-dou.com</p>
      <div className="p-inputgroup flex-1">
        <Dropdown value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.value)} options={listTeams} optionLabel="teamName" optionValue="_id"
          placeholder="Select a parent team" className="w-full md:w-14rem" />

        <InputText value={newTeamName} placeholder="team-name" onChange={async (e) => {
          const text = e.target.value;
          setNewTeamName(text);
          setIsNewTeamNameValid(text.indexOf("@") < 0);
        }} />
        <Button label="Create" onClick={async (e) => {
          e.preventDefault();
          await addTeam({
            teamOwner: user?.firstName ?? "Kaka-Dou",
            teamName: newTeamName,
            parentId: selectedTeamId
          })

          setNewTeamName("");
        }} disabled={!newTeamName || !selectedTeamId} />
        {isNewTeamNameValid ? <span></span> : <Message severity="error" text="Team cannot contain @" />}
      </div>
    </Card>

  );
}
