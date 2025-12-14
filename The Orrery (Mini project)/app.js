console.log("Script is running!");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 75; // Move the camera back so we can see things

const renderer = new THREE.WebGLRenderer(); // Let Three.js create the canvas element for us
renderer.setSize(window.innerWidth, window.innerHeight); // Make it fill the window
document.body.appendChild(renderer.domElement); // Add the canvas to the page

// 4. CREATE THE SKY SPHERE (the black void)
const sphereGeometry = new THREE.SphereGeometry(100, 32, 32); // A large sphere
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,    // Black color
    side: THREE.BackSide // Paint the INSIDE of the sphere
});
const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(skySphere); // Add the sphere to the scene

const SunShape = new THREE.SphereGeometry(10);
const SunMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const Sun = new THREE.Mesh(SunShape, SunMaterial);
scene.add(Sun);

const planetData = [
    { name: "Mercury", radius: 0.6, color: 0x8C7853, distance: 18 },
    { name: "Venus", radius: 0.9, color: 0xFFC649, distance: 26 },
    { name: "Earth", radius: 1.0, color: 0x6B93D6, distance: 35 },
    {name: "Moon", radius: 0.27, color: 0x888888, distance: 38 },
    {name: "ISS", radius: 0.1, color: 0xFFFFFF, distance: 36},
    { name: "Mars", radius: 0.8, color: 0xFF0000, distance: 46 },
    { name: "Jupiter", radius: 2.5, color: 0xFFA500, distance: 58 },
    { name: "Saturn", radius: 2.3, color: 0xFAD5A5, distance: 68 },
    { name: "Uranus", radius: 2.0, color: 0x4FD0E7, distance: 82 },
    { name: "Neptune", radius: 2.1, color: 0x4B70DD, distance: 94 }
];

// CREATE THE planetOrbits ARRAY FIRST
const planetOrbits = [];

for (let i = 0; i < planetData.length; i++) {
    const planetInfo = planetData[i];
    
    // Create the geometry and material
    const geometry = new THREE.SphereGeometry(planetInfo.radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: planetInfo.color });
    const planet = new THREE.Mesh(geometry, material);
    
    // CREATE A START ANGLE FOR THIS PLANET
    const startAngle = Math.random() * Math.PI * 2;
    
    // Position the planet using trigonometry
    planet.position.x = Math.cos(startAngle) * planetInfo.distance;
    planet.position.z = Math.sin(startAngle) * planetInfo.distance;
    
    scene.add(planet);
    
    // Store orbit data
    planetOrbits.push({
        mesh: planet,
        radius: planetInfo.distance,
        angle: startAngle,
        speed : 0.1 / Math.pow(planetInfo.distance, 1.5)
    });
}
//5 ADD ORBIT CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth controls
controls.dampingFactor = 0.05;

function animate() {
    requestAnimationFrame(animate);
    
    // Update planet orbits
    for (let i = 0; i < planetOrbits.length; i++) {
        const orbit = planetOrbits[i];
        
        // Increase the angle over time
        orbit.angle += orbit.speed;
        
        // Update position
        orbit.mesh.position.x = Math.cos(orbit.angle) * orbit.radius;
        orbit.mesh.position.z = Math.sin(orbit.angle) * orbit.radius;
    }
    
    controls.update();
    renderer.render(scene, camera);
}


animate(); // Start the loop

console.log("Setup complete! You should see a black sphere.");