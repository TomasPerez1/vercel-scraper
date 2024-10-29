import { getPropertyZp } from "./utils";

export async function POST(request: Request) {
  try {
  } catch (err) {
    console.log("Post err", err);

    return Response.json({
      err,
    });
  }
}
