const buttonClass: any = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  dark: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
  light:
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
  green:
    "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  red: "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  yellow:
    "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900",
  purple:
    "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
  "outline-default":
    "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
  "outline-dark":
    "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800",
  "outline-green":
    "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800",
  "outline-red":
    "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
  "outline-yellow":
    "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900",
  "outline-purple":
    "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900",
};

const buttonSize: any = {
  xs: "!px-3 !py-2 !text-xs !font-medium",
  sm: "!px-3 !py-2 !text-sm !font-medium",
  md: "!px-5 !py-2.5 !text-sm !font-medium",
  lg: "!px-5 !py-3 !text-base !font-medium",
  xl: "!px-6 !py-3.5 !text-base !font-medium",
};

export function generateButtonStyle(type: string, size: string): string {
  return `${buttonClass[type]} ${buttonSize[size]}`;
}
