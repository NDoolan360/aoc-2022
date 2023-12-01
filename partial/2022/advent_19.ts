import { all, clone, importFile, sum } from '../../utils';

type Material = 'ore' | 'clay' | 'obsidian' | 'geode';
const materials: Material[] = ['ore', 'clay', 'obsidian', 'geode'];
type MaterialStore = Record<Material, number>;
type RobotPlan = {
    type: Material;
    cost: MaterialStore;
};
type Blueprint = {
    id: number;
    robots: Record<Material, RobotPlan>;
};

// Parsing
const blueprints = importFile('./file_in/2022/advent19_input.txt').map(
    (line, i): Blueprint => {
        const id = i + 1;
        const robots = {} as Record<Material, RobotPlan>;
        line.split('.')
            .filter((r) => r.length > 0)
            .map((r) =>
                r
                    .split(' ')
                    .filter(
                        (w) => materials.includes(w as Material) || Number(w)
                    )
            )
            .forEach((r) => {
                const cost = {} as MaterialStore;
                cost[r[2] as Material] = Number(r[1]);
                if (r.length > 3) cost[r[4] as Material] = Number(r[3]);
                robots[r[0] as Material] = { type: r[0], cost } as RobotPlan;
            });
        return { id, robots };
    }
);

const timeStep = (resources: MaterialStore, robots: MaterialStore) => {
    for (const resource of materials) {
        resources[resource] += robots[resource];
    }
};

const buildBestBot = (
    resources: MaterialStore,
    robots: MaterialStore,
    blueprint: Blueprint
): Material | undefined => {
    const limits = Object.entries(blueprint.robots).reduce(
        (limits, [_, robotPlan]) => {
            Object.entries(robotPlan.cost).forEach(([mat, cost]) => {
                const material = mat as Material;
                limits[material] = Math.max(cost, limits[material] || 0);
            });
            return limits;
        },
        {} as MaterialStore
    );
    let newBot: Material | undefined = undefined;
    for (const robot of clone(materials).reverse()) {
        let buildingBot = true;
        for (const [mat, cost] of Object.entries(
            blueprint.robots[robot].cost
        )) {
            const material = mat as Material;
            if (resources[material] < cost || robots[robot] > limits[robot])
                buildingBot = false;
        }
        if (buildingBot) {
            newBot = robot;
            break;
        }
    }
    return newBot;
};

const runMaxBlueprint = (blueprint: Blueprint, days = 24): number => {
    let t = 0;
    const resources = Object.fromEntries(
        materials.map((v) => [v, 0])
    ) as MaterialStore;
    const robots = Object.fromEntries(
        materials.map((v) => [v, v == 'ore' ? 1 : 0])
    ) as MaterialStore;
    while (t++ < days) {
        const newBot = buildBestBot(resources, robots, blueprint);
        timeStep(resources, robots);
        if (newBot) {
            robots[newBot] += 1;
            for (const [mat, cost] of Object.entries(
                blueprint.robots[newBot].cost
            )) {
                const material = mat as Material;
                resources[material] -= cost;
            }
        }
        console.log(t, resources, robots);
    }
    return 1;
};
const qualityLevel = (blueprint: Blueprint) =>
    blueprint.id * runMaxBlueprint(blueprint);

console.log(blueprints.map(qualityLevel).reduce(sum));
