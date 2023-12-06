import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SelectComponent } from "~/components/select";
import { getEngines } from "~/models/profiles.server";
import { getTopScores } from "~/models/scores.client";
import type { Score } from "~/utils/types";

type Loaderdata = {
  engines: Awaited<ReturnType<typeof getEngines>>;
  strapiUrl: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<Loaderdata>({
    engines: await getEngines(request),
    strapiUrl: process.env.STRAPI_API_URL,
  });
};

export default function Index() {
  const { strapiUrl, engines } = useLoaderData() as Loaderdata;
  const { id } = engines[engines.length -1];
  const [engine, setEngine] = useState(String(id));
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    getTopScores(strapiUrl, engine)
      .then(setScores)
  }, [strapiUrl, engine])

  return (
    <section className="site-section profiles-section">
      <div>
        <header className="section-header flex justify-between">
          <h2 className="text-4xl mr-3">Top 10 results</h2>
          <SelectComponent
            options={engines.map(en => String(en.id))}
            name="Engine"
            label="Engine version"
            setFieldValue={(_, data) => setEngine(data)}
          />

        </header>
        <table className="table text-gray-400 border-separate space-y-6 text-sm section-header">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3">Place</th>
              <th className="p-3 text-left">Player</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
          {scores.map((score, i) => (
            <tr key={score.id} className="bg-blue-200 lg:text-black">
              <td className="p-3 font-medium">{i + 1}</td>
              <td className="p-3">{score.attributes?.user?.data?.attributes?.email}</td>
              <td className="p-3">{score.attributes?.createdAt.slice(0, 16)}</td>
              <td className="p-3">{score.attributes?.amount}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
