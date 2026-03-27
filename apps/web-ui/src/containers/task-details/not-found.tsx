import ErrorPage from "src/containers/error-page";

export default function TaskDetailsNotFound() {
  return (
    <ErrorPage
      title="Task not found"
      description="We couldn't find the task you're looking for. It might have been deleted."
      buttonText="Back to Tasks"
      buttonHref="/"
    />
  );
}
