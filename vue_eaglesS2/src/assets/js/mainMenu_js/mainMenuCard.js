import { defineEmits } from 'vue';

export function useSuggest() {
  const emit = defineEmits(['item-selected']);

  function selectItem(item) {
    emit('item-selected', item);
  }

  return { selectItem };
}