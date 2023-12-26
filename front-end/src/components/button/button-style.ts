const buttonClass: any = {
  default:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none ",
  light:
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ",
  dark: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",
  green:
    "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   ",
  red: "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2   ",
  yellow:
    "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ",
  purple:
    "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2   ",
  "outline-default":
    "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
  "outline-dark":
    "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
  "outline-green":
    "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
  "outline-red":
    "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
  "outline-yellow":
    "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
  "outline-purple":
    "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2    ",
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
