import { PrismaClient, Report } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const revision = await prisma.revision.findFirst({
    where: {
      id: req.query.id as string,
    },
  });

  return res.status(200).json(revision);
};

export default handler;
