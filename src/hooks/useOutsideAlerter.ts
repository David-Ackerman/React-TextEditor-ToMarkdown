import { useEffect } from 'react';

type Params = {
  ref: React.RefObject<HTMLDivElement>;
  setDropdown: (value: boolean) => void;
};

export function useOutsideAlerter({ ref, setDropdown }: Params) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    }
    function handleKeyPress(event: KeyboardEvent) {
      if (ref.current && event.key === 'Enter') {
        setDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [ref]);
}
