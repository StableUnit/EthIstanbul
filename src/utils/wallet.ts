export const getShortAddress = (address: string | null) =>
    address ? `${address.slice(0, 6)}...${address.slice(address.length - 3)}` : "";

export const isAddress = (address?: string) => address?.startsWith("0x") || address?.includes(".eth");
