import { type NextApiRequest, type NextApiResponse } from "next";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  const domain = req.query.domain;

  console.log({ domain, method });

  res.status(200).send("ok");
};

export default restricted;
