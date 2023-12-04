import { useContext } from "react";
import { formInlineContext } from "../FormInline";
import { twMerge } from "tailwind-merge";

interface FormSelectProps extends React.ComponentPropsWithoutRef<"select"> {
  formSelectSize?: "sm" | "lg";
}

function FormSelect(props: FormSelectProps) {
  const formInline = useContext(formInlineContext);
  const { formSelectSize, ...computedProps } = props;
  return (
    <select
      {...computedProps}
      className={twMerge([
        "relative disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
        "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-[#725FFE] focus:ring-opacity-20  focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-[#725FFE] dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 py-3 rounded-xl border-[0.1rem] bg-slate-200/30",
        props.formSelectSize == "sm" && "text-xs py-1.5 pl-2 pr-8",
        props.formSelectSize == "lg" && "text-lg py-1.5 pl-4 pr-8",
        formInline && "flex-1",
        props.className,
      ])}
    >
      {props.children}
    </select>
  );
}

export default FormSelect;
