import { DataTable } from 'primereact/datatable';
import { api } from "../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Column } from 'primereact/column';


export default function MessagesMailView() {
    const emailMessages = useQuery(api.messages_email.list, {})|| [];

    return (
        <DataTable value={emailMessages} paginator showGridlines rows={10} loading={emailMessages === undefined || emailMessages === null}
            dataKey="_id"
            //filters={filters} 
            globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
            //header={header}
            emptyMessage="No mails found.">
            <Column field="from" header="From" filter filterPlaceholder="Search by sender" />
            <Column field="subject" header="Subject" filter filterPlaceholder="Search by subject" style={{ minWidth: '12rem' }} />
            <Column field="dateReceived" header="Date" filter filterPlaceholder="Search by date" />

        </DataTable>
    );
}
