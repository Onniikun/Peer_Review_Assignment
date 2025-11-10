export interface Branches {
    id: number;
    name: string;
    address: string;
    phone: number;
}

export const branches: Branches[] = [
    {
        id: 1,
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vacouver, BC V6Z 2C7",
        phone: 6044560022,
    },
    {
        id: 2,
        name: "Edmonton Branch",
        address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
        phone: 7804686800,
    },
    {
        id: 3,
        name: "Arborg Branch",
        address: "317-A Fisher Road, Arborg, MB, R0C 0A0",
        phone: 2045553461,
    },
    {
        id: 4,
        name: "Regina Branch",
        address: "3085 Albert, Regina, SK, S4S 0B1",
        phone: 2066402877,
    },
    {
        id: 5,
        name: "Winnipeg Branch",
        address: "1 Portage Ave, Winnipeg, MB, R3B 2B9",
        phone: 2049882402,
    },
    {
        id: 6,
        name: "Steinbach Branch",
        address: "330 Main St, Steinbach, MB, R5G 1Z1",
        phone: 2043263495,
    },
    {
        id: 7,
        name: "Montréal Branch",
        address: "511 Rue Jean-Talon O, Montréal, QC, H3N 1R5",
        phone: 5142775511,
    },
    {
        id: 8,
        name: "Toronto Branch",
        address: "440 Queen St W, Toronto, ON, M5V 2A8",
        phone: 4169802500,
    },
    {
        id: 9,
        name: "Saint John Branch",
        address: "500 Fairville Blvd, Saint John, NB, E2M 5H7",
        phone: 5066320225,
    },
    {
        id: 10,
        name: "Headingley Branch",
        address: "500 McIntosh Rd, Headingley, MB, R4H 1B6",
        phone: 2049995555,
    },
];