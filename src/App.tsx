import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import styled from "styled-components";
import { Mesh } from "three";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Thing = () => {
    const ref = useRef<Mesh>();

    useFrame(() => {
        ref.current!.rotation.z += 0.01;
    });

    return (
        <mesh
            ref={ref}
            onClick={() => console.log("click")}
            onPointerOver={() => console.log("hover")}
            onPointerOut={() => console.log("unhover")}
        >
            <planeBufferGeometry attach="geometry" args={[1, 1]} />
            <meshBasicMaterial
                attach="material"
                color="hotpink"
                opacity={0.5}
                transparent
            />
        </mesh>
    );
};

const App = () => {
    return (
        <Wrapper>
            <Canvas>
                <Thing />
            </Canvas>
        </Wrapper>
    );
};

export default App;
