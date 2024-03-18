import { OrganizationChart } from 'primereact/organizationchart';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

export default function TeamsView() {
    const { user } = useUser();
    const teamsList = useQuery(api.teams.listTeams, {});

    return (
        <OrganizationChart value={getTreeNodes(teamsList, undefined)} />
    );
}

function getTreeNodes(teams: any[], parentId: null | undefined): any[] {
    const filteredTeams = teams.filter((team) => team.parentId === parentId) ?? [];

    return filteredTeams.map(team => {
        return {
            key: team._id,
            label: team.teamName,
            expanded: true,
            children: getTreeNodes(teams, team._id)
        };
    }) ?? [];
}
