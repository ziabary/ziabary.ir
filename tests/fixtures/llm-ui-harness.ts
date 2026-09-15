/** Test-only browser entry. Production source and routes never import this module. */
import { mount, unmount } from 'svelte';
import LlmDataViewHarness from './LlmDataViewHarness.svelte';

let instance: ReturnType<typeof mount> | undefined;

export async function mountLlmFixture(target: HTMLElement) {
  if (instance) await unmount(instance);
  target.replaceChildren();
  instance = mount(LlmDataViewHarness, { target });
  return true;
}
