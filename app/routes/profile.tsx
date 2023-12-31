import { useEffect, useState } from "react";
import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tooltip } from 'react-tooltip';
import { UserCodeUploadForm } from "~/components/UploadFileForm";
import { getProfile } from "~/models/profiles.server";

import 'react-tooltip/dist/react-tooltip.css'

type Loaderdata = {
  profile: Awaited<ReturnType<typeof getProfile>>;
  strapiUrl: string
};

enum PageState {
  profile = "profile",
  codeSubmit = "codeSubmit"
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<Loaderdata>({
    profile: await getProfile(request),
    strapiUrl: process.env.STRAPI_API_URL,
  });
};

export default function Index() {
  const { profile, strapiUrl } = useLoaderData() as Loaderdata;
  const [pageState, setPageState] = useState<PageState>(PageState.profile);
  const [steps, setSteps] = useState(null);

  useEffect(() => {
    window.run(steps, setSteps);
  }, [steps])

  return (
    <section className="site-section profiles-section">
      <header className="section-header flex justify-between">
        <h2 className="text-4xl">Explore profiles</h2>
        <span
          className="bg-sky-500 hover:bg-sky-700 cursor-pointer py-3 px-11 rounded-full text-[#dae5ea] font-medium"
          onClick={() => setPageState(PageState.codeSubmit === pageState? PageState.profile : PageState.codeSubmit)}
        >
          {pageState === PageState.profile ? 'Upload+' : '<- go back'}
        </span>
      </header>
      <div className="flex items-start flex-wrap overflow-auto">
        {(pageState === PageState.profile && <>
        {profile?.user_codes ? (
          <>
          <table className="table text-gray-400 border-separate space-y-6 text-sm">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">N</th>
                <th className="p-3 text-left">File name</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Engine</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Executed At</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
            {profile.user_codes.map((code, i) => {
              const score = code.scores.sort((a,b) => b.amount - a.amount)[0];
             return (
              <tr key={`${code.file?.id}-${i}`} className="bg-blue-200 lg:text-black">
                <td className="p-3 font-medium">{i+1}</td>
                <td className="p-3">{code.file?.name}</td>
                <td className="p-3">{code.file?.createdAt.slice(0, 16)}</td>
                <td className="p-3 uppercase">{score?.amount}</td>
                <td className="p-3 uppercase">{score?.engine.tag}</td>
                <td className="p-3 uppercase cursor-default">
                  <span data-tooltip-id={`${code.file.id}-error`} data-tooltip-content={code.error}>{code.status}</span>
                  <Tooltip id={`${code.file.id}-error`} place="top" />
                </td>
                <td className="p-3 uppercase">{code.executedAt?.slice(0, 16)}</td>
                <td className="p-3 text-center">
                  {code.file?.url &&
                    <a href={`${strapiUrl.slice(0, -4)}${code.file?.url}`} className="text-gray-500 hover:text-gray-100 mr-2">
                      <i className="ri-eye-line text-lg"></i>
                    </a>
                  }
                  {
                    score?.steps && (
                      <span
                      className="text-gray-500 hover:text-gray-100 mr-2"
                      onClick={() => setSteps([...score?.steps].reverse())}
                      >
                        <i className="ri-play-mini-fill text-lg"></i>
                      </span>
                    )
                  }
                </td>
              </tr>
            )})}
            </tbody>
          </table>
          <div className="section-header flex flex-col items-center justify-center">
            <div className="grid-pacman" />
            <h3>Score:<span id="score"></span></h3>
          </div>
        </>
        ) : (
          <p>No solutions yet 🙂</p>
        )}
        </>)}
        {(pageState === PageState.codeSubmit && <>
          <UserCodeUploadForm onSubmit={async ({ file, ...data }) => {
             const formData = new FormData();
             formData.append('data', JSON.stringify(data));
             formData.append(`files.file`, file, file.name);

            await fetch(`${strapiUrl}/user-codes`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${profile?.jwt}`,
              },
              body: formData
            });
           window.location.reload();
          }}/>
        </>)}
      </div>

    </section>
  );
}
