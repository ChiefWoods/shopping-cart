import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function ErrorBtn() {
  const err = useRouteError() as Error;
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
}
