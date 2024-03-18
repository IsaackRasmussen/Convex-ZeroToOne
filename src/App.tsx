import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import MessagesMailView from "./MessagesMailView";

export default function App() {
  return (
    <div className="border-1 surface-border gap-2 ">
      <TabView className="content">
        <TabPanel header="Welcome">
          <p>
            Sign up with a Decentralized Id
          </p>
          <p className="m-0">
            Do you already have a login?
          </p>
          <Button label="Go to Sign-in"  />
        </TabPanel>
        <TabPanel header="Sign-in">
          <p className="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
            ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="E-mails">
          <MessagesMailView></MessagesMailView>
        </TabPanel>
      </TabView>
    </div>
  );
}
