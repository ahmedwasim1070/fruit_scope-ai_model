import { useState, useRef, useCallback } from "react";

type Prediction = {
  fruit_name: string;
  confidence: number;
};

type Result = Prediction[] | null;

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setError(null);
    setResult(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("file", file);

      // Replace with your actual Hugging Face Space URL
      const res = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api/predict`,
        { method: "POST", body: form },
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      if (!data.success) throw new Error("Prediction failed.");
      setResult(data.prediction);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-16">
      {/* Hero */}
      <section className="text-center flex flex-col items-center gap-5">
        <span className="text-5xl select-none">🍎</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          Fruit Scope
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
          Upload an image to identify fruit categories using a convolutional
          neural network (CNN) model.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {["Toddler CNN Model", "Supports 131 Fruits"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 text-xs font-mono border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Upload Card */}
      <section className="max-w-xl mx-auto w-full flex flex-col gap-5">
        {/* Drop zone */}
        {!preview ? (
          <div
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
              dragging
                ? "border-green-400 bg-green-400/5"
                : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
            }`}
          >
            <span className="text-4xl select-none">📁</span>
            <p className="text-zinc-300 font-medium">
              Drop an image or click to browse
            </p>
            <p className="text-zinc-600 text-sm">PNG, JPG, WEBP supported</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-72 object-contain bg-zinc-950"
            />
            <div className="p-3 flex justify-between items-center">
              <span className="text-zinc-500 text-sm font-mono truncate max-w-[60%]">
                {file?.name}
              </span>
              <button
                onClick={reset}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-950/50 border border-red-800 px-4 py-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                Top Predictions
              </span>
              <span className="text-xs text-zinc-600">
                {result[0].fruit_name}
              </span>
            </div>
            <div className="divide-y divide-zinc-800/60">
              {result.map((p, i) => (
                <div
                  key={p.fruit_name}
                  className="px-4 py-3 flex items-center gap-4"
                >
                  <span
                    className={`text-xs font-mono w-4 shrink-0 ${
                      i === 0 ? "text-green-400" : "text-zinc-600"
                    }`}
                  >
                    #{i + 1}
                  </span>
                  <span
                    className={`text-sm font-medium flex-1 ${
                      i === 0 ? "text-zinc-100" : "text-zinc-400"
                    }`}
                  >
                    {p.fruit_name}
                  </span>
                  <div className="w-28 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        i === 0 ? "bg-green-500" : "bg-zinc-600"
                      }`}
                      style={{ width: `${(p.confidence * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono w-12 text-right">
                    {(p.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold transition-colors text-sm"
        >
          {loading ? "Identifying…" : "Identify Fruit"}
        </button>
      </section>

      {/* How it works */}
      {/* Note */}
      <section className="border-t border-zinc-800 pt-14 flex flex-col gap-8 text-center">
        <h2 className="text-2xl font-bold text-zinc-100">Note</h2>

        <p className="text-zinc-500 text-sm max-w-2xl mx-auto leading-relaxed">
          This is a lightweight CNN model trained on a limited dataset. It may
          produce incorrect predictions for images outside the
          <span className="text-zinc-300 font-medium">
            {" "}
            Fruits 360 (Kaggle: Moltean dataset)
          </span>
          distribution.
        </p>
      </section>
    </div>
  );
}
