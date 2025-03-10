import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorText() {
  const err = useRouteError() as Error;

  return (
    <div className="flex justify-between gap-2">
      {isRouteErrorResponse(err) ? (
        <>
          <p>
            {err.status} {err.statusText}
          </p>
        </>
      ) : (
        <p>{err.message}</p>
      )}
    </div>
  );
}
