import * as CANNON from "cannon";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Mesh } from "three";

// Cannon-world context provider
const context = React.createContext<CANNON.World | null>(null);

type Props = {
    children: React.ReactElement[];
};

export const Provider: React.FC<Props> = ({ children }) => {
    // Set up physics
    const [world] = useState(() => new CANNON.World());

    useEffect(() => {
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 10;
        world.gravity.set(0, 0, -25);
    }, [world]);

    // Run world stepper every frame
    useFrame(() => world.step(1 / 60));

    // Distribute world via context
    return <context.Provider value={world} children={children} />;
};

// Custom hook to maintain a world physics body
export const useCannon = (
    { ...props },
    fn: (body: CANNON.Body) => void,
    deps = []
) => {
    const ref = useRef<Mesh>();

    // Get cannon world object
    const world = useContext(context);

    // Instanciate a physics body
    const [body] = useState(() => new CANNON.Body(props));

    useEffect(() => {
        // Call function so the user can add shapes
        fn(body);
        // Add body to world on mount
        world!.addBody(body);
        // Remove body on unmount
        return () => world!.remove(body);
    }, deps);

    useFrame(() => {
        if (ref.current) {
            // Transport cannon physics into the referenced threejs object
            const positionForThree = new THREE.Vector3(
                body.position.x,
                body.position.y,
                body.position.z
            );

            const quaternionForThree = new THREE.Quaternion(
                body.quaternion.x,
                body.quaternion.y,
                body.quaternion.z,
                body.quaternion.w
            );

            ref.current!.position.copy(positionForThree);
            ref.current!.quaternion.copy(quaternionForThree);
        }
    });

    return ref;
};
