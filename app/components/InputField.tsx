import { type InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import cn from 'classnames';

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  styles?: string;
  rows?: number;
}

export const InputField: React.FC<IInputFieldProps> = ({ name, rows, styles, ...props }) => {
  const [field, meta] = useField(name);

  const isError = Boolean(meta.touched && meta.error);

  return (
    <div className="relative mb-5">
      <input
        className={cn(
          'bg-[#eeeeee] pl-4 pr-9 py-3 placeholder:text-slate-400 placeholder:font-medium w-full focus:outline-0',
          { 'outline outline-1 outline-red-400': isError },
          styles
        )}
        {...field}
        {...props}
      />
      {isError && <p className="text-red-400">{meta.error}</p>}
    </div>
  );
};
