import { OrganizationChart } from 'primereact/organizationchart';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function TeamsView() {
    const teamsList = useQuery(api.teams.listTeams, {}) || [];

    return (
        teamsList && teamsList.length > 0 ? <OrganizationChart selectionMode="single" value={getTreeNodes(teamsList, "root")} /> : <span />
    );
}

function getTreeNodes(teams: any[], parentId: string | undefined): any[] {
    const filteredTeams = teams.filter((team) => team?.parentId === parentId);

    return filteredTeams ? filteredTeams.map(team => {
        return {
            key: team._id,
            label: team.teamName,
            expanded: true,
            children: getTreeNodes(teams, team._id)
        };
    }) : [];
}
