export function estimateWithoutFlyweight(count){
    return {
        totalObjects: count + 6,
        note: "Each tree stores duplicated intrinsic data",
    }
}

export function compareMemory(count = 10000, uniqueTypes = 4){
    const withoutFw = estimateWithoutFlyweight(count);
    const withFw = estimateWithoutFlyweight(count, uniqueTypes);

    const saved = withoutFw.totalObjects - withFw.totalObjects;
    const savedPercent = ((saves / withoutFw.totalObjects) * 100).toFixed(2);

    return{
        withoutFlyweight: withoutFw.totalObjects,
        withFlyweight: withFw.totalObjects,
        saved,
        savedPercent: `${savedPercent}%`,
    }
}