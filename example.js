import payload from "./payload.json" assert { type: "json" };

console.log(payload[0]
                .lines
                .map(line => line.words)
                .reduce((acc, curr) => { acc.push(...curr); return acc; }, [])
                .map(word => word.text)
            )


// .*base.*####/####