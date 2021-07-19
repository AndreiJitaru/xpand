export interface Planet {
    description: {
        captain: string;
        robots: string[];
        text: string;
    } | null;
    id: string;
    imagePath: string;
    name: string;
    status: string;
}
