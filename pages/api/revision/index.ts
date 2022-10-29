import { PrismaClient, Revision } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: unify PrismaClient instance
const prisma = new PrismaClient();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return createRevision(req, res);

    case "GET":
      return getRevisions(req, res);
  }
};

async function getRevisions(req: NextApiRequest, res: NextApiResponse) {
  let revisions: Revision[] = [];

  revisions = await prisma.revision.findMany({
    where: {
      ...(req.query.userId
        ? { userId: parseInt(req.query.userId as string) }
        : {}),
      ...(req.query.reportId ? { reportId: req.query.reportId as string } : {}),
    },
  });

  return res.status(200).json(revisions);
}

async function createRevision(req: NextApiRequest, res: NextApiResponse<any>) {
  const revisionToCreate: Revision = req.body;

  const createdRevision = await prisma.revision.create({
    data: { ...revisionToCreate, createdAt: new Date(Date.now()) },
  });

  return res.status(200).json(createdRevision);
}

export default handler;
