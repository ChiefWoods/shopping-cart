import { NavLink, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { capitalizeFirstLetter, convertSlugToCategory } from "@/lib/utils";

export default function NavBreadcrumb() {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = [
    <BreadcrumbItem key="home">
      <BreadcrumbLink asChild>
        <NavLink to="/">Home</NavLink>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  ];

  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    breadcrumbItems.push(<BreadcrumbSeparator key={index} />);

    const isDynamicParam =
      /^[a-z0-9-]+$/.exec(segment) !== null &&
      index > 0 &&
      !["categories"].includes(segment);

    const segmentText =
      isDynamicParam && pathSegments[index - 1] === "categories"
        ? convertSlugToCategory(segment)
        : capitalizeFirstLetter(segment);

    const isLastSegment = index === pathSegments.length - 1;

    breadcrumbItems.push(
      <BreadcrumbItem key={segment}>
        {isLastSegment ? (
          <BreadcrumbPage className="font-semibold">
            {segmentText}
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <NavLink to={currentPath}>{segmentText}</NavLink>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>,
    );
  });

  return (
    <Breadcrumb className="px-6">
      <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
    </Breadcrumb>
  );
}
