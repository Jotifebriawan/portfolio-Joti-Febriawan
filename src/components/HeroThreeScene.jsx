import { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xbfe9ff, 1.4));

    const cyanLight = new THREE.PointLight(0x67e8f9, 32, 18);
    cyanLight.position.set(-3, 2.5, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xc4b5fd, 22, 10);
    violetLight.position.set(3, -1.5, 2.5);
    scene.add(violetLight);

    const goldLight = new THREE.PointLight(0xfbbf24, 14, 8);
    goldLight.position.set(0, -3.5, 2.5);
    scene.add(goldLight);

    const coreGroup = new THREE.Group();
    coreGroup.scale.set(0.82, 0.82, 0.82);
    scene.add(coreGroup);

    const mainSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x123b5d,
        metalness: 0.88,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: 0x0c3350,
        emissiveIntensity: 0.7,
        flatShading: true,
      })
    );
    coreGroup.add(mainSphere);

    const wireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 2),
      new THREE.MeshBasicMaterial({
        color: 0x7dd3fc,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      })
    );
    coreGroup.add(wireframe);

    const innerOrb = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.46, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x5eead4,
        metalness: 0.25,
        roughness: 0.14,
        clearcoat: 1,
        emissive: 0x0f766e,
        emissiveIntensity: 0.9,
      })
    );
    innerOrb.rotation.set(0.5, 0.4, 0.2);
    coreGroup.add(innerOrb);

    const glowCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 28, 28),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe })
    );
    coreGroup.add(glowCore);

    const orbitGroup = new THREE.Group();
    orbitGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(orbitGroup);

    const orbitSpecs = [
      { color: 0x67e8f9, rotation: [0.9, 0.2, 0.2], speed: 0.22 },
      { color: 0xd8b4fe, rotation: [1.3, 0.6, -0.3], speed: -0.18 },
      { color: 0xfbbf24, rotation: [0.4, 1.15, 0.8], speed: 0.16 },
    ];

    const orbitGroups = orbitSpecs.map((spec, index) => {
      const orbit = new THREE.Group();
      orbit.rotation.set(...spec.rotation);
      orbit.userData.speed = spec.speed;
      const radius = 1.8 + index * 0.15;

      orbit.add(
        new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.012, 18, 220),
          new THREE.MeshBasicMaterial({
            color: spec.color,
            transparent: true,
            opacity: 0.8,
          })
        )
      );

      const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(index === 1 ? 0.095 : 0.08, 24, 24),
        new THREE.MeshStandardMaterial({
          color: spec.color,
          emissive: spec.color,
          emissiveIntensity: 0.8,
          metalness: 0.4,
          roughness: 0.2,
        })
      );
      satellite.position.set(radius, 0, 0);
      orbit.add(satellite);
      orbitGroup.add(orbit);
      return orbit;
    });

    const nodeGroup = new THREE.Group();
    nodeGroup.scale.set(0.86, 0.86, 0.86);
    scene.add(nodeGroup);

    const nodes = [];
    const connections = [];
    const nodeCount = 20;

    for (let index = 0; index < nodeCount; index += 1) {
      const theta = Math.PI * 2 * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.3 + Math.random() * 1.1;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * 0.78 * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 18, 18),
        new THREE.MeshStandardMaterial({
          color: index % 2 === 0 ? 0xc4f1ff : 0xe9d5ff,
          emissive: index % 2 === 0 ? 0x5eead4 : 0xa78bfa,
          emissiveIntensity: 0.85,
          metalness: 0.3,
          roughness: 0.18,
        })
      );
      node.position.set(x, y, z);
      nodeGroup.add(node);
      nodes.push(node);
    }

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i].position;
        const b = nodes[j].position;
        if (a.distanceTo(b) < 0.9) {
          connections.push([i, j]);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(connections.length * 2 * 3);

    connections.forEach(([startIndex, endIndex], pairIndex) => {
      const start = nodes[startIndex].position;
      const end = nodes[endIndex].position;
      const base = pairIndex * 6;

      linePositions[base] = start.x;
      linePositions[base + 1] = start.y;
      linePositions[base + 2] = start.z;

      linePositions[base + 3] = end.x;
      linePositions[base + 4] = end.y;
      linePositions[base + 5] = end.z;
    });

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const networkLines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: 0x8bd8ff,
        transparent: true,
        opacity: 0.2,
      })
    );
    scene.add(networkLines);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 72;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const angle = (index / particleCount) * Math.PI * 2;
      const radius = 2.1 + (index % 6) * 0.09;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = Math.sin(angle * 1.8) * 0.9;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0xdbeafe,
        size: 0.026,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      })
    );
    particles.scale.set(0.82, 0.82, 0.82);
    scene.add(particles);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const animationStart = performance.now();
    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resizeScene = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resizeScene);
    resizeObserver.observe(container);

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    container.addEventListener("pointermove", handlePointerMove);

    const animate = () => {
      const elapsed = (performance.now() - animationStart) / 1000;

      if (!prefersReducedMotion) {
        coreGroup.rotation.y = elapsed * 0.24 + pointerX * 0.2;
        coreGroup.rotation.x = Math.sin(elapsed * 1.1) * 0.16 - pointerY * 0.18;
        innerOrb.rotation.y = -elapsed * 0.54;
        innerOrb.rotation.x = elapsed * 0.3;
        glowCore.scale.setScalar(1 + Math.sin(elapsed * 3.8) * 0.14);

        orbitGroups.forEach((orbit, index) => {
          orbit.rotation.z += orbit.userData.speed * 0.02;
          orbit.rotation.y = elapsed * (0.34 + index * 0.08) + pointerX * 0.2;
        });

        nodeGroup.rotation.y = elapsed * 0.3;
        nodeGroup.rotation.x = Math.sin(elapsed * 1.1) * 0.24;
        networkLines.rotation.y = elapsed * 0.16;
        particles.rotation.y = elapsed * 0.12;
        particles.rotation.x = elapsed * 0.08;
      }

      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    resizeScene();
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label="Animasi 3D teknologi futuristik dengan nada coding desk dan orbit"
      className="relative mx-auto aspect-square w-[min(64vw,420px)] max-w-full"
    />
  );
};

export default HeroThreeScene;