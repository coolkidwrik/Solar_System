uniform mat4 shadowMatrix; // Matrix for transforming vertices into light space

        varying vec4 vShadowCoord; // Varying variable to pass shadow coordinates to the fragment shader
        varying vec2 vUv; // Varying variable to pass texture coordinates to the fragment shader
        
        void main() {
            // Calculate shadow coordinates in light space
            vShadowCoord = shadowMatrix * vec4(position, 1.0);
        
            // Pass texture coordinates
            vUv = uv;
        
            // Output vertex position
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }