export default function Docs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="flex flex-col gap-10 text-zinc-300">
        {/* Title */}
        <div className="flex flex-col gap-2 border-b border-zinc-800 pb-10">
          <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">
            🍎 Fruit Identifier — Docs
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed">
            A full-stack ML application that classifies 131 fruit types from
            images using a Convolutional Neural Network (CNN).
          </p>
        </div>

        {/* Architecture */}
        <section className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-zinc-100">
            🏗️ Architecture &amp; Environments
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The project is a monorepo with three strictly isolated environments
            to separate web concerns from heavy ML computation.
          </p>

          <ArchCard
            path="/frontend"
            tech="React · Vite (TS) · pnpm"
            desc="Captures user images via a drag-and-drop UI, sends a multipart/form-data request to the backend API, and displays the returned prediction and confidence score."
          />
          <ArchCard
            path="/backend"
            tech="FastAPI · Uvicorn · TensorFlow (CPU) · Pillow"
            desc="Lightweight inference API. Receives the image, preprocesses it with Pillow, runs it through the pre-trained CNN, and returns JSON. Model artifacts live permanently in backend/model_artifacts/."
          />
          <ArchCard
            path="/ml_pipeline"
            tech="TensorFlow (GPU) · Jupyter · Pandas · Kaggle API"
            desc="Training zone — notebooks run on Google Colab (T4 GPU) to download the Fruits 360 dataset, train the CNN, and export the .h5 file."
          />
        </section>

        {/* Model note */}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-zinc-100">
            ⚠️ Model Size Note
          </h2>
          <div className="rounded-lg border border-yellow-800/60 bg-yellow-950/30 px-5 py-4 text-yellow-300/80 text-sm leading-relaxed">
            The pre-trained model <Code>final_fruit_model.h5</Code> lives in{" "}
            <Code>backend/model_artifacts/</Code> and is approximately{" "}
            <strong>~77 MB</strong>. It is included to ensure fully reproducible
            inference without retraining. Cloning may be slightly heavier due to
            this binary file.
          </div>
        </section>

        {/* Deployment */}
        <section className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-zinc-100">
            🚀 Deployment Strategy
          </h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="pb-2 font-medium pr-6">Environment</th>
                <th className="pb-2 font-medium pr-6">Platform</th>
                <th className="pb-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <DeployRow
                env="Frontend"
                platform="Netlify"
                note="Static React/Vite build"
              />
              <DeployRow
                env="Backend"
                platform="Hugging Face Spaces"
                note="Dockerised FastAPI"
              />
              <DeployRow
                env="Training"
                platform="Google Colab"
                note="T4 GPU, exports .h5"
              />
            </tbody>
          </table>
        </section>

        {/* Local Testing */}
        <section className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-zinc-100">
            🧪 Local Inference Test Script
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Before running the full web stack, test the model locally via{" "}
            <Code>ml_pipeline/scripts/test_inference.py</Code>. It opens a
            native file picker, runs the selected image through the{" "}
            <Code>.h5</Code> model, and prints the prediction to your CLI.
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
              Prerequisites
            </p>
            <ul className="list-disc list-inside text-zinc-400 text-sm space-y-1 pl-1">
              <li>
                <Code>final_fruit_model.h5</Code> and{" "}
                <Code>class_names.json</Code> in{" "}
                <Code>backend/model_artifacts/</Code>
              </li>
              <li>System GUI toolkit installed (for the file picker dialog)</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
              Run
            </p>
            <pre className="rounded-lg bg-zinc-900 border border-zinc-800 p-4 text-sm font-mono text-green-300 overflow-x-auto whitespace-pre leading-relaxed">
              {`# Create and activate the ML venv
python -m venv .venv
source ml_pipeline/.venv/bin/activate

# Execute the test script
python ml_pipeline/scripts/test_inference.py`}
            </pre>
          </div>
        </section>

        {/* API Reference */}
        <section className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-zinc-100">📡 API Reference</h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800">
              <span className="px-2 py-0.5 rounded bg-green-700 text-green-100 text-xs font-bold font-mono">
                POST
              </span>
              <code className="text-zinc-300 text-sm font-mono">/predict</code>
            </div>
            <div className="px-4 py-4 flex flex-col gap-3 text-sm text-zinc-400">
              <div className="flex gap-2">
                <span className="text-zinc-600 w-24 shrink-0">Body</span>
                <span>
                  <Code>multipart/form-data</Code> — field name:{" "}
                  <Code>file</Code> (image)
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-zinc-600 w-24 shrink-0">Response</span>
                <Code>{`{ "label": "Apple", "confidence": 0.987 }`}</Code>
              </div>
            </div>
          </div>
        </section>

        {/* Environment Variables */}
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-zinc-100">
            🔑 Environment Variables
          </h2>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800 text-left">
                  <th className="px-4 py-2.5 font-medium">Variable</th>
                  <th className="px-4 py-2.5 font-medium">Default</th>
                  <th className="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="px-4 py-3 font-mono text-green-400 text-xs">
                    VITE_API_URL
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs font-mono">
                    http://localhost:8000
                  </td>
                  <td className="px-4 py-3 text-zinc-400">Backend base URL</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-500 text-xs">
            Create a <Code>.env</Code> file in <Code>/frontend</Code> and set{" "}
            <Code>VITE_API_URL</Code> to your Hugging Face Space URL for
            production.
          </p>
        </section>
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700">
      {children}
    </code>
  );
}

function ArchCard({
  path,
  tech,
  desc,
}: {
  path: string;
  tech: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Code>{path}</Code>
        <span className="text-xs text-zinc-500 font-mono">{tech}</span>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function DeployRow({
  env,
  platform,
  note,
}: {
  env: string;
  platform: string;
  note: string;
}) {
  return (
    <tr>
      <td className="py-3 pr-6 text-zinc-300 font-medium">{env}</td>
      <td className="py-3 pr-6 text-green-400 font-mono text-xs">{platform}</td>
      <td className="py-3 text-zinc-500">{note}</td>
    </tr>
  );
}
