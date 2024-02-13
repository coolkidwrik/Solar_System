uniform sampler2D ringTexture;
        uniform sampler2D shadowMap; // Shadow map texture
        
        varying vec2 vUv; // Varying variable received from the vertex shader
        varying vec4 vShadowCoord; // Varying variable received from the vertex shader
        
        void main() {
            // Sample the ring texture
            vec4 ringColor = texture2D(ringTexture, vUv);
            
            // Sample from the shadow map
            float shadowFactor = texture2D(shadowMap, vShadowCoord.xy).r;
        
            // Apply shadowing to the ring color
            vec4 finalColor = ringColor * shadowFactor;
        
            gl_FragColor = finalColor;
        }