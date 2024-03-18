import { DataTable } from 'primereact/datatable';
import { api } from "../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Column } from 'primereact/column';


export default function MessagesMailView() {
    const emailMessages = useQuery(api.messages_email.list, { user: "isaack@pikutu.com" });

    console.log('Loading: ', emailMessages);
    emailMessages?.map((message) => {
        console.log('Email: ', message);
    });

    return (
        <DataTable value={emailMessages} paginator showGridlines rows={10} loading={false} dataKey="id"
            //filters={filters} 
            globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
            //header={header}
            emptyMessage="No mails found.">
            <Column field="emailFrom" header="From" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />

        </DataTable>
    );
}
