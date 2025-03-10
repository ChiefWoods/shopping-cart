import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "./components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ErrorPage() {
  const err = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
      <div className="flex justify-between gap-2">
        {isRouteErrorResponse(err) && <p>{err.status}.</p>}
        <p>{err.message}</p>
      </div>
      {isRouteErrorResponse(err) && [401, 404].includes(err.status) ? (
        <Button
          onClick={() => navigate(-1)}
          className="cursor-pointer font-semibold"
        >
          <ArrowLeft />
          Go Back
        </Button>
      ) : (
        <Button
          onClick={() => window.document.location.reload()}
          className="cursor-pointer font-semibold"
        >
          <RotateCcw />
          Retry
        </Button>
      )}
    </section>
  );
}
