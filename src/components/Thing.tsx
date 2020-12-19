import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

const Thing: React.FC = () => {
    const ref = useRef<Mesh>();

    useFrame(({ clock }) => {
        ref.current!.position.x += Math.cos(clock.getElapsedTime()) * 3;
        ref.current!.position.y += Math.sin(clock.getElapsedTime()) * 3;
        ref.current!.position.z += Math.cos(clock.getElapsedTime()) * 3;
        ref.current!.rotation.y += 0.01;
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry attach="geometry" args={[300, 30, 30]} />
            <meshStandardMaterial attach="material" color="#FF0000" />
        </mesh>
    );
};

export default Thing;
