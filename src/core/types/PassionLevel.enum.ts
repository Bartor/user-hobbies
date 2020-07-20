export enum PassionLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    VERY_HIGH = 'VERY_HIGH'
}

// this can later be changed to translating tokens in i18n
export function translatePassion(level: string) {
    return level[0].toUpperCase() + level.slice(1).toLowerCase().replace(/_/g, ' ');
}