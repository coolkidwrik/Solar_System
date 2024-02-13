
// Constants
const G = 6.67430 * Math.pow(10, -11); // gravitational constant
const AU = 149.6 * Math.pow(10, 6); // astronomical unit
const SCALE = 1/AU; // scale of the model
const TIMESTEP = 1/(60*60*24*50); // time step (1 earthday = 50 second in the model)

// This function calculates the acceleration and velocity of the planets
function getOrbitalPosition(orbitalRadius, mass1, mass2, moon, planet) {
    // Constants
  const bigMass = mass1; // kg
  const smallMass = mass2; // kg
  const moonOrbitRadius = orbitalRadius*(0.125*SCALE); // meters

  // Calculate gravitational force between two masses: M and m
  // is given by the formula Fg = (G * M * m) / (r * r)
  const distance = moon.position.distanceTo(planet.position); // Distance in meters, scaled
  const force = SCALE*(G * bigMass * smallMass) / Math.pow(distance, 2);

  // Calculate acceleration of the moon
  // to get the acceleration of the moon, we divide Fg by the mass of the moon
  const acceleration = force / smallMass;

  // calculate tangential velocity of moon
  // the centripetal force acting on the moon is given by the 
  // formula Fc = (m * v * v) / r
  // this also equals the force of gravity acting on the moon
  // if we solve for v, we get v = sqrt((G * M) / r)
  const velocity = -1*Math.sqrt(2 * acceleration * moonOrbitRadius);

  // Calculate angle increment for orbit
  const angleIncrement = (velocity * TIMESTEP) / moonOrbitRadius;

  // Update moon's position
  // the angle between the current position vector and the x-axis
  const angle = Math.atan2(moon.position.z, moon.position.x);
  const newX = planet.position.x + Math.cos(angle + angleIncrement) * moonOrbitRadius;
  const newZ = planet.position.z + Math.sin(angle + angleIncrement) * moonOrbitRadius;

    return { newX, newZ };
}

export { getOrbitalPosition };