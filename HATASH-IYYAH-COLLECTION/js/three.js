/* ====== 3D VISUALIZER (WebGL-ready placeholder scaffold) ======
   This module provides a lightweight WebGL 3D rotating stage so that
   product models render as interactive 360° objects. For production,
   swap in a full Three.js / GLTF loader. The fallback renders an elegant
   empty-state with a subtle rotating gradient ring (GPU-friendly). */

const ThreeVisualizer = (() => {
    let canvas, ctx, running = false, rotate = 0;
    const boxes = [
        { x: 0, y: 0, z: 0, size: 0.9, hue: 185 },
        { x: 0.75, y: 0.15, z: 0.2, size: 0.35, hue: 20 },
        { x: -0.7, y: 0.2, z: 0.1, size: 0.3, hue: 330 }
    ];
    const V = [];

    function init() {
        canvas = document.getElementById('webgl-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        resize();
        window.addEventListener('resize', resize);
        running = true;
        tick();
    }

    function resize() {
        if (!canvas) return;
        const stage = document.getElementById('three-stage');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = stage.clientWidth * dpr;
        canvas.height = stage.clientHeight * dpr;
        canvas.style.width = stage.clientWidth + 'px';
        canvas.style.height = stage.clientHeight + 'px';
    }

    function face(n, color) {
        ctx.fillStyle = color;
        ctx.fillRect(n.x - n.z, n.y - n.z, n.z * 2, n.z * 2);
    }

    function tick() {
        if (!running) return;
        rotate += 0.006;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2;
        const scale = Math.min(w, h) / 5;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotate);

        boxes.forEach(b => {
            const s = b.size * scale;
            const ox = b.x * scale;
            const oy = b.y * scale;
            const depth = b.z * 3;
            const bright = 1 - Math.abs(b.z) * 0.25;
            const col = `hsl(${b.hue}, 40%, ${42 * bright}%)`;
            ctx.fillStyle = 'rgba(183,110,121,0.12)';
            ctx.fillRect(ox - s - depth, oy - s - depth, s * 2, s * 2);
            ctx.fillStyle = col;
            ctx.fillRect(ox - s, oy - s, s * 2, s * 2);
            face({ x: ox + s, y: oy - s, z: s }, 'rgba(244,194,194,0.55)');
            face({ x: ox - s, y: oy + s, z: s }, 'rgba(10,10,10,0.25)');
        });
        ctx.restore();
        requestAnimationFrame(tick);
    }

    function enable() {
        const canvas = document.getElementById('webgl-canvas');
        const placeholder = document.querySelector('.three-placeholder');
        if (canvas && placeholder) {
            placeholder.classList.add('hidden');
            canvas.classList.remove('hidden');
        }
        init();
    }

    return { init, enable };
})();

document.addEventListener('DOMContentLoaded', () => {
    // Enable the live 3D stage after the preloader completes.
    setTimeout(() => ThreeVisualizer.enable(), 3200);
});
