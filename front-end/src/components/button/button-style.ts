const buttonClass: any = {
  default: "bg-blue-600 !border-none hover:bg-blue-700 text-white",
  warning: "btn-warning text-white",
  error: "btn-error text-white",
  ghost: "btn-ghost",
  dark: "bg-zinc-800 !border-none hover:bg-zinc-700 text-white",
  "outline-default":
    "btn-outline border-blue-700 hover:bg-blue-700 text-blue-700",
};

const buttonSize: any = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

export function generateButtonStyle(type: string, size: string): string {
  return `btn ${buttonClass[type]} ${buttonSize[size]}`;
}
