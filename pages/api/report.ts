import { PrismaClient, Report } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getReports();
  }

  async function getReports() {
    const reports = await prisma.report.findMany();

    return res.status(200).json(reports);
  }
};

export default handler;
