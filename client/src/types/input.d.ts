interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectComponentProps {
  options: Option[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}
