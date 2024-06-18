export const paths = [
  {
    id: "encode-decode",
    title: "Encoding & Decoding",
    childrens: {
      "/base64": {
        title: "Base64",
      },
      "/hex": {
        title: "Hex",
      },
      "/binary": {
        title: "Binary",
      },
      "/url": {
        title: "URL",
      },
    },
  },
  {
    id: "jwt",
    title: "JWT",
    childrens: {
      "/jwt-debug": {
        title: "Debug",
      },
      "/jwt-generate": {
        title: "Generate",
      },
    },
  },
] as const;

export type PageDetail = (typeof paths)[0]["childrens"]["/base64"];

export const allPaths = paths
  .flatMap((path) => path.childrens)
  .reduce(
    (acc, path) => ({ ...acc, ...path }),
    {} as Record<string, { title: string }>
  );
