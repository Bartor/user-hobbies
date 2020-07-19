export enum PassionLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    VERY_HIGH = 'VERY_HIGH'
}

export function translatePassion(level: string) {
    return level[0].toUpperCase() + level.slice(1).toLowerCase().replace(/_/g, ' ');
}