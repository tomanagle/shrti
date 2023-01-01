import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const redirects = async (req: NextApiRequest, res: NextApiResponse) => {
  const shortId = req.query.id as string;

  const data = await prisma.redirect.findUnique({
    where: {
      shortId,
    },
  });

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const referer = req.headers.referer || "direct";
  const agent = req.headers["user-agent"] || "unknown";

  res.status(200).json(data);

  await prisma.click.create({
    data: {
      ip,
      referer,
      agent,
      redirect: {
        connect: {
          id: data.id,
        },
      },
    },
  });
};

export default redirects;
