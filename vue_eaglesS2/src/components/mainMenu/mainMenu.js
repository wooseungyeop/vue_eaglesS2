import { ref } from 'vue';

export function useMainMenu() {
  const selectedItem = ref(null);

  function handleItemSelected(item) {
    selectedItem.value = item;
  }

  return { selectedItem, handleItemSelected };
}