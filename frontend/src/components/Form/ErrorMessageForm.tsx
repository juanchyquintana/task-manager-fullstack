interface ErrorMessageFormProps {
    error: string | null;
}

export default function ErrorMessageForm({ error }: ErrorMessageFormProps) {
  return (
    <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 text-red-200 px-3 py-2 text-sm">
      {error}
    </div>
  );
}
