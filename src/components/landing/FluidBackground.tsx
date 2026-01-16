import { useEffect, useRef, useCallback } from 'react';

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pointerRef = useRef<Pointer>({
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0.85, g: 0.2, b: 0.5 }, // Magenta
  });

  // Fluid simulation colors based on design system
  const colors = [
    { r: 0.85, g: 0.2, b: 0.5 },   // Magenta
    { r: 0.95, g: 0.4, b: 0.35 },  // Coral
    { r: 0.5, g: 0.3, b: 0.7 },    // Royal Purple
    { r: 0.2, g: 0.75, b: 0.65 },  // Electric Teal
  ];

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Shader sources
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouseSpeed;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 5; i++) {
          value += amplitude * snoise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        return value;
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 p = (uv - 0.5) * aspect;
        
        // Mouse influence - creates ripples from cursor
        vec2 mouse = (u_mouse - 0.5) * aspect;
        float mouseDist = length(p - mouse);
        float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * u_mouseSpeed;
        
        // Time-based flow animation
        float t = u_time * 0.15;
        
        // Create flowing noise patterns - two paths merging
        vec2 flow1 = vec2(
          fbm(p * 2.0 + vec2(t, 0.0)),
          fbm(p * 2.0 + vec2(0.0, t))
        );
        
        vec2 flow2 = vec2(
          fbm(p * 1.5 - vec2(t * 0.7, t * 0.3)),
          fbm(p * 1.5 + vec2(t * 0.3, -t * 0.7))
        );
        
        // Merge the two flow patterns
        vec2 mergedFlow = mix(flow1, flow2, 0.5 + 0.5 * sin(t * 0.5));
        
        // Add mouse distortion to the flow
        mergedFlow += (p - mouse) * mouseInfluence * 2.0;
        
        // Create color blending based on position and flow
        float n1 = fbm(p * 3.0 + mergedFlow + t);
        float n2 = fbm(p * 2.0 - mergedFlow * 0.5 + t * 0.7);
        float n3 = fbm(p * 4.0 + vec2(n1, n2) * 0.3);
        
        // Blend between the four brand colors
        vec3 color = mix(u_color1, u_color2, smoothstep(-0.3, 0.3, n1));
        color = mix(color, u_color3, smoothstep(-0.2, 0.4, n2));
        color = mix(color, u_color4, smoothstep(0.0, 0.5, n3) * 0.5);
        
        // Add subtle highlights near mouse
        color += vec3(0.1) * mouseInfluence;
        
        // Vignette effect
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        
        // Final alpha with smooth edges
        float alpha = 0.25 * vignette;
        alpha += mouseInfluence * 0.15;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create vertex buffer
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uniforms = {
      time: gl.getUniformLocation(program, 'u_time'),
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      mouseSpeed: gl.getUniformLocation(program, 'u_mouseSpeed'),
      color1: gl.getUniformLocation(program, 'u_color1'),
      color2: gl.getUniformLocation(program, 'u_color2'),
      color3: gl.getUniformLocation(program, 'u_color3'),
      color4: gl.getUniformLocation(program, 'u_color4'),
    };

    // Set brand colors
    gl.uniform3f(uniforms.color1, 0.85, 0.2, 0.5);   // Magenta
    gl.uniform3f(uniforms.color2, 0.95, 0.4, 0.35);  // Coral
    gl.uniform3f(uniforms.color3, 0.5, 0.3, 0.7);    // Royal Purple
    gl.uniform3f(uniforms.color4, 0.2, 0.75, 0.65);  // Electric Teal

    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let mouseSpeed = 0;
    let lastMouseX = 0.5;
    let lastMouseY = 0.5;

    // Handle resize
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse/touch handlers
    const updateMouse = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (x - rect.left) / rect.width;
      targetMouseY = 1 - (y - rect.top) / rect.height; // Flip Y
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Animation loop
    const startTime = performance.now();
    
    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;

      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Calculate mouse speed
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy) * 50;
      mouseSpeed += (speed - mouseSpeed) * 0.1;
      mouseSpeed = Math.min(mouseSpeed, 1);

      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Update uniforms
      gl.uniform1f(uniforms.time, currentTime);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.mouse, mouseX, mouseY);
      gl.uniform1f(uniforms.mouseSpeed, mouseSpeed);

      // Clear and draw
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0,
        mixBlendMode: 'normal',
      }}
    />
  );
};

export default FluidBackground;
