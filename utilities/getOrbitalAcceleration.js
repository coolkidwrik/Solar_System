
// This function calculates the acceleration and velocity of the planets
function getOrbitalAcceleration(orbitalRadius, mass1, mass2) {
    // Constants
    const G = 6.67430 * Math.pow(10, -11); // gravitational constant
    const M = mass1; // mass of earth (scaled down)
    const m = mass2; // mass of moon (scaled down)
    const r = orbitalRadius; // distance between earth and moon (not to scale)

    // calculate acceleration of moon
    // the force of gravity between the earth and the moon
    // is given by the formula Fg = (G * M * m) / (r * r)
    // if broken down into its components, the force of gravity
    // is given by the formula Fx = Fg * cos(theta) and Fy = Fg * sin(theta)
    // to get the acceleration of the moon, we divide the mass of the earth
    const Fg = (G * M * m) / (r * r);
    const Fx = Fg * Math.cos(0);
    const Fy = Fg * Math.sin(0);
    const ax = Fx / M;
    const ay = Fy / M;

    // calculate tangential velocity of moon
    // the centripetal force acting on the moon is given by the 
    // formula Fc = (m * v * v) / r
    // this also equals the force of gravity acting on the moon
    // if we solve for v, we get v = sqrt((G * M) / r)
    const v = Math.sqrt((G * M) / r);
    console.log(ax, ay, v);

    return { ax, ay, v };
}

export { getOrbitalAcceleration };