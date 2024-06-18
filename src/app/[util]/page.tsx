import { allPaths } from "@/lib/navigation";
import { Metadata, ResolvingMetadata } from "next";

export type PageProps = {
  params: { util: string };
};

export const generateMetadata = async (
  { params }: PageProps,
  parent: ResolvingMetadata
) => {
  const navigationDetail = allPaths[`/${params.util}`];

  // @ts-ignore
  const payload: Metadata = {
    ...(await parent),
  };

  if (navigationDetail) {
    payload.title = `Utility - ${navigationDetail.title}`;
  }

  return payload;
};

export default async function UtilityPage({ params }: PageProps) {
  const page = await import(
    `@/utils/${params.util.replaceAll("-", "/")}`
  ).catch(() => null);

  if (!page) {
    return <h1>404</h1>;
  }

  const navigationDetail = allPaths[`/${params.util}`];
  const Page = page.default;

  return (
    <section>
      <header className="px-5 py-4">
        <h2 className="font-medium">
          {navigationDetail.parentName
            ? `${navigationDetail.parentName} - `
            : null}{" "}
          {navigationDetail.title}
        </h2>
      </header>

      <Page detail={navigationDetail} />
    </section>
  );
}
