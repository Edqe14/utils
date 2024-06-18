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
];

export const allPaths = paths
  .flatMap((path) => path.childrens)
  .reduce(
    (acc, path) => ({ ...acc, ...path }),
    {} as Record<string, { title: string }>
  );
