import { useState } from 'react';
import { SlotOption } from 'types/game';

interface Props {
  slotOption: SlotOption;
}

function useSlot({ slotOption }: Props) {
  const initOption: Record<string, string> = {};
  const isSpin: Record<string, boolean> = {};

  const keys = Object.keys(slotOption);

  keys.forEach(key => (initOption[key] = ''));
  keys.forEach(key => (isSpin[key] = false));

  const initial = { ...initOption };
  const [selected, setSelected] = useState(initial);
  const [isSpinning, setIsSpinning] = useState(isSpin);
  const [isFirstEntry, setIsFirstEntry] = useState(true);

  const startSpinning = () => {
    setIsFirstEntry(false);
    keys.forEach(key => (isSpin[key] = true));
    setIsSpinning(isSpin);
  };

  const stopSpinning = (name: string) => () => {
    setIsSpinning(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const getSelectedOption = (name: string, num: number) => {
    const selectedOneOption = Object.keys(slotOption[name])[num];

    setSelected(prev => ({
      ...prev,
      [name]: selectedOneOption,
    }));
  };

  const initEntrtyNSelection = () => {
    setIsFirstEntry(true);
    setSelected(initial);
  };

  return {
    isFirstEntry,
    selected,
    isSpinning,
    getSelectedOption,
    stopSpinning,
    startSpinning,
    initEntrtyNSelection,
  };
}
export default useSlot;
