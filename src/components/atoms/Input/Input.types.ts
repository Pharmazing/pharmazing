export interface TextInputProps {
  label?: string;
  value: string;
  handleChange: (val: string) => void;
  handleError?: (error: any) => void;
}
