// Pointer work is batched to one frame, and disabled for touch/reduced motion.
(() => {
  const halo = document.querySelector('.cursor-halo');
  const finePointer = matchMedia('(pointer: fine)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let pointer = null;
  let magnetic = null;
  const enabled = () => finePointer.matches && !reduced.matches && !document.documentElement.classList.contains('motion-paused');
  function render() {
    frame = 0;
    const range = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--read-progress', range > 0 ? String(scrollY / range) : '0');
    if (!pointer || !enabled()) return;
    halo.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
    if (magnetic) {
      const rect = magnetic.getBoundingClientRect();
      magnetic.style.translate = `${(pointer.x - rect.left - rect.width / 2) * .15}px ${(pointer.y - rect.top - rect.height / 2) * .15}px`;
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(render); }
  document.addEventListener('pointermove', event => {
    if (!enabled()) return;
    pointer = { x: event.clientX, y: event.clientY };
    halo.classList.add('cursor-active');
    halo.classList.toggle('cursor-hover', Boolean(event.target.closest('a,button')));
    const next = event.target.closest('.home__buttons .button');
    if (next !== magnetic) { if (magnetic) magnetic.style.translate = ''; magnetic = next; }
    schedule();
  }, { passive: true });
  function reset() {
    pointer = null;
    halo.classList.remove('cursor-active');
    if (magnetic) magnetic.style.translate = '';
    magnetic = null;
  }
  document.documentElement.addEventListener('pointerleave', reset);
  document.addEventListener('motionchange', reset);
  reduced.addEventListener('change', reset);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
})();
