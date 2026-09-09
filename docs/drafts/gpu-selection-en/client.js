import { hydrate } from 'svelte';
import GpuComparison from '$lib/components/GpuComparison.svelte';
import ServerComparison from '$lib/components/ServerComparison.svelte';

hydrate(GpuComparison, { target: document.getElementById('gpu-comparison-table'), props: { locale: 'en' } });
hydrate(ServerComparison, { target: document.getElementById('server-comparison-table'), props: { locale: 'en' } });

const themeButton = document.getElementById('theme-toggle');
themeButton.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.textContent = dark ? 'Light theme' : 'Dark theme';
});

const navigation = [...document.querySelectorAll('.collection-nav a')];
const sections = [...document.querySelectorAll('.guide-entry')];
let pending = false;
function updateNavigation() {
  let active = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= innerHeight * 0.3) active = section.id;
  }
  navigation.forEach((link) => {
    const current = link.hash === `#${active}`;
    link.classList.toggle('active', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  pending = false;
}
addEventListener('scroll', () => {
  if (!pending) { pending = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
