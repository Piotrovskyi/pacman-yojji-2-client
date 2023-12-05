import { type InputHTMLAttributes } from 'react';
import cn from 'classnames';

interface IInputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelname: string;
  styles?: string;
  checkIcon?: boolean;
  handelChange: (name: string, file: File) => void;
}

export const InputFileField: React.FC<IInputFileProps> = ({
  styles,
  labelname,
  name,
  handelChange,
  ...props
}) => {

  return (
    <div className="relative mb-5">
      <label htmlFor="small-file-input" className="block mb-2 text-[17px] text-center dark:text-white">{labelname || "Upload your file"}</label>
      <input
        className={cn(
          "block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10",
          "focus:border-blue-500 focus:ring-blue-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          "dark:bg-[#eeeeee] dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
          "file:bg-[#0090a8] file:border-0 file:bg-gray-100 file:me-4 file:py-2 file:px-3",
          "dark:file:bg-gray-700 dark:file:text-gray-400",
          styles
        )}
        type="file"
        onChange={(e) => {
          const  [file] = e.currentTarget.files || [];
          if (!file) {
            return;
          }
          handelChange('file', file);
        }} 
        id="small-file-input"
        accept=".js"
        {...props}
      />
    </div>
  );
};
