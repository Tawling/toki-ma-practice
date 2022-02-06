export const weightedRandom = <T>(items: T[], weights: number[]) => {
    let total = 0;
    for (let i = 0; i < weights.length; i++) {
        total += weights[i]
    }
    const threshold = Math.random() * total;
    total = 0;
    for (let i = 0; i < items.length - 1; i++) {
        total += weights[i];
        if (total >= threshold) {
            return items[i]
        }
    }
    return items[items.length - 1]
}