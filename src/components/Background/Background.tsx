import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FocusMode, MODE_CONFIGS } from '../../types/modes';

interface BackgroundProps {
  mode: FocusMode;
}

export const Background = ({ mode }: BackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lightRef = useRef<THREE.SpotLight | null>(null);
  const teaCupRef = useRef<THREE.Group | null>(null);
  const smokeParticlesRef = useRef<THREE.Points | null>(null);
  const lampLightRef = useRef<THREE.PointLight | null>(null);
  const lampSpotLightRef = useRef<THREE.SpotLight | null>(null);

  // Light colors for different modes
  const lightColors = {
    'deep-work': new THREE.Color('#4a90e2'), // Soft blue
    'study': new THREE.Color('#f5a623'),     // Warm orange
    'sleep': new THREE.Color('#f8f8f8'),     // Soft white
    'creative': new THREE.Color('#e350b8')   // Soft pink
  };

  // LED strip colors (slightly dimmer than main lights)
  const ledColors = {
    'deep-work': new THREE.Color('#4a90e2').multiplyScalar(0.7),
    'study': new THREE.Color('#f5a623').multiplyScalar(0.7),
    'sleep': new THREE.Color('#f8f8f8').multiplyScalar(0.7),
    'creative': new THREE.Color('#e350b8').multiplyScalar(0.7)
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#1a1a1a'); // Dark background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup with shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Further reduced ambient light
    scene.add(ambientLight);

    // Modern ceiling lamp group
    const lampGroup = new THREE.Group();
    
    // Lamp base (ceiling mount)
    const baseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x404040,
      roughness: 0.7,
      metalness: 0.3
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 3, 0);
    lampGroup.add(base);

    // Lamp shade (modern cylindrical design)
    const shadeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 32);
    const shadeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
    shade.position.set(0, 2.8, 0);
    lampGroup.add(shade);

    // Lamp light (bright daylight)
    const lampLight = new THREE.PointLight(0xffffff, 4.0, 4.0); // Increased intensity and range
    lampLight.position.set(0, 2.6, 0);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.width = 2048; // Increased shadow resolution
    lampLight.shadow.mapSize.height = 2048;
    lampLight.shadow.camera.near = 0.5;
    lampLight.shadow.camera.far = 10;
    lampLight.shadow.bias = -0.0001;
    lampGroup.add(lampLight);
    lampLightRef.current = lampLight;

    // Add a spotlight for a more focused beam
    const lampSpotLight = new THREE.SpotLight(0xffffff, 3.0);
    lampSpotLight.position.set(0, 2.6, 0);
    lampSpotLight.angle = Math.PI / 4;
    lampSpotLight.penumbra = 0.2;
    lampSpotLight.decay = 1.5;
    lampSpotLight.distance = 8;
    lampSpotLight.castShadow = true;
    lampSpotLight.shadow.mapSize.width = 2048;
    lampSpotLight.shadow.mapSize.height = 2048;
    lampSpotLight.shadow.camera.near = 0.5;
    lampSpotLight.shadow.camera.far = 10;
    lampSpotLight.shadow.bias = -0.0001;
    lampSpotLight.target.position.set(0, -1, 0); // Point directly at the tea area
    lampGroup.add(lampSpotLight);
    lampGroup.add(lampSpotLight.target);
    lampSpotLightRef.current = lampSpotLight;

    scene.add(lampGroup);

    // LED Light Strips (more realistic)
    const ledStripCount = 3;
    const ledStrips: THREE.Group[] = [];
    const ledStripLength = 8;
    const ledStripHeight = 2.5;
    const ledStripSpacing = 0.5;
    const ledBulbCount = 24;
    const ledBulbSpacing = ledStripLength / (ledBulbCount - 1);

    for (let i = 0; i < ledStripCount; i++) {
      const stripGroup = new THREE.Group();
      
      // Strip base (thin dark material)
      const stripGeometry = new THREE.BoxGeometry(ledStripLength, 0.02, 0.05);
      const stripMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x202020,
        roughness: 0.9,
        metalness: 0.1
      });
      const strip = new THREE.Mesh(stripGeometry, stripMaterial);
      strip.position.set(0, ledStripHeight - (i * ledStripSpacing), 0);
      stripGroup.add(strip);

      // Individual LED bulbs
      for (let j = 0; j < ledBulbCount; j++) {
        // LED bulb (tiny sphere)
        const bulbGeometry = new THREE.SphereGeometry(0.015, 8, 8);
        const bulbMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1.0,
          roughness: 0.1,
          metalness: 0.5
        });
        const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
        bulb.position.set(
          -ledStripLength/2 + (j * ledBulbSpacing),
          ledStripHeight - (i * ledStripSpacing),
          0.03
        );
        stripGroup.add(bulb);

        // LED glow (small point light)
        const glowLight = new THREE.PointLight(0xffffff, 0.3, 0.05);
        glowLight.position.copy(bulb.position);
        stripGroup.add(glowLight);
      }

      scene.add(stripGroup);
      ledStrips.push(stripGroup);
    }

    // Table (matte brown)
    const tableGroup = new THREE.Group();
    
    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(2, 0.1, 2);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513,
      roughness: 0.9,
      metalness: 0.1,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableMaterial);
    tableTop.position.y = -1;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Table legs (same matte material)
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513,
      roughness: 0.9,
      metalness: 0.1,
      emissive: 0x000000,
      emissiveIntensity: 0
    });

    const legPositions = [
      { x: 0.9, z: 0.9 },
      { x: -0.9, z: 0.9 },
      { x: 0.9, z: -0.9 },
      { x: -0.9, z: -0.9 }
    ];

    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      leg.position.set(pos.x, -1.5, pos.z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      tableGroup.add(leg);
    });

    scene.add(tableGroup);

    // Cushion (Japanese style jade green)
    const cushionGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.6);
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x90EE90,
      roughness: 0.8,
      metalness: 0.1,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
    cushion.position.y = -0.925;
    cushion.castShadow = true;
    cushion.receiveShadow = true;
    scene.add(cushion);

    // Tea Cup (Chinese style white with pattern)
    const teaCupGroup = new THREE.Group();
    
    // Cup body (white porcelain)
    const cupGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32);
    const cupMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.y = -0.85;
    cup.castShadow = true;
    cup.receiveShadow = true;
    teaCupGroup.add(cup);

    // Tea liquid (chamomile yellow)
    const teaGeometry = new THREE.CylinderGeometry(0.19, 0.19, 0.4, 32);
    const teaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD4B08C,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const tea = new THREE.Mesh(teaGeometry, teaMaterial);
    tea.position.y = -0.7;
    tea.castShadow = true;
    tea.receiveShadow = true;
    teaCupGroup.add(tea);

    teaCupRef.current = teaCupGroup;
    scene.add(teaCupGroup);

    // Smoke particles (thinner and slower)
    const smokeGeometry = new THREE.BufferGeometry();
    const smokeCount = 200;
    const smokePositions = new Float32Array(smokeCount * 3);
    const smokeVelocities = new Float32Array(smokeCount * 3);
    const smokeSizes = new Float32Array(smokeCount);
    
    for (let i = 0; i < smokeCount; i++) {
      smokePositions[i * 3] = (Math.random() - 0.5) * 0.2;
      smokePositions[i * 3 + 1] = -0.6 + Math.random() * 0.1;
      smokePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      
      // Slower movement
      smokeVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      smokeVelocities[i * 3 + 1] = Math.random() * 0.01;
      smokeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
      
      // Thinner particles
      smokeSizes[i] = 0.01 + Math.random() * 0.015;
    }
    
    smokeGeometry.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));
    smokeGeometry.setAttribute('size', new THREE.BufferAttribute(smokeSizes, 1));
    
    const smokeMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.01,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    });
    
    const smokeParticles = new THREE.Points(smokeGeometry, smokeMaterial);
    smokeParticlesRef.current = smokeParticles;
    scene.add(smokeParticles);

    // Light bulb (natural daylight)
    const bulbGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.5
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0.5, 2.5, 0); // Moved 0.5 units to the right
    bulb.castShadow = true;
    scene.add(bulb);

    // Pull chain (moved to the right)
    const chainGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8);
    const chainMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x808080,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const chain = new THREE.Mesh(chainGeometry, chainMaterial);
    chain.position.set(0.5, 2.25, 0); // Moved 0.5 units to the right
    chain.castShadow = true;
    scene.add(chain);

    // Chain animation state
    const chainState = {
      isJiggling: false,
      jiggleStartTime: 0,
      jiggleDuration: 1000,
      jiggleAmplitude: 0.1,
      jiggleFrequency: 15,
      baseX: 0.5 // New base position for the chain
    };

    // Add click interaction for the chain
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isLightOn = true;

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(chain);

      if (intersects.length > 0) {
        isLightOn = !isLightOn;
        // Update LED strips only
        ledStrips.forEach(strip => {
          strip.children.forEach(child => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
              if (child.material.emissive) {
                child.material.emissiveIntensity = isLightOn ? 1.0 : 0;
              }
            }
            if (child instanceof THREE.PointLight) {
              child.intensity = isLightOn ? 0.3 : 0;
            }
          });
        });
        // Update lamp lights
        if (lampLightRef.current) {
          lampLightRef.current.intensity = isLightOn ? 4.0 : 0.1;
        }
        if (lampSpotLightRef.current) {
          lampSpotLightRef.current.intensity = isLightOn ? 3.0 : 0.1;
        }
        chainState.isJiggling = true;
        chainState.jiggleStartTime = Date.now();
      }
    };

    window.addEventListener('click', handleClick);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update chain jiggle animation
      if (chainState.isJiggling) {
        const elapsed = Date.now() - chainState.jiggleStartTime;
        if (elapsed < chainState.jiggleDuration) {
          const progress = elapsed / chainState.jiggleDuration;
          const easing = 1 - Math.pow(1 - progress, 3);
          const offset = Math.sin(elapsed * chainState.jiggleFrequency / 1000) * 
                        chainState.jiggleAmplitude * (1 - easing);
          chain.position.x = chainState.baseX + offset;
        } else {
          chainState.isJiggling = false;
          chain.position.x = chainState.baseX; // Return to base position (right of center)
        }
      }

      // Update smoke particles
      if (smokeParticlesRef.current) {
        const positions = smokeParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const sizes = smokeParticlesRef.current.geometry.attributes.size.array as Float32Array;
        
        for (let i = 0; i < smokeCount; i++) {
          // Update position
          positions[i * 3] += smokeVelocities[i * 3];
          positions[i * 3 + 1] += smokeVelocities[i * 3 + 1];
          positions[i * 3 + 2] += smokeVelocities[i * 3 + 2];

          // Update size (grow as they rise)
          sizes[i] += 0.0001;

          // Reset particles that go too far
          if (positions[i * 3 + 1] > 1) {
            positions[i * 3] = (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 1] = -0.6;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
            smokeVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
            smokeVelocities[i * 3 + 1] = Math.random() * 0.01;
            smokeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
            sizes[i] = 0.01 + Math.random() * 0.015;
          }
        }
        smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        smokeParticlesRef.current.geometry.attributes.size.needsUpdate = true;
      }

      // Gentle tea cup swaying
      if (teaCupRef.current) {
        teaCupRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update light colors when mode changes (LED strips only)
  useEffect(() => {
    // Update LED strip colors only
    const ledColor = ledColors[mode];
    sceneRef.current?.children.forEach(child => {
      if (child instanceof THREE.Group) {
        // Only update materials that have emissive properties (LED bulbs)
        child.children.forEach(subChild => {
          if (subChild instanceof THREE.Mesh && 
              subChild.material instanceof THREE.MeshStandardMaterial && 
              subChild.material.emissive && 
              subChild.material.emissiveIntensity > 0) {
            subChild.material.color = ledColor;
            subChild.material.emissive = ledColor;
          }
          if (subChild instanceof THREE.PointLight && 
              subChild !== lampLightRef.current && 
              subChild !== lampSpotLightRef.current?.target) { // Don't update lamp lights
            subChild.color = ledColor;
          }
        });
      }
    });
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'transparent' }}
    />
  );
}; 